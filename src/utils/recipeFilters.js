// Each entry: { label: string, value: string }
// `value` is the substring matched against the recipe's `ingredients` field

export const ingredientFilter = [
    // Produce & Fruit
    { label: "Apple", value: "apple" },
    { label: "Banana", value: "banana" },
    { label: "Strawberry", value: "strawberr" },
    { label: "Cranberry", value: "cranberr" },
    { label: "Cherry", value: "cherr" },
    { label: "Watermelon", value: "watermelon" },
    { label: "Coconut", value: "coconut" },
    { label: "Lemon", value: "lemon" },
    { label: "Onion", value: "onion" },
    { label: "Garlic", value: "garlic" },
    // Dairy & Eggs
    { label: "Butter", value: "butter" },
    { label: "Milk", value: "milk" },
    { label: "Cream", value: "cream" },
    { label: "Cheese", value: "cheese" },
    { label: "Egg", value: "egg" },
    // Pantry
    { label: "Sugar", value: "sugar" },
    { label: "Flour", value: "flour" },
    { label: "Salt", value: "salt" },
    { label: "Cinnamon", value: "cinnamon" },
    { label: "Nutmeg", value: "nutmeg" },
    { label: "Ginger", value: "ginger" },
    { label: "Honey", value: "honey" },
    { label: "Oats", value: "oats" },
    { label: "Olive Oil", value: "olive oil" },
    { label: "Vinegar", value: "vinegar" },
    { label: "Cornstarch", value: "cornstarch" },
    // Nuts & Dried Fruit
    { label: "Walnuts", value: "walnut" },
    { label: "Almonds", value: "almond" },
    { label: "Pecans", value: "pecan" },
    { label: "Raisins", value: "raisin" },
    // Proteins
    { label: "Chicken", value: "chicken" },
    { label: "Beef", value: "beef" },
    { label: "Pork", value: "pork" },
    { label: "Salmon", value: "salmon" },
    { label: "Shrimp", value: "shrimp" },
    { label: "Tofu", value: "tofu" },
]

// Each entry: { label: string, value: string }
// `value` is the substring matched against the recipe's `cuisine_path` field

export const dietaryFilter = [
    { label: "Appetizers & Snacks", value: "Appetizers and Snacks" },
    { label: "BBQ & Grilling", value: "BBQ & Grilling" },
    { label: "Bread", value: "Bread" },
    { label: "Breakfast & Brunch", value: "Breakfast and Brunch" },
    { label: "Desserts", value: "Desserts" },
    { label: "Drinks", value: "Drinks Recipes" },
    { label: "Everyday Cooking", value: "Everyday Cooking" },
    { label: "Fruits & Vegetables", value: "Fruits and Vegetables" },
    { label: "Main Dishes", value: "Main Dishes" },
    { label: "Meat & Poultry", value: "Meat and Poultry" },
    { label: "Salad", value: "Salad" },
    { label: "Sauces & Condiments", value: "Sauces and Condiments" },
    { label: "Seafood", value: "Seafood" },
    { label: "Side Dish", value: "Side Dish" },
    { label: "Soups & Stews", value: "Soup" },
    { label: "Mexican", value: "Mexican" },
    { label: "World Cuisine", value: "Cuisine" },
]
