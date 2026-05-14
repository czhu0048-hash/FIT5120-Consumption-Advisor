<template>
    <div class="d-flex" style="min-height: 100vh;">
        <div class="flex-grow-1 container mt-5" style="text-align: center;">

            <div class="text-center mb-4">
                <RedUseHeader inter="Bin it " grace="Smart"></RedUseHeader>
                <p class="text-secondary fs-8">Pick your food waste type and stop guessing. Green bin, recycling, or
                    general waste, we got you.</p>
            </div>
            <i v-if="loading" class="pi pi-spin pi-spinner" style="font-size: 2rem; color: green;"></i>
            <div v-else-if="filteredMethods.length" class="row row-cols-4 g-3 mt-3">
                <div v-for="(method, index) in filteredMethods" :key="method.id" style="display: block;">
                    <FoodDisposalCard :method="method" :stream-color="getColorByIndex(index).text" />
                </div>
            </div>
            <div v-else class="text-center mt-5 text-muted">No disposal methods found.</div>
        </div>
    </div>
</template>

<script setup>
import FoodDisposalCard from '@/components/food/FoodDisposalCard.vue';
import { onMounted, ref, computed } from 'vue';
import { fetchDisposalMethods } from '@/utils/disposalmethodFetcher';
import RedUseHeader from '@/components/misc/RedUseHeader.vue';
import { getColorByIndex } from '@/utils/colorPalette';

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
