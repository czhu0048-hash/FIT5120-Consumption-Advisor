<template>
    <div class="clothing-awareness-view">
        <h1 class="view-title">Clothing & Textile Waste Awareness</h1>

        <div v-if="loading" class="status-message">Loading data...</div>
        <div v-else-if="error" class="status-message error">Failed to load data. Please try again.</div>
        <ClothingAwarenessChartOne v-else :data="textileData" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ClothingAwarenessChartOne from '@/components/ClothingAwarenessChartOne.vue'
import { fetchTextileYears } from '@/utils/clothingAwarenessStasticsFetcher'

const textileData = ref([])
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
    const data = await fetchTextileYears()
    if (data.length === 0) {
        error.value = true
    } else {
        textileData.value = data
    }
    loading.value = false
})
</script>

<style scoped>
.clothing-awareness-view {
    padding: 2rem;
    max-width: 1000px;
    margin: 0 auto;
}

.view-title {
    font-size: 1.75rem;
    font-weight: 700;
    margin-bottom: 1.5rem;
    text-align: center;
}

.status-message {
    text-align: center;
    padding: 2rem;
    font-size: 1rem;
    color: #555;
}

.status-message.error {
    color: #c62828;
}
</style>
