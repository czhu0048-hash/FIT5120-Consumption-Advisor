<template>
    <div class="d-flex" style="min-height: 100vh;">
        <div class="flex-grow-1 container mt-5">

            <div class="text-center mb-4">
                <h1 class="display-5 fw-normal">
                    <span class="font-inter"><b>Bin it</b></span>
                    <span class="font-grace"> Smart :)</span></h1>
                <p class="text-secondary fs-8">Pick your food waste type and stop guessing. Green bin, recycling, or general waste, we got you.</p>
            </div>

        <div class="category-wrapper">
            <select class="form-select" v-model="selectedCategory">
                <option value="">All categories</option>
                <option v-for="method in allMethods" :key="method.id" :value="method.food_category">
                    {{ method.label }}
                </option>
            </select>
        </div>
        <div v-if="loading" class="text-center mt-5">Loading...</div>
        <div v-else-if="filteredMethods.length" class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3 mt-3 px-3">
            <div v-for="method in filteredMethods" :key="method.id" class="col">
                <FoodDisposalCard :method="method" />
            </div>
        </div>
        <div v-else class="text-center mt-5 text-muted">No disposal methods found.</div>
        </div>
    </div>
</template>

<script setup>
import FoodDisposalCard from '@/components/FoodDisposalCard.vue';
import { onMounted, ref, computed } from 'vue';
import { fetchDisposalMethods } from '@/utils/disposalmethodFetcher';

const allMethods = ref([]);
const selectedCategory = ref('');
const loading = ref(true);

const filteredMethods = computed(() =>
    selectedCategory.value
        ? allMethods.value.filter(m => m.food_category === selectedCategory.value)
        : allMethods.value
);

onMounted(async () => {
    allMethods.value = await fetchDisposalMethods();
    loading.value = false;
});
</script>

<style scoped>


.font-inter {
	font-family: 'Inter', sans-serif;
	overflow-x: hidden;
    color: black
}


.font-grace {
	font-family: 'Covered By Your Grace';
	color: #009387;
	font-size: clamp(24px, 5vw, 60px);
	margin-bottom: 20px;
    word-spacing: -7px;
}


.category-wrapper {
    max-width: 500px;
    margin: 0 auto;
    padding: 0;
}
</style>