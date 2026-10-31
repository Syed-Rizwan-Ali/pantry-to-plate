// Shared ingredient matching, quantity, date and HTML-safety helpers.
// --- SHARED HELPERS ---
        const ingredientAliasGroups = [
            ['bell pepper', 'capsicum'],
            ['green chili', 'green chilies', 'green chilli', 'green chillies', 'hari mirch'],
            ['minced meat', 'mince', 'keema', 'qeema'],
            ['minced chicken', 'chicken mince'],
            ['yogurt', 'yoghurt', 'dahi'],
            ['chickpea', 'chickpeas', 'garbanzo bean', 'garbanzo beans'],
            ['coriander', 'cilantro'],
            ['onion', 'pyaz'],
            ['potato', 'potatoes', 'aloo'],
            ['eggplant', 'aubergine', 'baingan'],
            ['prawn', 'prawns', 'shrimp', 'shrimps'],
            ['roti', 'chapati'],
            ['jalapeno', 'jalapenos', 'jalapeño', 'jalapeños'],
            ['cucumber', 'kheera'],
            ['ginger', 'adrak'],
            ['mint', 'pudina'],
            ['cauliflower', 'gobi'],
            ['carrot', 'carrots', 'gajar'],
            ['tomato paste', 'tomato puree', 'tomato purée']
        ];
        const ingredientAliasMap = new Map();
        ingredientAliasGroups.forEach(group => {
            const canonical = group[0];
            group.forEach(alias => ingredientAliasMap.set(normalizeIngredientText(alias), canonical));
        });

        function normalizeIngredientText(value) {
            return String(value || '')
                .normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .toLowerCase()
                .replace(/&/g, ' and ')
                .replace(/[^a-z0-9]+/g, ' ')
                .trim()
                .replace(/\s+/g, ' ');
        }

        function singularizeIngredientName(value) {
            const words = value.split(' ');
            const last = words.pop() || '';
            let singular = last;
            if (last.length > 4 && last.endsWith('ies')) singular = last.slice(0, -3) + 'y';
            else if (last.length > 4 && last.endsWith('oes')) singular = last.slice(0, -2);
            else if (last.length > 3 && last.endsWith('s') && !last.endsWith('ss')) singular = last.slice(0, -1);
            words.push(singular);
            return words.join(' ');
        }

        function canonicalIngredientName(value) {
            const normalized = normalizeIngredientText(value);
            if (ingredientAliasMap.has(normalized)) return ingredientAliasMap.get(normalized);
            const singular = singularizeIngredientName(normalized);
            return ingredientAliasMap.get(singular) || singular;
        }

        function getIngredientNameOptions(value) {
            return String(value || '')
                .split(/\s+or\s+/i)
                .map(name => name.trim())
                .filter(Boolean);
        }

        function getMatchingInventoryEntries(ingredientName) {
            const names = getIngredientNameOptions(ingredientName);
            const keys = new Set(names.map(canonicalIngredientName));
            return inventory.filter(item => {
                const inventoryName = canonicalIngredientName(item.name);
                if (keys.has(inventoryName)) return true;

                // A recipe asking for generic cooking oil can use a specific cooking oil already in stock.
                if (keys.has('oil')) {
                    const rawName = normalizeIngredientText(item.name);
                    return /^(olive|vegetable|sunflower|canola|cooking|avocado|corn|sesame) oil$/.test(rawName);
                }
                return false;
            });
        }

        function parseQuantity(value) {
            const text = String(value || '').trim().toLowerCase();
            const match = text.match(/^(\d+\s*\/\s*\d+|\d+(?:\.\d+)?|\.\d+)\s*(.*?)$/);
            if (!match) return null;

            let amountText = match[1].replace(/\s+/g, '');
            let amount;
            if (amountText.includes('/')) {
                const parts = amountText.split('/').map(Number);
                if (!parts[1]) return null;
                amount = parts[0] / parts[1];
            } else {
                amount = Number(amountText);
            }
            if (!Number.isFinite(amount) || amount < 0) return null;

            let unitText = (match[2] || '').trim().replace(/\s+/g, ' ');
            unitText = unitText.replace(/^(extra large|small|medium|large)\s+/, '');
            const rawUnit = unitText;
            const unit = unitText.replace(/\.$/, '').trim();

            const massUnits = {
                g: 1, gram: 1, grams: 1,
                kg: 1000, kilogram: 1000, kilograms: 1000
            };
            const volumeUnits = {
                ml: 1, milliliter: 1, milliliters: 1, millilitre: 1, millilitres: 1,
                l: 1000, liter: 1000, liters: 1000, litre: 1000, litres: 1000,
                tbsp: 15, tablespoon: 15, tablespoons: 15,
                tsp: 5, teaspoon: 5, teaspoons: 5,
                cup: 240, cups: 240
            };
            const countAliases = {
                whole: 'piece', each: 'piece', piece: 'piece', pieces: 'piece', pc: 'piece', pcs: 'piece',
                medium: 'piece', large: 'piece', small: 'piece',
                head: 'head', heads: 'head',
                bulb: 'bulb', bulbs: 'bulb',
                clove: 'clove', cloves: 'clove',
                can: 'can', cans: 'can',
                bunch: 'bunch', bunches: 'bunch',
                link: 'link', links: 'link',
                pack: 'pack', packs: 'pack',
                fillet: 'fillet', fillets: 'fillet',
                bag: 'bag', bags: 'bag',
                jar: 'jar', jars: 'jar',
                slice: 'slice', slices: 'slice'
            };

            if (Object.prototype.hasOwnProperty.call(massUnits, unit)) {
                return { amount, dimension: 'mass', unitKey: 'mass', baseValue: amount * massUnits[unit], displayUnit: unit || 'g', factor: massUnits[unit] };
            }
            if (Object.prototype.hasOwnProperty.call(volumeUnits, unit)) {
                return { amount, dimension: 'volume', unitKey: 'volume', baseValue: amount * volumeUnits[unit], displayUnit: unit || 'ml', factor: volumeUnits[unit] };
            }
            if (Object.prototype.hasOwnProperty.call(countAliases, unit)) {
                const canonicalUnit = countAliases[unit];
                return { amount, dimension: 'count', unitKey: `count:${canonicalUnit}`, baseValue: amount, displayUnit: unit || canonicalUnit, factor: 1 };
            }
            if (!unit) {
                return { amount, dimension: 'count', unitKey: 'count:piece', baseValue: amount, displayUnit: '', factor: 1 };
            }
            if (unit === 'inch' || unit === 'inches' || unit === 'in') {
                return { amount, dimension: 'length', unitKey: 'length:inch', baseValue: amount, displayUnit: unit, factor: 1 };
            }

            // Unknown units can still be compared safely when the same unit is used on both sides.
            const normalizedUnit = normalizeIngredientText(unit);
            return { amount, dimension: 'other', unitKey: `other:${normalizedUnit}`, baseValue: amount, displayUnit: rawUnit, factor: 1 };
        }

        function formatQuantity(baseValue, quantityTemplate) {
            const amount = baseValue / quantityTemplate.factor;
            const rounded = Math.round(amount * 100) / 100;
            const amountText = Number.isInteger(rounded) ? String(rounded) : String(rounded).replace(/0+$/, '').replace(/\.$/, '');
            return `${amountText}${quantityTemplate.displayUnit ? (quantityTemplate.dimension === 'mass' && quantityTemplate.displayUnit.length <= 2 ? '' : ' ') + quantityTemplate.displayUnit : ''}`;
        }

        function getIngredientAvailability(ingredient) {
            const matchingItems = getMatchingInventoryEntries(ingredient.name);
            if (matchingItems.length === 0) {
                return { status: 'missing', matchingItems: [], missingBaseValue: null };
            }

            const required = parseQuantity(ingredient.qty);
            if (!required) {
                return { status: 'unknown', matchingItems, missingBaseValue: null };
            }

            const stockQuantities = matchingItems.map(item => parseQuantity(item.qty));
            if (stockQuantities.some(quantity => !quantity || quantity.unitKey !== required.unitKey)) {
                return { status: 'unknown', matchingItems, required };
            }

            const stockTotal = stockQuantities.reduce((total, quantity) => total + quantity.baseValue, 0);
            const missingBaseValue = Math.max(0, required.baseValue - stockTotal);
            return {
                status: missingBaseValue <= 0.000001 ? 'available' : 'insufficient',
                matchingItems,
                required,
                stockTotal,
                missingBaseValue
            };
        }

        function getAvailabilityLabel(ingredient, availability) {
            if (availability.status === 'available') return 'Enough in stock';
            if (availability.status === 'missing') return 'Not in pantry';
            if (availability.status === 'insufficient') {
                return `Need ${formatQuantity(availability.missingBaseValue, availability.required)} more`;
            }
            return 'Check quantity';
        }

        function getDaysUntilExpiry(dateValue) {
            if (!dateValue || !/^\d{4}-\d{2}-\d{2}$/.test(String(dateValue))) return null;
            const [year, month, day] = String(dateValue).split('-').map(Number);
            const expiryUTC = Date.UTC(year, month - 1, day);
            const expiryCheck = new Date(expiryUTC);
            if (expiryCheck.getUTCFullYear() !== year || expiryCheck.getUTCMonth() !== month - 1 || expiryCheck.getUTCDate() !== day) {
                return null;
            }
            const today = new Date();
            const todayUTC = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
            return Math.round((expiryUTC - todayUTC) / 86400000);
        }

        function escapeHTML(value) {
            return String(value ?? '').replace(/[&<>"']/g, character => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            })[character]);
        }

// Date helper used by the sample pantry data.
        // Helper date utility
        function getFutureDate(days) {
            const d = new Date();
            d.setDate(d.getDate() + days);
            return d.toISOString().split('T')[0];
        }
