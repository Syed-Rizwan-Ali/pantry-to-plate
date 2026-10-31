// Kitchen inventory: persistence, filtering, rendering and ingredient CRUD.
// --- INVENTORY LOGIC ---
        function saveInventory() {
            localStorage.setItem('pantry_inventory', JSON.stringify(inventory));
            updateStats();
            renderRecipes(); // Re-calculate recipe matches
            syncShoppingListFromPlan(); // Recalculate shortages against the updated stock
        }

        function setInventoryCategory(cat) {
            activeInventoryCategory = cat;
            document.querySelectorAll('.inv-cat-btn').forEach(btn => {
                btn.className = "inv-cat-btn flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-400";
            });
            document.getElementById(`cat-btn-${cat}`).className = "inv-cat-btn flex-1 sm:flex-initial px-3 py-1.5 rounded-lg text-xs font-semibold bg-brand-500 text-white";
            renderInventory();
        }

        function filterInventory() {
            renderInventory();
        }

        function renderInventory() {
            const grid = document.getElementById('inventory-grid');
            const emptyState = document.getElementById('inventory-empty');
            const searchQuery = document.getElementById('inventory-search').value.toLowerCase();

            grid.innerHTML = '';

            const filtered = inventory.filter(item => {
                const matchesCat = activeInventoryCategory === 'all' || item.location === activeInventoryCategory;
                const matchesSearch = item.name.toLowerCase().includes(searchQuery);
                return matchesCat && matchesSearch;
            });

            if (filtered.length === 0) {
                emptyState.classList.remove('hidden');
            } else {
                emptyState.classList.add('hidden');
            }

            filtered.forEach(item => {
                let expiryBadge = '';
                if (item.expiry) {
                    const daysDiff = getDaysUntilExpiry(item.expiry);
                    if (daysDiff === null) {
                        expiryBadge = `<span class="bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-medium">Invalid expiry date</span>`;
                    } else if (daysDiff < 0) {
                        expiryBadge = `<span class="bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 text-[10px] px-2 py-0.5 rounded-full font-bold">Expired</span>`;
                    } else if (daysDiff === 0) {
                        expiryBadge = `<span class="bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-bold">Expires today</span>`;
                    } else if (daysDiff <= 3) {
                        expiryBadge = `<span class="bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 text-[10px] px-2 py-0.5 rounded-full font-bold">Expiring in ${daysDiff}d</span>`;
                    } else {
                        expiryBadge = `<span class="bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300 text-[10px] px-2 py-0.5 rounded-full font-medium">Exp: ${escapeHTML(item.expiry)}</span>`;
                    }
                }

                let locIcon = 'archive';
                if (item.location === 'fridge') locIcon = 'refrigerator';
                if (item.location === 'freezer') locIcon = 'snowflake';

                const card = document.createElement('div');
                card.className = "bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md transition flex flex-col justify-between group";
                card.innerHTML = `
                    <div>
                        <div class="flex justify-between items-start">
                            <span class="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1">
                                <i data-lucide="${locIcon}" class="w-3.5 h-3.5"></i> ${escapeHTML(item.location)}
                            </span>
                            <div class="opacity-0 group-hover:opacity-100 transition flex items-center gap-1">
                                <button onclick="editIngredient('${item.id}')" class="p-1 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg text-slate-500"><i data-lucide="pencil" class="w-3.5 h-3.5"></i></button>
                                <button onclick="deleteIngredient('${item.id}')" class="p-1 hover:bg-rose-50 dark:hover:bg-rose-900/40 rounded-lg text-rose-500"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                            </div>
                        </div>
                        <h4 class="font-bold text-base mt-2 text-slate-800 dark:text-slate-100">${escapeHTML(item.name)}</h4>
                        <p class="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-0.5">${escapeHTML(item.qty)}</p>
                    </div>
                    <div class="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                        ${expiryBadge || '<span class="text-[10px] text-slate-400">No expiry</span>'}
                    </div>
                `;
                grid.appendChild(card);
            });

            lucide.createIcons();
        }

        function updateStats() {
            document.getElementById('stat-total-items').innerText = inventory.length;

            const expiringSoon = inventory.filter(item => {
                const days = getDaysUntilExpiry(item.expiry);
                return days !== null && days >= 0 && days <= 3;
            }).length;

            document.getElementById('stat-expiring-soon').innerText = expiringSoon;

            const coldCount = inventory.filter(i => i.location === 'fridge' || i.location === 'freezer').length;
            document.getElementById('stat-cold-storage').innerText = coldCount;

            const pantryCount = inventory.filter(i => i.location === 'pantry').length;
            document.getElementById('stat-pantry-count').innerText = pantryCount;
        }

        function loadSamplePantry() {
            inventory = [...sampleInventory];
            saveInventory();
            renderInventory();
            showToast('Sample preset pantry items loaded!');
        }

        function openAddItemModal() {
            document.getElementById('modal-title').innerText = 'Add Ingredient';
            document.getElementById('item-id').value = '';
            document.getElementById('item-name').value = '';
            document.getElementById('item-qty').value = '';
            document.getElementById('item-location').value = 'fridge';
            document.getElementById('item-expiry').value = '';
            document.getElementById('item-modal').classList.remove('hidden');
        }

        function editIngredient(id) {
            const item = inventory.find(i => i.id === id);
            if (!item) return;

            document.getElementById('modal-title').innerText = 'Edit Ingredient';
            document.getElementById('item-id').value = item.id;
            document.getElementById('item-name').value = item.name;
            document.getElementById('item-qty').value = item.qty;
            document.getElementById('item-location').value = item.location;
            document.getElementById('item-expiry').value = item.expiry || '';
            document.getElementById('item-modal').classList.remove('hidden');
        }

        function closeItemModal() {
            document.getElementById('item-modal').classList.add('hidden');
        }

        function saveIngredient(e) {
            e.preventDefault();
            const id = document.getElementById('item-id').value;
            const name = document.getElementById('item-name').value.trim();
            const qty = document.getElementById('item-qty').value.trim();
            const location = document.getElementById('item-location').value;
            const expiry = document.getElementById('item-expiry').value;

            if (id) {
                // Edit
                const index = inventory.findIndex(i => i.id === id);
                if (index !== -1) {
                    inventory[index] = { id, name, qty, location, expiry };
                }
            } else {
                // New
                const newItem = {
                    id: 'i_' + Date.now(),
                    name,
                    qty,
                    location,
                    expiry
                };
                inventory.push(newItem);
            }

            saveInventory();
            renderInventory();
            closeItemModal();
            showToast(id ? 'Ingredient updated!' : 'Ingredient added to kitchen!');
        }

        function deleteIngredient(id) {
            inventory = inventory.filter(i => i.id !== id);
            saveInventory();
            renderInventory();
            showToast('Ingredient removed.');
        }

