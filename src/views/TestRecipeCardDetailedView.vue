<template>
    <RecipeCardDetailed :recipeJson="testRecipe" />
</template>

<script setup>
import RecipeCardDetailed from '@/components/RecipeCardDetailed.vue'

const testRecipe = {
    id: 210,
    recipe_id: 210,
    recipe_name: "Strawberry Fig Preserve",
    img_src: "https://www.allrecipes.com/thmb/08VO_wdpHckl4y4RH_FOS3pPgHU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/9262835-379cd228018a4cd689cf01070c0d4579.jpg",
    total_time: "30 mins",
    total_time_mins: 30,
    difficulty: "Easy",
    rating: null,
    url: null,
    matchedIngredients: [],
    ingredients: "3 cups mashed fresh ripe figs||3 cups white sugar||2 (3 ounce) packages strawberry flavored gelatin (such as Jell-O®)||6 half pint canning jars with lids and rings",
    directions: "Heat figs, sugar, and strawberry gelatin together in a saucepan over medium-high heat; bring to a rolling boil. Cook fig mixture, stirring frequently, for 4 minutes; remove from heat.\nSterilize jars and lids in boiling water for at least 5 minutes. Pour hot fig mixture into hot, sterilized jars, filling to within 1/2 inch of the top. Run a knife or thin spatula around the insides of the jars after they have been filled to remove any air bubbles. Wipe the rims of the jars with a moist paper towel to remove any food residue. Top with lids and screw on rings.\nPlace a rack in the bottom of a large stockpot and fill halfway with water. Bring to a boil and lower jars into the boiling water using a holder. Leave a 2-inch space between the jars. Pour in more boiling water if necessary to bring the water level to at least 1 inch above the tops of the jars. Bring the water to a rolling boil, cover the pot, and process for 15 minutes.\nRemove the jars from the stockpot and place onto a cloth-covered or wood surface, several inches apart, until cool. Once cool, press the top of each lid with a finger, ensuring that the seal is tight (lid does not move up or down at all). Store in a cool, dark area."
}
</script>
