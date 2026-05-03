<template>
    <div class="container card gap-4 col-12 col-md-6" style="justify-content: center; align-items: center;
    text-align: center; background-color: #eee; padding: 2rem;">

        <div v-if="result" style="width: 100%; display: flex; flex-direction: column; align-items: center; gap: 1rem;">

            <!-- Badge + Label -->
            <div class="badge" style="font-size: 0.75rem; font-weight: 800; letter-spacing: 0.15em;
                padding: 0.3rem 0.9rem; border-radius: 10rem;">
                {{ result.label }}
                <span>{{ result.badge }}</span>
            </div>

            <!-- Status -->
            <h1 style="font-weight: bold; color: #222; margin: 0;">{{ result.status }}</h1>

            <!-- Headline -->
            <p style="font-size: 1rem; font-weight: 600; color: #444; margin: 0;">{{ result.headline }}</p>

            <!-- Body -->
            <p style="color: #555; max-width: 480px; margin: 0;">{{ result.body }}</p>

            <!-- Dynamic reasons -->
            <div v-if="dynamicReasons.length > 0"
                style="background: white; border-radius: 0.75rem; padding: 1rem 1.25rem; width: 100%; text-align: left;">
                <p
                    style="font-size: 0.8rem; font-weight: 700; color: #888; margin: 0 0 0.5rem; text-transform: uppercase; letter-spacing: 0.1em;">
                    A few things to consider:
                </p>
                <ul
                    style="margin: 0; padding-left: 1.2rem; color: #555; font-size: 0.9rem; display: flex; flex-direction: column; gap: 0.3rem;">
                    <li v-for="(reason, i) in dynamicReasons" :key="i">{{ reason }}</li>
                </ul>
            </div>

            <div class="row gap-2" style="width: 100%; justify-content: center;">
                <!-- Calculator Button -->
                <button class="questionaireButton">
                    Clothing Care Calculator →
                </button>
                <!-- Community Listing Button -->
                <button class="questionaireButton questionaireSubButton">
                    Browse Community Listings →
                </button>
            </div>
            <!-- Tip -->
            <p style="color: #888; font-style: italic; font-size: 0.9rem; margin: 0;">{{ result.tip }}</p>

            <!-- Reset -->
            <button style="border: none; color: #888;" @click="resetQuestionaire">
                <i class="pi pi-refresh"></i> Start over
            </button>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue'
import { getScore, resetQuestionaire } from '@/utils/questionaireController'

const props = defineProps({
    results: {
        type: Object,
        required: true,
    }
})

const result = computed(() => {
    const score = getScore.value
    return props.results.scoreMappings.find(m => score >= m.range[0] && score <= m.range[1]) ?? null
})

const dynamicReasons = computed(() => {
    const reasons = []
    if (getScore.value >= 7) {
        return reasons;
    }
    const dynamicMap = props.results.dynamicReasons
    for (const optionMap of Object.values(dynamicMap)) {
        reasons.push(...Object.values(optionMap))
    }
    return reasons
})
</script>

<style scoped>
.badge {
    background-color: #fff;
    color: grey;
}
</style>
