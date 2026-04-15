<template>
    <div class="d-flex flex-wrap justify-content-center">
        <div class="card m-2" style="width: 20rem;">
            <img v-if="recipeJson.img_src" :src="recipeJson.img_src" class="card-img-top"
                :alt="recipeJson.recipe_name" />
            <div class="card-header">
                {{ recipeJson.recipe_name }}
            </div>
            <div class="card-header d-flex justify-content-between">
                <span v-if="recipeJson.total_time">{{ recipeJson.total_time }}</span>
                <span v-if="recipeJson.rating">⭐ {{ recipeJson.rating }}</span>
            </div>
            <div class="card-body" v-if="recipeJson.matchedIngredients && recipeJson.matchedIngredients.length">
                <strong>Matched:</strong> {{ recipeJson.matchedIngredients.join(', ') }}
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    recipeJson: {
        type: Object,
        default: () => ({})
    },
})
</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 10px;
    width: 8rem;
    height: 20rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-img-top {
    min-height: 200px;
    max-height: 200px;
    object-fit: cover;
}

.card-header {
    background-color: #275FDA;
    color: white;
    padding: 10px;
}

.card-body ul,
.card-body ol {
    padding-left: 1.2rem;
    margin-bottom: 0;
}

.card-footer a {
    color: #275FDA;
    text-decoration: none;
    font-weight: bold;
}
</style>