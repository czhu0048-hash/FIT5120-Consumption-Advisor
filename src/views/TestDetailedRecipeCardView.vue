<script setup>
import { ref, onMounted } from 'vue';
import RecipeCardDetailed from '@/components/RecipeCardDetailed.vue';

const recipe = ref({});

onMounted(async () => {
    const response = await fetch(`${import.meta.env.BASE_URL}testdatadetailed.json`);
    const data = await response.json();
    const first = data[0];
    recipe.value = {
        recipe_name: first.title,
        img_src: first.image_url,
        total_time: first.total_time_mins ? `${first.total_time_mins} mins` : null,
        rating: first.rating ?? null,
        ingredients: first.ingredients_clean ?? null,
        directions: first.instructions ?? null,
        url: first.url ?? null,
        matchedIngredients: first.matchedIngredients ?? []
    };
});
</script>

<template>
    <RecipeCardDetailed :recipeJson="recipe" />
</template>