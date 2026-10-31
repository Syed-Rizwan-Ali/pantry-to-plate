// Batch-preparation workflow generated from the weekly meal plan.
// --- BATCH PREP MODE LOGIC ---
        function generateBatchPrep() {
            const container = document.getElementById('batch-prep-container');
            const stepsDiv = document.getElementById('batch-prep-steps');
            stepsDiv.innerHTML = '';

            // Aggregate all planned recipes
            const allPlannedIds = Object.values(mealPlan).flat();
            if (allPlannedIds.length === 0) {
                showToast('Please add at least 1 meal to your weekly plan first!');
                return;
            }

            const plannedRecipes = allPlannedIds.map(id => recipesDB.find(r => r.id === id)).filter(Boolean);

            // Synthesize Prep Steps
            const workflow = [
                { title: 'Step 1: Produce & Prep Work', text: `Wash, chop, and segment vegetables for all ${plannedRecipes.length} planned meals simultaneously (e.g. chop broccoli, cucumbers, onions).` },
                { title: 'Step 2: Protein Marinade & Searing', text: 'Pre-season chicken breast, salmon, or legumes in separate mixing bowls to lock in flavor.' },
                { title: 'Step 3: Grains & Starch Boiling', text: 'Start cooking brown rice, quinoa, or lentils on rear stovetop burners.' },
                { title: 'Step 4: Skillet & Oven Cooking', text: 'Execute main stovetop sautés and skillet dishes sequentially.' },
                { title: 'Step 5: Portion & Chill', text: 'Divide prep into airtight Glass Meal Prep Containers. Let cool 15 mins before refrigerating.' }
            ];

            workflow.forEach((step, idx) => {
                const stepCard = document.createElement('div');
                stepCard.className = "p-4 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-200 dark:border-slate-700 flex items-start gap-4";
                stepCard.innerHTML = `
                    <input type="checkbox" id="prep-step-${idx}" class="mt-1 w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500">
                    <div>
                        <label for="prep-step-${idx}" class="font-bold text-sm text-slate-800 dark:text-slate-200 cursor-pointer">${step.title}</label>
                        <p class="text-xs text-slate-600 dark:text-slate-400 mt-1">${step.text}</p>
                    </div>
                `;
                stepsDiv.appendChild(stepCard);
            });

            container.classList.remove('hidden');
            container.scrollIntoView({ behavior: 'smooth' });
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
        }

        function closeBatchPrep() {
            document.getElementById('batch-prep-container').classList.add('hidden');
        }

