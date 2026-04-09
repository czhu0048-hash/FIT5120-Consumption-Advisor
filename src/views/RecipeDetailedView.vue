<template>
    <div>
        <RecipeCardDetailed :recipe-json="selectedRecipe"></RecipeCardDetailed>
    </div>
</template>

<script setup>
import RecipeCardDetailed from '@/components/RecipeCardDetailed.vue';
import { selectedRecipe } from '@/utils/recipeSelector';


</script>