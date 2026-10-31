// Recipe discovery, pantry matching and recipe detail modal.
// --- RECIPE MATCHER LOGIC ---
        function calculateRecipeMatch(recipe) {
            let matchedCount = 0;
            let insufficientCount = 0;
            let unknownCount = 0;

            recipe.ingredients.forEach(ingredient => {
                const availability = getIngredientAvailability(ingredient);
                if (availability.status === 'available') matchedCount++;
                else if (availability.status === 'insufficient') insufficientCount++;
                else if (availability.status === 'unknown') unknownCount++;
            });

            const percent = recipe.ingredients.length
                ? Math.round((matchedCount / recipe.ingredients.length) * 100)
                : 0;
            return { matchedCount, insufficientCount, unknownCount, total: recipe.ingredients.length, percent };
        }

        function renderRecipes() {
            const grid = document.getElementById('recipe-grid');
            const dietFilter = document.getElementById('filter-diet').value;
            const timeFilter = parseInt(document.getElementById('filter-time').value);

            grid.innerHTML = '';
            let readyToCookCount = 0;

            recipesDB.forEach(recipe => {
                if (dietFilter !== 'all' && recipe.diet !== dietFilter) return;
                if (recipe.prepTime > timeFilter) return;

                const match = calculateRecipeMatch(recipe);
                if (match.percent >= 75) readyToCookCount++;

                const card = document.createElement('div');
                card.className = "bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm hover:shadow-md transition flex flex-col justify-between";

                let matchBadgeClass = "bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300";
                if (match.percent >= 80) matchBadgeClass = "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300";
                else if (match.percent >= 50) matchBadgeClass = "bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300";

                const ingredientPreview = recipe.ingredients.map(ingredient => {
                    const availability = getIngredientAvailability(ingredient);
                    const isAvailable = availability.status === 'available';
                    const isUnverified = availability.status === 'unknown';
                    const style = isAvailable
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900'
                        : isUnverified
                            ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/50 dark:text-amber-300 border border-amber-200 dark:border-amber-900'
                            : 'bg-slate-100 text-slate-500 dark:bg-slate-700 dark:text-slate-400';
                    const title = escapeHTML(getAvailabilityLabel(ingredient, availability));
                    return `<span title="${title}" class="text-[11px] px-2 py-0.5 rounded-md ${style}">${escapeHTML(ingredient.name)}</span>`;
                }).join('');

                card.innerHTML = `
                    <div class="p-6">
                        <div class="flex justify-between items-start gap-2">
                            <span class="text-4xl p-2 bg-slate-50 dark:bg-slate-700 rounded-2xl">${recipe.emoji}</span>
                            <span class="${matchBadgeClass} text-xs font-bold px-2.5 py-1 rounded-full">
                                ${match.percent}% Available (${match.matchedCount}/${match.total})
                            </span>
                        </div>
                        <h3 class="font-bold text-lg mt-4 text-slate-800 dark:text-slate-100 leading-snug">${recipe.title}</h3>
                        <div class="flex items-center gap-4 mt-3 text-xs text-slate-500 dark:text-slate-400">
                            <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i> ${recipe.prepTime} mins</span>
                            <span class="flex items-center gap-1"><i data-lucide="users" class="w-3.5 h-3.5"></i> ${recipe.servings} servings</span>
                            <span class="bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-[10px] font-semibold">${recipe.diet}</span>
                        </div>

                        <div class="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700">
                            <p class="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Required Ingredients</p>
                            <div class="flex flex-wrap gap-1">${ingredientPreview}</div>
                        </div>
                    </div>

                    <div class="p-4 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-100 dark:border-slate-700 flex gap-2">
                        <button onclick="viewRecipeModal('${recipe.id}')" class="flex-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-semibold py-2 rounded-xl transition">View Steps</button>
                        <button onclick="quickAddPlanModal('${recipe.id}')" class="flex-1 bg-brand-600 hover:bg-brand-700 text-white text-xs font-semibold py-2 rounded-xl transition flex items-center justify-center gap-1">
                            <i data-lucide="calendar-plus" class="w-3.5 h-3.5"></i> Plan Meal
                        </button>
                    </div>
                `;

                grid.appendChild(card);
            });

            document.getElementById('match-count-badge').innerText = readyToCookCount;
            lucide.createIcons();
        }

        function viewRecipeModal(recipeId) {
            const recipe = recipesDB.find(r => r.id === recipeId);
            if (!recipe) return;

            document.getElementById('recipe-modal-icon').innerText = recipe.emoji;
            document.getElementById('recipe-modal-title').innerText = recipe.title;
            document.getElementById('recipe-modal-meta').innerText = `${recipe.prepTime} mins | ${recipe.servings} Servings | ${recipe.diet}`;

            const ingContainer = document.getElementById('recipe-modal-ingredients');
            ingContainer.innerHTML = '';
            recipe.ingredients.forEach(ingredient => {
                const availability = getIngredientAvailability(ingredient);
                const statusText = getAvailabilityLabel(ingredient, availability);
                const isAvailable = availability.status === 'available';
                const isUnknown = availability.status === 'unknown';
                const tone = isAvailable
                    ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300'
                    : isUnknown
                        ? 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300'
                        : 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-900 text-amber-800 dark:text-amber-300';
                const div = document.createElement('div');
                div.className = `p-2 rounded-xl text-xs flex items-center justify-between gap-2 border ${tone}`;
                const ingredientLabel = document.createElement('span');
                ingredientLabel.className = 'font-medium';
                ingredientLabel.textContent = `${ingredient.name} (${ingredient.qty})`;
                const statusLabel = document.createElement('span');
                statusLabel.className = 'text-[10px] font-bold px-1.5 py-0.5 rounded bg-white/70 dark:bg-slate-900/50 text-current text-right';
                statusLabel.textContent = statusText;
                div.append(ingredientLabel, statusLabel);
                ingContainer.appendChild(div);
            });

            const stepsContainer = document.getElementById('recipe-modal-steps');
            stepsContainer.innerHTML = recipe.steps.map(step => `<li class="pl-1">${escapeHTML(step)}</li>`).join('');

            document.getElementById('recipe-modal').classList.remove('hidden');
        }

        function closeRecipeModal() {
            document.getElementById('recipe-modal').classList.add('hidden');
        }

