<script setup>
import { ref, onMounted } from 'vue';
import RecipeCardOverview from '@/components/RecipeCardOverview.vue';

const recipe = ref({});

onMounted(async () => {
    const response = await fetch(`${import.meta.env.BASE_URL}testdata.json`);
    const data = await response.json();
    const first = data[0];
    recipe.value = {
        recipe_name: first.title,
        img_src: first.image_url,
        total_time: first.total_time_mins ? `${first.total_time_mins} mins` : null,
        rating: first.rating ?? null,
        matchedIngredients: first.matchedIngredients ?? []
    };
});
</script>

<template>
    <RecipeCardOverview :recipeJson="recipe" />
</template>