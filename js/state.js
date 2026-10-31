// Shared application state. Keep this file first so every feature file can use these bindings.
// --- GLOBAL APP STATE ---
        let inventory = JSON.parse(localStorage.getItem('pantry_inventory')) || [];
        let mealPlan = JSON.parse(localStorage.getItem('pantry_mealplan')) || {
            Monday: [], Tuesday: [], Wednesday: [], Thursday: [], Friday: [], Saturday: [], Sunday: []
        };
        let shoppingList = JSON.parse(localStorage.getItem('pantry_shopping')) || [];
        let activeInventoryCategory = 'all';
        let currentAssignDay = null;
