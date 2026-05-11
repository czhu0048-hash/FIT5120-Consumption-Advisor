<template>
    <div class="clothing-awareness-view">
        <RedUseHeader inter="The " grace="Story behind " inter-two="our wardrobes"></RedUseHeader>
        <p class="text-secondary fs-8">Australia sends 100,000+ tonnes of textiles to landfill every year. Here's what
            the numbers actually look like.</p>



        <div v-if="loading" class="status-message">Loading data...</div>
        <div v-else-if="error" class="status-message error">Failed to load data. Please try again.</div>
        <div v-else class="charts-column">
            <div class="card" style="padding: 5%;">
                <div class="row gap-5" style="justify-content: center; align-items: center;">
                    <label for="" style="width: auto;">Group by:</label>
                    <div class="tabs">
                        <button class="tab" :class="{ active: textileDataIndex === 0 }"
                            @click="textileDataIndex = 0">Disposal Type</button>
                        <button class="tab" :class="{ active: textileDataIndex === 1 }"
                            @click="textileDataIndex = 1">Material</button>
                        <button class="tab" :class="{ active: textileDataIndex === 2 }"
                            @click="textileDataIndex = 2">Source Sector</button>
                    </div>
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
import RedUseHeader from '@/components/RedUseHeader.vue'

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
</style>
