<template>
    <div class="clothing-awareness-view">
        <h1 class="display-5 fw-normal">
            <span class="font-inter"><b>The</b></span>
            <span class="font-grace"> Story behind </span>
            <span class="font-inter"><b>our wardrobes</b></span>
        </h1>
        <p class="text-secondary fs-8">Australia sends 100,000+ tonnes of textiles to landfill every year. Here's what
            the numbers actually look like.</p>



        <div v-if="loading" class="status-message">Loading data...</div>
        <div v-else-if="error" class="status-message error">Failed to load data. Please try again.</div>
        <div v-else class="charts-column">
            <div class="card" style="padding: 5%;">
                <div class="row gap-5" style="justify-content: center; align-items: center;">
                    <label for="" style="width: auto;">Group by:</label>
                    <button @click="textileDataIndex = 0">Disposal Type</button>
                    <button @click="textileDataIndex = 1">Material</button>
                    <button @click="textileDataIndex = 2">Source Sector</button>
                </div>
                <ClothingAwarenessChartDisposal v-if="textileDataIndex == 0" :data="textileData" />
                <ClothingAwarenessChartMaterials v-else-if="textileDataIndex == 1" :data="materialsData" />
                <ClothingAwarenessChartSectors v-else :data="detailsData" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ClothingAwarenessChartDisposal from '@/components/ClothingAwarenessChartDisposal.vue'
import ClothingAwarenessChartMaterials from '@/components/ClothingAwarenessChartMaterials.vue'
import ClothingAwarenessChartSectors from '@/components/ClothingAwarenessChartSectors.vue'
import { fetchTextileYears, fetchTextileMaterials, fetchTextileDetails } from '@/utils/clothingAwarenessStasticsFetcher'

const textileData = ref([])
const materialsData = ref([])
const detailsData = ref([])
const textileDataIndex = ref(0)
const loading = ref(true)
const error = ref(false)

onMounted(async () => {
    const [yearly, materials, details] = await Promise.all([
        fetchTextileYears(),
        fetchTextileMaterials(),
        fetchTextileDetails(),
    ])
    if (!yearly?.length && !materials?.length && !details?.length) {
        error.value = true
    } else {
        textileData.value = yearly ?? []
        materialsData.value = materials ?? []
        detailsData.value = details ?? []
    }
    loading.value = false
})
</script>

<style scoped>
.clothing-awareness-view {
    padding: 2rem;
    max-width: 1000px;
    margin: 0 auto;
    text-align: center;
}

.view-title {
    margin-bottom: 1.0rem;
    text-align: center;
}

.charts-column {
    display: flex;
    flex-direction: column;
    gap: 2rem;
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

button {
    width: auto;
    border-radius: 5rem;
    border-color: black;
    border-style: solid;
    background-color: transparent;
    transition: all 0.2s;
}

button:hover {
    border-color: transparent;
    background-color: darkgray;
    color: white;
}

button:focus {
    color: white;
    background-color: darkgreen;
}


.font-inter {
    font-family: 'Inter', sans-serif;
    overflow-x: hidden;
}


.font-grace {
    font-family: 'Covered By Your Grace';
    color: #009387;
    font-size: clamp(24px, 5vw, 60px);
    margin-bottom: 20px;
    word-spacing: -7px;
}
</style>
