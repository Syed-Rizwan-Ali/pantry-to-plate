// Weekly meal planning and recipe assignment.
// --- MEAL PLANNER LOGIC ---
function renderMealPlan() {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  days.forEach((day) => {
    const container = document.getElementById(`plan-${day}`);
    container.innerHTML = "";

    const meals = mealPlan[day] || [];
    meals.forEach((recipeId, idx) => {
      const recipe = recipesDB.find((r) => r.id === recipeId);
      if (!recipe) return;

      const item = document.createElement("div");
      item.className = "meal-plan-item";

      item.innerHTML = `
    <span class="meal-plan-emoji" aria-hidden="true">${recipe.emoji}</span>

    <span class="meal-plan-title">${recipe.title}</span>

    <button
        type="button"
        onclick="removeMealFromPlan('${day}', ${idx})"
        class="meal-plan-remove"
        aria-label="Remove ${recipe.title}">
        <i data-lucide="trash-2"></i>
    </button>
`;
      container.appendChild(item);
    });
  });

  syncShoppingListFromPlan();
  lucide.createIcons();
}

function openAssignRecipeModal(day) {
  currentAssignDay = day;
  document.querySelector("#assign-modal h3").innerText =
    "Add Recipe to Meal Plan";
  document.getElementById("assign-day-label").innerText = `Assigning to ${day}`;

  const list = document.getElementById("assign-recipe-list");
  list.innerHTML = "";

  recipesDB.forEach((recipe) => {
    const card = document.createElement("div");
    card.className =
      "p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer transition";
    card.onclick = () => assignRecipeToDay(recipe.id);
    card.innerHTML = `
                    <div class="flex items-center gap-3">
                        <span class="text-2xl">${recipe.emoji}</span>
                        <div>
                            <h4 class="font-bold text-sm text-slate-800 dark:text-slate-200">${recipe.title}</h4>
                            <p class="text-xs text-slate-500">${recipe.prepTime} mins | ${recipe.diet}</p>
                        </div>
                    </div>
                    <button type="button" class="bg-brand-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium">Select</button>
                `;
    list.appendChild(card);
  });

  document.getElementById("assign-modal").classList.remove("hidden");
}

function quickAddPlanModal(recipeId) {
  const recipe = recipesDB.find((item) => item.id === recipeId);
  if (!recipe) return;

  currentAssignDay = null;
  document.querySelector("#assign-modal h3").innerText = "Choose a Day";
  document.getElementById("assign-day-label").innerText =
    `Add ${recipe.title} to your weekly plan`;

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const list = document.getElementById("assign-recipe-list");
  list.innerHTML = "";

  days.forEach((day) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className =
      "w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-slate-700 transition";
    card.innerHTML = `
                    <span class="font-semibold text-sm text-slate-800 dark:text-slate-200">${day}</span>
                    <span class="text-xs text-slate-500 dark:text-slate-400">${(mealPlan[day] || []).length} planned meal(s)</span>
                `;
    card.addEventListener("click", () => assignRecipeToDay(recipeId, day));
    list.appendChild(card);
  });

  document.getElementById("assign-modal").classList.remove("hidden");
}

function closeAssignModal() {
  document.getElementById("assign-modal").classList.add("hidden");
}

function assignRecipeToDay(recipeId, dayOverride = null) {
  const targetDay = dayOverride || currentAssignDay;
  if (!targetDay || !recipesDB.some((recipe) => recipe.id === recipeId)) return;
  if (!mealPlan[targetDay]) mealPlan[targetDay] = [];

  mealPlan[targetDay].push(recipeId);
  localStorage.setItem("pantry_mealplan", JSON.stringify(mealPlan));

  renderMealPlan();
  closeAssignModal();
  showToast(`Recipe assigned to ${targetDay}!`);
}

function removeMealFromPlan(day, idx) {
  mealPlan[day].splice(idx, 1);
  localStorage.setItem("pantry_mealplan", JSON.stringify(mealPlan));
  renderMealPlan();
  showToast("Meal removed from plan.");
}
