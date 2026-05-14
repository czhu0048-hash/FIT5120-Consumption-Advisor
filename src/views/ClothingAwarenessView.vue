<template>
    <div class="clothing-awareness-view">
        <RedUseHeader inter="The " grace="Story behind " inter-two="our wardrobes"></RedUseHeader>
        <p class="text-secondary fs-8">Australia sends 100,000+ tonnes of textiles to landfill every year. Here's what
            the numbers actually look like.</p>



        <div v-if="loading" class="status-message">Loading data...</div>
        <div v-else-if="error" class="status-message error">Failed to load data. Please try again.</div>
        <div v-else class="charts-column">
            <div class="card" style="padding: 5%;">
                <ClothingAwarenessCard title="Key insight"
                    description="Over 200,000 tonnes of textile waste are still sent to landfill each year — significantly more than any other pathway."
                    insights="Landfill remains the dominant disposal pathway"
                    badge=">3× more than the next largest pathway" badge-icon="pi pi-arrow-up-right">
                    <ClothingAwarenessChartDisposal :data="textileData" />
                </ClothingAwarenessCard>
            </div>
            <div class="card" style="padding: 5%;">
                <div class="row gap-5" style="justify-content: center; align-items: center;">
                    <div class="tabs">
                        <button class="tab" :class="{ active: textileDataIndex === 0 }"
                            @click="textileDataIndex = 0">Material</button>
                        <button class="tab" :class="{ active: textileDataIndex === 1 }"
                            @click="textileDataIndex = 1">Source Sector</button>
                    </div>
                </div>
                <ClothingAwarenessCard v-if="textileDataIndex == 0" title="key insight"
                    description="Clothing makes up the largest share of textile waste"
                    insights="clothing waste is consistently higher than other txtiles, peaking at 120,000 tons in 2019-2020"
                    badge="~55% of total textile waste is clothing">
                    <ClothingAwarenessChartMaterials :data="materialsData" />
                </ClothingAwarenessCard>
                <ClothingAwarenessCard v-else title="key insight"
                    description="Municipal waste is the biggest source of textile waste" insights="textile waste from municipal solid waste is the highest across all sectors, 
                    contributing more than half of the total" badge=">50% of textile waste comes from municiple waste">
                    <ClothingAwarenessChartSectors :data="detailsData" />
                </ClothingAwarenessCard>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ClothingAwarenessChartDisposal from '@/components/clothing/ClothingAwarenessChartDisposal.vue'
import ClothingAwarenessChartMaterials from '@/components/clothing/ClothingAwarenessChartMaterials.vue'
import ClothingAwarenessChartSectors from '@/components/clothing/ClothingAwarenessChartSectors.vue'
import { fetchTextileYears, fetchTextileMaterials, fetchTextileDetails } from '@/utils/clothingAwarenessStasticsFetcher'
import RedUseHeader from '@/components/misc/RedUseHeader.vue'
import ClothingAwarenessCard from '@/components/clothing/ClothingAwarenessCard.vue'

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
