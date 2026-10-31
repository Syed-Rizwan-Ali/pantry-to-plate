// App startup and compatibility bridge for the existing inline HTML handlers.
// --- INITIALIZATION ---
        window.addEventListener('DOMContentLoaded', () => {
            lucide.createIcons();
            
            // Default load sample if empty
            if (inventory.length === 0) {
                inventory = [...sampleInventory];
                saveInventory();
            }

            renderInventory();
            renderRecipes();
            renderMealPlan();
            renderShoppingList();
            updateStats();
        });


// The original HTML and dynamically-rendered cards use inline event attributes.
// Keep their handlers available on window while the code stays separated by feature.
Object.assign(window, {
    switchTab,
    openAddItemModal,
    loadSamplePantry,
    filterInventory,
    setInventoryCategory,
    renderRecipes,
    generateBatchPrep,
    openAssignRecipeModal,
    closeBatchPrep,
    clearCheckedShopping,
    clearAllShopping,
    closeItemModal,
    saveIngredient,
    addCustomShoppingItem,
    closeAssignModal,
    closeRecipeModal,
    editIngredient,
    deleteIngredient,
    viewRecipeModal,
    quickAddPlanModal,
    removeMealFromPlan,
    toggleShoppingItem,
    removeShoppingItem,
    assignRecipeToDay,
    showToast
});
