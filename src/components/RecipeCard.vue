<template>
    <div class="d-flex flex-wrap justify-content-center">
        <div class="card m-2" style="width: 50rem;">
            <div class="card-header">
                {{ recipeJson.title }}
            </div>
            <div class="card-header">
                {{ recipeJson.time }}
            </div>
            <div class="card-header">
                {{ recipeJson.difficulty }}
            </div>
            <ul class="list-group list-group-flush">
                <li v-for="(step, index) in recipeJson.steps" :key="index" class="list-group-item">
                    {{ step }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
defineProps({
    recipeJson: {
        type: Object,
        default: () => ({
            title: "",
            time: "",
            difficulty: "",
            steps: []
        })
    },
})
</script>

<style scoped>
.card {
    border: 1px solid #ccc;
    border-radius: 10px;
    height: auto;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
    background-color: #275FDA;
    color: white;
    padding: 10px;
}

.list-group-item {
    padding: 10px;
}
</style>