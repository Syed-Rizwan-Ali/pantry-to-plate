PantryPrep 
Cook with what you have. PantryPrep is a lightweight kitchen-organizing app that helps you track ingredients, discover recipes that fit your available stock, plan meals for the week, and build a shopping list from the meals you choose.

Overview

PantryPrep brings four everyday kitchen tasks into one browser-based workspace:

- Manage your kitchen inventory — add, edit, search, filter, and remove ingredients across your fridge, freezer, and pantry. Optionally record expiration dates and keep an eye on items that are expiring soon.
- Find recipes from your ingredients — compare the ingredients in your inventory with a built-in catalogue of 25 recipes. Filter by diet and preparation time, then open a recipe for its ingredient list and cooking instructions.
- Plan the week — assign recipes to any day from Monday to Sunday and remove meals as your plans change.
- Prepare a shopping list — generate missing-ingredient items from your planned recipes, account for quantities where units can be compared, and add your own items. Check off or remove items as you shop.
- Use batch-prep mode — turn an existing weekly plan into a simple five-step preparation checklist.
- Choose your theme — switch between light and dark mode; the selected theme is remembered in the browser.

Features

Kitchen inventory

- Organize ingredients by Fridge, Freezer, and Pantry.
- Add, edit, and delete inventory entries.
- Store a quantity and an optional expiration date for each item.
- Search ingredients and filter by storage location.
- View inventory summaries, including total stock, items expiring soon, cold storage, and pantry staples.
- Load a preset sample pantry to try the app quickly.

Recipe matcher

- Browse 25 built-in recipes.
- See whether recipe ingredients are available, missing, or in insufficient quantities.
- Filter recipes by diet: Vegetarian, High-Protein, Gluten-Free, or Low-Carb.
- Filter by maximum preparation time.
- Open recipe details to review required ingredients and step-by-step instructions.

PantryPrep normalizes common ingredient-name variations and compares supported quantities where possible. Supported conversions include grams/kilograms, milliliters/liters, teaspoons/tablespoons/cups, and common count-based units. When a quantity or unit cannot be safely compared, the app marks availability for review instead of assuming that the ingredient is available.
Weekly meal planner and batch prep
- Assign recipes to each day of the week.
- Add more than one recipe to a day.
- Remove meals from the plan.
- Generate a five-step batch-prep checklist from the current weekly plan.
The batch-prep checklist is a general workflow, not a custom cooking schedule calculated from each recipe's exact timings.
Shopping list
- Generate missing ingredients from the recipes in the weekly plan.
- Combine planned ingredient quantities when their units are comparable.
- Subtract matching inventory quantities where a reliable comparison is possible.
- Keep manually added shopping items alongside generated items.
- Check off items, remove individual entries, clear completed entries, or clear the full list.
Built with
- HTML5 for the application structure.
- CSS and Tailwind CSS via CDN for styling and responsive layouts.
- Vanilla JavaScript split into feature-focused files.
- Lucide for interface icons.
- canvas-confetti for visual feedback when batch-prep mode is launched.
- Google Fonts (Inter) for typography.
- Browser localStorage for persistence.
There is no frontend framework, package manager, bundler, database, or backend service required.
Getting started
Requirements
- A modern browser with JavaScript enabled.
- An internet connection to load the CDN-hosted libraries and Google Font used by the page.
- A local static server is recommended for development.
Run locally
1. Clone or download this repository.
2. Open the project folder in your editor.
3. Start a local server from the project root. For example, with Python:
   python -m http.server 5500
4. Open http://localhost:5500 in your browser.
You can also open index.html directly or use the Live Server extension in Visual Studio Code. No npm install or build command is needed.

Project structure

PantryPrep/
├── index.html             # App layout and navigation
├── style.css              # Custom styles and scrollbar styling
├── README.md              # Project documentation
└── js/
    ├── config.js          # Tailwind theme configuration
    ├── state.js           # Shared state loaded from localStorage
    ├── helpers.js         # Ingredient matching, quantity and date helpers
    ├── data.js            # Recipe catalogue and sample pantry
    ├── ui.js              # Navigation, theme toggle and toast messages
    ├── inventory.js       # Inventory management and rendering
    ├── recipes.js         # Recipe matching, filters and recipe details
    ├── meal-planner.js    # Weekly meal planning
    ├── batch-prep.js      # Batch-prep checklist
    ├── shopping-list.js   # Shopping-list generation and management
    └── app.js             # App initialization and global event handlers

The JavaScript files are loaded in dependency order through script tags at the end of index.html. Keep that order in mind when adding or moving code between files.
Data and privacy

PantryPrep is currently a client-side application. It does not require an account and does not send pantry data to a PantryPrep server. Inventory, meal plans, shopping-list items, and the selected theme are stored in the current browser's localStorage under these keys:
Data	localStorage key
Kitchen inventory	pantry_inventory
Weekly meal plan	pantry_mealplan
Shopping list	pantry_shopping
Theme preference	pantry_theme


Because the data is stored locally, it is specific to the browser and site origin you use. It is not automatically synchronized between devices. Clearing the browser's site data can remove saved PantryPrep information, so do not treat this demo as a backed-up storage system.

When the app starts with an empty inventory, it loads the sample pantry automatically. You can also load the preset pantry from the inventory screen.
Customization
- Add or edit recipes: update the recipesDB catalogue in js/data.js. Each recipe includes an ID, title, emoji, preparation time, servings, diet label, ingredients, and instruction steps.
- Change the visual theme: edit the Tailwind theme in js/config.js and the custom rules in style.css.
- Adjust ingredient matching: update aliases and quantity parsing in js/helpers.js.
- Extend a feature: work in the corresponding module under js/ and preserve the script loading order in index.html.
Contributing
Contributions and suggestions are welcome.
1. Fork the repository.
2. Create a feature branch: git checkout -b feature/your-change.
3. Make your changes and test the affected app flows in a browser.
4. Commit your work: git commit -m "Add your change".
5. Push the branch and open a pull request.
For changes to recipe matching or shopping-list calculations, include examples that cover both matching and non-matching ingredient quantities where practical.
Known limitations
- Data is stored in the current browser only; there is no account system, cloud sync, or server-side database.
- CDN-hosted dependencies and the Inter font require an internet connection.
- Quantity matching is limited to the units and ingredient aliases handled by the current helper functions. Unrecognized or incompatible quantities may need manual review.
- The batch-prep mode provides a general checklist rather than recipe-specific timing or equipment optimization.
- The project does not currently include an automated test suite or a production build pipeline.
