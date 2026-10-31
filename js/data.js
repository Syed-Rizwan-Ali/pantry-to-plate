// Recipe catalogue and optional sample pantry records.
// --- PRESET RECIPE DATABASE (Expanded to 25 Recipes) ---
        const recipesDB = [
            // Original 5
            {
                id: 'r1', title: 'Garlic Butter Chicken & Broccoli', emoji: '🥦', prepTime: 25, servings: 4, diet: 'High-Protein',
                ingredients: [ { name: 'Chicken Breast', qty: '500g' }, { name: 'Broccoli', qty: '1 head' }, { name: 'Garlic', qty: '3 cloves' }, { name: 'Butter', qty: '2 tbsp' }, { name: 'Olive Oil', qty: '1 tbsp' } ],
                steps: [ 'Dice chicken breasts into bite-sized cubes and season with salt and pepper.', 'Heat olive oil in a large skillet. Add chicken and sear until golden.', 'Mince garlic and chop broccoli.', 'Add butter, garlic, and broccoli to the skillet. Cover for 4 mins to steam.', 'Stir well and serve.' ]
            },
            {
                id: 'r2', title: 'Mediterranean Chickpea Salad', emoji: '🥗', prepTime: 15, servings: 3, diet: 'Vegetarian',
                ingredients: [ { name: 'Chickpeas', qty: '1 can' }, { name: 'Cucumber', qty: '1 whole' }, { name: 'Tomatoes', qty: '2 medium' }, { name: 'Feta Cheese', qty: '100g' }, { name: 'Olive Oil', qty: '2 tbsp' }, { name: 'Lemon', qty: '1 whole' } ],
                steps: [ 'Rinse and drain chickpeas.', 'Dice cucumber and tomatoes.', 'Combine chickpeas, veggies, and feta in a bowl.', 'Whisk olive oil, lemon juice, salt, and pepper.', 'Pour dressing over salad and toss.' ]
            },
            {
                id: 'r3', title: 'Creamy Spinach & Salmon Rice Bowl', emoji: '🐟', prepTime: 30, servings: 4, diet: 'Gluten-Free',
                ingredients: [ { name: 'Salmon Fillets', qty: '4 pieces' }, { name: 'Spinach', qty: '200g' }, { name: 'Brown Rice', qty: '2 cups' }, { name: 'Cream', qty: '1/2 cup' }, { name: 'Garlic', qty: '2 cloves' } ],
                steps: [ 'Cook brown rice.', 'Season salmon and pan-fry 4 mins per side.', 'Remove salmon. Saute garlic and spinach in the same pan.', 'Pour in cream and simmer for 2 mins.', 'Assemble bowls with rice, spinach cream sauce, and salmon.' ]
            },
            {
                id: 'r4', title: 'Zucchini Noodle Stir-Fry', emoji: '🍜', prepTime: 20, servings: 2, diet: 'Low-Carb',
                ingredients: [ { name: 'Zucchini', qty: '2 large' }, { name: 'Bell Pepper', qty: '1 whole' }, { name: 'Soy Sauce', qty: '2 tbsp' }, { name: 'Garlic', qty: '2 cloves' }, { name: 'Eggs', qty: '2 whole' } ],
                steps: [ 'Spiralize zucchinis or slice thinly.', 'Slice bell peppers and mince garlic.', 'Saute peppers and garlic.', 'Push veggies aside, scramble eggs in the pan.', 'Add zucchini and soy sauce. Toss for 2 mins.' ]
            },
            {
                id: 'r5', title: 'Hearty Lentil & Veggie Soup', emoji: '🍲', prepTime: 40, servings: 6, diet: 'Vegetarian',
                ingredients: [ { name: 'Lentils', qty: '1.5 cups' }, { name: 'Carrots', qty: '2 whole' }, { name: 'Onion', qty: '1 whole' }, { name: 'Tomatoes', qty: '1 can' }, { name: 'Vegetable Broth', qty: '4 cups' } ],
                steps: [ 'Dice onion and carrots.', 'Sauté onion and carrots until soft.', 'Add rinsed lentils, canned tomatoes, and broth.', 'Simmer for 30 minutes until lentils are tender.', 'Season and serve.' ]
            },
            // NEW 20 Recipes (Western Touch & Underrated Local)
            {
                id: 'r6', title: 'Creamy Garlic Mushroom Pasta', emoji: '🍝', prepTime: 20, servings: 3, diet: 'Vegetarian',
                ingredients: [ { name: 'Pasta', qty: '200g' }, { name: 'Mushrooms', qty: '250g' }, { name: 'Garlic', qty: '4 cloves' }, { name: 'Cream', qty: '1/2 cup' }, { name: 'Cheddar Cheese', qty: '1/2 cup' } ],
                steps: [ 'Boil pasta in salted water until al dente. Drain, reserving 1/4 cup pasta water.', 'Slice mushrooms and mince garlic.', 'Saute mushrooms in butter or oil until browned, then add garlic for 1 min.', 'Lower heat, stir in cream, cheddar cheese, and a splash of pasta water.', 'Toss cooked pasta in the creamy mushroom sauce until coated.' ]
            },
            {
                id: 'r7', title: 'Chicken Fajita Wraps', emoji: '🌯', prepTime: 20, servings: 4, diet: 'High-Protein',
                ingredients: [ { name: 'Chicken Breast', qty: '400g' }, { name: 'Bell Pepper', qty: '2 whole' }, { name: 'Onion', qty: '1 large' }, { name: 'Roti or Tortilla', qty: '4 pieces' }, { name: 'Cumin', qty: '1 tsp' } ],
                steps: [ 'Slice chicken, bell peppers, and onions into thin strips.', 'Season chicken with salt, pepper, cumin, and red chili flakes.', 'Cook chicken in a pan until done. Remove and set aside.', 'In the same pan, saute bell peppers and onions until slightly softened.', 'Warm the rotis/tortillas and fill with the chicken and veggie mix.' ]
            },
            {
                id: 'r8', title: 'Shakshuka (Spicy Baked Eggs)', emoji: '🍳', prepTime: 20, servings: 2, diet: 'Vegetarian',
                ingredients: [ { name: 'Eggs', qty: '4 whole' }, { name: 'Tomatoes', qty: '4 medium' }, { name: 'Onion', qty: '1 medium' }, { name: 'Garlic', qty: '3 cloves' }, { name: 'Green Chilies', qty: '2 whole' } ],
                steps: [ 'Finely chop onions, tomatoes, green chilies, and garlic.', 'Saute onions and garlic until translucent. Add tomatoes and chilies.', 'Cook down for 10 mins until it forms a thick tomato sauce. Season well.', 'Make 4 small wells in the sauce and crack an egg into each.', 'Cover pan and simmer for 5-7 mins until egg whites are set. Serve with bread or paratha.' ]
            },
            {
                id: 'r9', title: 'Crispy Potato & Sausage Hash', emoji: '🥔', prepTime: 25, servings: 3, diet: 'High-Protein',
                ingredients: [ { name: 'Sausages', qty: '4 links' }, { name: 'Potatoes', qty: '3 medium' }, { name: 'Onion', qty: '1 medium' }, { name: 'Paprika', qty: '1 tsp' }, { name: 'Oil', qty: '2 tbsp' } ],
                steps: [ 'Peel and chop potatoes into small half-inch cubes. Slice sausages into rounds.', 'Heat oil in a large skillet. Add potatoes and cook until crispy and tender (12-15 mins).', 'Add sliced sausages and diced onions to the pan.', 'Season with paprika, salt, and black pepper.', 'Cook for another 5-7 mins until sausages are browned. Great for breakfast or dinner!' ]
            },
            {
                id: 'r10', title: 'Pan-Seared Lemon Herb Chicken', emoji: '🍗', prepTime: 20, servings: 2, diet: 'Low-Carb',
                ingredients: [ { name: 'Chicken Breast', qty: '2 pieces' }, { name: 'Lemon', qty: '1 whole' }, { name: 'Garlic', qty: '3 cloves' }, { name: 'Mixed Herbs', qty: '1 tsp' }, { name: 'Butter', qty: '1 tbsp' } ],
                steps: [ 'Pound chicken breasts to an even thickness. Season with salt, pepper, and mixed herbs.', 'Heat oil in a skillet over medium-high heat. Sear chicken for 6-7 mins per side.', 'During the last 2 minutes, add butter, minced garlic, and the juice of half a lemon to the pan.', 'Baste the chicken with the pan juices as it finishes cooking.', 'Let rest for 3 minutes before slicing.' ]
            },
            {
                id: 'r11', title: 'Cheesy Baked Macaroni & Keema', emoji: '🧀', prepTime: 35, servings: 5, diet: 'High-Protein',
                ingredients: [ { name: 'Macaroni', qty: '250g' }, { name: 'Minced Meat', qty: '300g' }, { name: 'Tomato Paste', qty: '2 tbsp' }, { name: 'Mozzarella Cheese', qty: '1 cup' }, { name: 'Onion', qty: '1 medium' } ],
                steps: [ 'Boil macaroni until al dente and drain.', 'Saute finely chopped onion, then add minced meat (keema) and cook until browned.', 'Stir in tomato paste, salt, pepper, and a little water to make a thick meat sauce.', 'Mix the cooked macaroni into the meat sauce.', 'Transfer to a baking dish, top with mozzarella cheese, and bake/broil for 5-10 mins until cheese is bubbly.' ]
            },
            {
                id: 'r12', title: 'BBQ Chicken Pita Pockets', emoji: '🥙', prepTime: 15, servings: 2, diet: 'High-Protein',
                ingredients: [ { name: 'Chicken Breast', qty: '200g' }, { name: 'BBQ Sauce', qty: '3 tbsp' }, { name: 'Pita Bread', qty: '2 whole' }, { name: 'Cucumber', qty: '1/2 whole' }, { name: 'Yogurt', qty: '2 tbsp' } ],
                steps: [ 'Shred or chop pre-cooked or quickly pan-fried chicken.', 'Mix the chicken with BBQ sauce until fully coated.', 'Slice cucumber into thin rounds or half-moons. Mix yogurt with a pinch of salt and mint.', 'Cut pita bread in half and warm it up.', 'Stuff the pita pockets with BBQ chicken, cucumber slices, and a drizzle of yogurt.' ]
            },
            {
                id: 'r13', title: 'Garlic Butter Prawns', emoji: '🦐', prepTime: 15, servings: 2, diet: 'Low-Carb',
                ingredients: [ { name: 'Prawns', qty: '250g' }, { name: 'Butter', qty: '3 tbsp' }, { name: 'Garlic', qty: '4 cloves' }, { name: 'Lemon', qty: '1/2 whole' }, { name: 'Coriander', qty: '1 tbsp' } ],
                steps: [ 'Clean and devein prawns (or use frozen shelled prawns, thawed).', 'Mince garlic finely.', 'Melt butter in a skillet over medium heat. Add garlic and cook for 30 seconds.', 'Add prawns and cook for 2-3 minutes per side until pink and opaque.', 'Squeeze lemon juice on top, garnish with fresh chopped coriander, and serve immediately.' ]
            },
            {
                id: 'r14', title: 'Cheesy Mashed Potato Patties', emoji: '🍘', prepTime: 25, servings: 4, diet: 'Vegetarian',
                ingredients: [ { name: 'Potatoes', qty: '4 medium' }, { name: 'Cheddar Cheese', qty: '1/2 cup' }, { name: 'Breadcrumbs', qty: '1/2 cup' }, { name: 'Black Pepper', qty: '1 tsp' }, { name: 'Egg', qty: '1 whole' } ],
                steps: [ 'Boil potatoes until soft, then mash them smoothly.', 'Mix mashed potatoes with grated cheddar cheese, black pepper, and salt.', 'Form the mixture into small, flat round patties.', 'Dip each patty lightly in beaten egg, then coat with breadcrumbs.', 'Shallow fry in a pan until golden brown and crispy on both sides.' ]
            },
            {
                id: 'r15', title: 'Beef & Bell Pepper Stir Fry', emoji: '🥩', prepTime: 30, servings: 3, diet: 'High-Protein',
                ingredients: [ { name: 'Beef Undercut', qty: '300g' }, { name: 'Bell Pepper', qty: '2 whole' }, { name: 'Soy Sauce', qty: '3 tbsp' }, { name: 'Onion', qty: '1 medium' }, { name: 'Garlic', qty: '3 cloves' } ],
                steps: [ 'Slice beef undercut very thinly against the grain. Slice peppers and onions into strips.', 'Marinate beef in 1 tbsp soy sauce and a pinch of baking soda for 10 mins (tenderizes it).', 'Stir fry beef in a hot wok/pan with a little oil until browned. Remove and set aside.', 'Saute garlic, onions, and bell peppers for 3 minutes.', 'Return beef to the pan, add remaining soy sauce, toss well for 2 mins, and serve.' ]
            },
            {
                id: 'r16', title: 'Quick Chicken Reshmi Kabab', emoji: '🍢', prepTime: 40, servings: 4, diet: 'High-Protein',
                ingredients: [ { name: 'Minced Chicken', qty: '500g' }, { name: 'Cream', qty: '2 tbsp' }, { name: 'Green Chilies', qty: '3 whole' }, { name: 'Onion', qty: '1 small' }, { name: 'Coriander', qty: '2 tbsp' } ],
                steps: [ 'In a food processor, blend onion, green chilies, and fresh coriander until finely chopped.', 'Squeeze excess water from the onion mixture.', 'Mix the onion paste into the minced chicken (keema) along with cream, salt, and roasted cumin powder.', 'Shape the mixture into long kababs on skewers (or just roll by hand).', 'Pan-fry with a little oil on medium heat until golden brown all around and cooked through.' ]
            },
            {
                id: 'r17', title: 'Dhaba Style Daal Mash', emoji: '🍛', prepTime: 35, servings: 4, diet: 'Vegetarian',
                ingredients: [ { name: 'Daal Mash', qty: '1 cup' }, { name: 'Garlic', qty: '4 cloves' }, { name: 'Whole Red Chilies', qty: '4 pieces' }, { name: 'Butter', qty: '2 tbsp' }, { name: 'Ginger', qty: '1 inch' } ],
                steps: [ 'Soak Daal Mash for 20 mins. Boil it in water with a pinch of turmeric and salt until just tender but holding shape (approx 20 mins). Drain excess water.', 'Julienne the ginger and slice the garlic thinly.', 'In a small pan, melt butter/ghee. Add sliced garlic and whole red chilies, frying until garlic is golden (Tarka).', 'Pour the hot garlic butter over the boiled daal.', 'Garnish with ginger and fresh green chilies. Serve with roti.' ]
            },
            {
                id: 'r18', title: 'Anda Ghotala', emoji: '🥘', prepTime: 15, servings: 2, diet: 'Vegetarian',
                ingredients: [ { name: 'Eggs', qty: '3 whole' }, { name: 'Tomatoes', qty: '2 medium' }, { name: 'Onion', qty: '1 medium' }, { name: 'Green Chilies', qty: '2 whole' }, { name: 'Cumin', qty: '1/2 tsp' } ],
                steps: [ 'Finely chop the onion, tomatoes, and green chilies.', 'Saute onions in oil with cumin seeds until soft.', 'Add tomatoes and cook until they break down and oil separates.', 'Crack the eggs directly into the pan and scramble vigorously with the tomato masala.', 'Cook until eggs are done to your liking. Top with fresh coriander and serve with pav or paratha.' ]
            },
            {
                id: 'r19', title: 'Tawa Chicken Boti', emoji: '🍗', prepTime: 25, servings: 3, diet: 'High-Protein',
                ingredients: [ { name: 'Chicken Breast', qty: '400g' }, { name: 'Yogurt', qty: '3 tbsp' }, { name: 'Tikka Masala', qty: '2 tbsp' }, { name: 'Lemon', qty: '1 whole' }, { name: 'Oil', qty: '2 tbsp' } ],
                steps: [ 'Cut chicken breast into small 1-inch cubes.', 'Marinate chicken in yogurt, tikka masala, and lemon juice for at least 10 minutes.', 'Heat oil on a flat tawa or large frying pan over high heat.', 'Spread the chicken evenly on the tawa. Let it sear for 3-4 mins before stirring.', 'Stir-fry until water dries up and chicken gets a charred, roasted look.' ]
            },
            {
                id: 'r20', title: 'Crispy Bhindi Pyaaz', emoji: '🥒', prepTime: 25, servings: 3, diet: 'Vegetarian',
                ingredients: [ { name: 'Okra', qty: '400g' }, { name: 'Onion', qty: '2 large' }, { name: 'Tomatoes', qty: '2 medium' }, { name: 'Cumin', qty: '1 tsp' }, { name: 'Green Chilies', qty: '2 whole' } ],
                steps: [ 'Wash and thoroughly dry the okra (bhindi) to prevent sliminess. Cut into 1-inch pieces.', 'Slice onions thickly. Dice the tomatoes.', 'Fry okra in oil on medium-high heat until crisp and slightly browned. Remove from pan.', 'In the same oil, add cumin and onions. Saute until translucent, then add tomatoes and cook for 3 mins.', 'Return okra to the pan, add salt, cover, and steam on very low heat for 5 mins.' ]
            },
            {
                id: 'r21', title: 'Aloo Baingan', emoji: '🍆', prepTime: 30, servings: 4, diet: 'Vegetarian',
                ingredients: [ { name: 'Potatoes', qty: '2 medium' }, { name: 'Eggplant', qty: '2 medium' }, { name: 'Tomatoes', qty: '2 medium' }, { name: 'Cumin', qty: '1 tsp' }, { name: 'Garlic', qty: '2 cloves' } ],
                steps: [ 'Cut potatoes and eggplants (baingan) into equal-sized cubes.', 'Heat oil, add cumin seeds and minced garlic. Saute for 30 seconds.', 'Add potatoes and cook for 5 minutes (they take longer than eggplant).', 'Add eggplant, chopped tomatoes, salt, and a pinch of turmeric. Mix well.', 'Cover and cook on medium-low heat for 15-20 mins until veggies are completely tender and flavors meld.' ]
            },
            {
                id: 'r22', title: 'Hara Masala Keema', emoji: '🍛', prepTime: 35, servings: 4, diet: 'Low-Carb',
                ingredients: [ { name: 'Minced Meat', qty: '400g' }, { name: 'Coriander', qty: '1 bunch' }, { name: 'Mint', qty: '1/2 bunch' }, { name: 'Green Chilies', qty: '4 whole' }, { name: 'Yogurt', qty: '4 tbsp' } ],
                steps: [ 'Blend fresh coriander, mint leaves, green chilies, and yogurt into a smooth green paste.', 'Heat oil and brown the minced meat (keema) until water evaporates.', 'Pour the green paste over the keema.', 'Add salt and roasted cumin powder. Mix thoroughly.', 'Cover and simmer on low heat for 15-20 mins until oil separates on top.' ]
            },
            {
                id: 'r23', title: 'Chicken Jalapeno Poppers', emoji: '🌶️', prepTime: 35, servings: 4, diet: 'Low-Carb',
                ingredients: [ { name: 'Jalapenos', qty: '8 large' }, { name: 'Cheddar Cheese', qty: '1/2 cup' }, { name: 'Chicken Breast', qty: '1 piece' }, { name: 'Cream', qty: '2 tbsp' }, { name: 'Breadcrumbs', qty: '1/2 cup' } ],
                steps: [ 'Boil and shred the chicken piece. Slice jalapenos/large local green chilies in half and remove seeds.', 'Mix shredded chicken with cream, cheddar cheese, and a pinch of salt.', 'Stuff each chili half generously with the cheesy chicken mixture.', 'Optional: Coat the stuffed chilies in beaten egg and breadcrumbs for a crispy shell.', 'Bake at 200°C for 15 mins or shallow fry until golden and cheese melts.' ]
            },
            {
                id: 'r24', title: 'Sweet & Sour Cauliflower', emoji: '🥦', prepTime: 30, servings: 3, diet: 'Vegetarian',
                ingredients: [ { name: 'Cauliflower', qty: '1 medium head' }, { name: 'Ketchup', qty: '3 tbsp' }, { name: 'Soy Sauce', qty: '2 tbsp' }, { name: 'Garlic', qty: '3 cloves' }, { name: 'Green Chilies', qty: '2 whole' } ],
                steps: [ 'Cut cauliflower into bite-sized florets. Boil in salted water for 5 mins, then drain well.', 'Mince garlic and slice green chilies.', 'Heat oil in a wok. Fry the cauliflower florets until slightly crispy.', 'Push cauliflower aside, add garlic and chilies, saute for 1 minute.', 'Add ketchup and soy sauce. Toss everything together until the cauliflower is glossy and coated. Serve with rice.' ]
            },
            {
                id: 'r25', title: 'Black Pepper Chicken Handi', emoji: '🍲', prepTime: 30, servings: 4, diet: 'High-Protein',
                ingredients: [ { name: 'Chicken Breast', qty: '500g' }, { name: 'Cream', qty: '1/2 cup' }, { name: 'Yogurt', qty: '1/4 cup' }, { name: 'Black Pepper', qty: '1 tbsp' }, { name: 'Green Chilies', qty: '3 whole' } ],
                steps: [ 'Cut chicken into small cubes.', 'Heat oil in a wok/handi. Add chicken and fry until it changes color.', 'Whisk yogurt and add to the chicken. Cook until water dries up.', 'Add freshly crushed black pepper and slit green chilies. Mix well.', 'Lower the heat, pour in the cream, stir for 2 mins (do not boil cream). Serve hot with naan.' ]
            }
        ];

        // --- SAMPLE PRESET PANTRY DATA ---
        const sampleInventory = [
            { id: 'i1', name: 'Chicken Breast', qty: '1000g', location: 'fridge', expiry: getFutureDate(3) },
            { id: 'i2', name: 'Broccoli', qty: '2 heads', location: 'fridge', expiry: getFutureDate(4) },
            { id: 'i3', name: 'Garlic', qty: '1 bulb', location: 'pantry', expiry: getFutureDate(20) },
            { id: 'i4', name: 'Butter', qty: '250g', location: 'fridge', expiry: getFutureDate(15) },
            { id: 'i5', name: 'Olive Oil', qty: '500ml', location: 'pantry', expiry: getFutureDate(60) },
            { id: 'i6', name: 'Chickpeas', qty: '3 cans', location: 'pantry', expiry: getFutureDate(180) },
            { id: 'i7', name: 'Cucumber', qty: '2 whole', location: 'fridge', expiry: getFutureDate(2) },
            { id: 'i8', name: 'Tomatoes', qty: '4 whole', location: 'fridge', expiry: getFutureDate(5) },
            { id: 'i9', name: 'Eggs', qty: '12 pack', location: 'fridge', expiry: getFutureDate(10) },
            { id: 'i10', name: 'Onion', qty: '1 kg', location: 'pantry', expiry: getFutureDate(30) },
            { id: 'i11', name: 'Green Chilies', qty: '200g', location: 'fridge', expiry: getFutureDate(7) }
        ];
