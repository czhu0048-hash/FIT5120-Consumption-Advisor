<script setup>
import RedUseHeader from '@/components/misc/RedUseHeader.vue';
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const journey = ref(null);

const chapterColors = [
    { bg: 'bg-success-subtle', text: 'text-success', circle: '#198754' },
    { bg: 'bg-primary-subtle', text: 'text-primary', circle: '#0d6efd' },
    { bg: 'bg-warning-subtle', text: 'text-warning', circle: '#e6a817' },
    { bg: 'bg-danger-subtle', text: 'text-danger', circle: '#dc3545' },
];

const chapterIcons = {
    origin: 'pi pi-globe',
    journey: 'pi pi-truck',
    purchase: 'pi pi-shopping-bag',
    end_of_life: 'pi pi-trash',
};

const getChapterIcon = (id) => chapterIcons[id] ?? 'pi pi-circle';

onMounted(() => {
    const state = window.history.state;
    if (state?.journeyData) {
        journey.value = state.journeyData;
    }
});

const goBack = () => router.push('/household/journey');
</script>

<template>
    <div class="container mt-5 mb-5">

        <!-- No data fallback -->
        <div v-if="!journey" class="text-center mt-5">
            <i class="pi pi-map text-muted" style="font-size: 3rem;"></i>
            <p class="text-muted mt-3">No journey data found. Please search for an item first.</p>
            <button class="btn btn-success fw-semibold" @click="goBack">
                <i class="pi pi-arrow-left me-2"></i>Go Back
            </button>
        </div>

        <div v-else>
            <!-- Hero Section -->
            <div class="text-center mb-5">
                <RedUseHeader inter="The hidden journey of " :grace="journey.displayName"></RedUseHeader>
                <p class="text-secondary mt-5 fs-6 col-md-8 mx-auto">{{ journey.heroSubtitle }}</p>
                <div class="alert alert-light border d-inline-flex align-items-center gap-2 mt-2 py-2 px-3 small">
                    <i class="pi pi-info-circle text-muted"></i>
                    <span>{{ journey.assumptionNote }}</span>
                </div>
            </div>

            <!-- Chapter Timeline -->
            <div class="mb-5">
                <div v-for="(chapter, i) in journey.chapters" :key="chapter.id">
                    <!-- Connector line between chapters -->
                    <div v-if="i > 0" class="d-flex justify-content-center my-1">
                        <div style="width: 2px; height: 2rem; background: #dee2e6;"></div>
                    </div>

                    <div class="card border-0 shadow-sm">
                        <div class="card-body p-4">
                            <!-- Step number circle -->
                            <div class="col-auto">
                                <div class="d-flex align-items-center justify-content-center rounded-circle fw-bold fs-5"
                                    :class="chapterColors[i % chapterColors.length].bg"
                                    :style="{ width: '3.5rem', height: '3.5rem', color: chapterColors[i % chapterColors.length].circle }">
                                    {{ chapter.stepNumber }}
                                </div>
                            </div>
                            <div class="row align-items-start g-3">

                                <!-- Chapter content -->
                                <div class="col">
                                    <div class="row" style="text-align: center;">
                                        <p class="small fw-bold text-uppercase mb-1"
                                            :class="chapterColors[i % chapterColors.length].text">
                                            <i :class="getChapterIcon(chapter.id)"></i>
                                            {{ chapter.stepLabel }}
                                        </p>
                                        <h5 class="fw-bold mb-2">{{ chapter.title }}</h5>
                                    </div>
                                    <p class="text-secondary mb-3">{{ chapter.text }}</p>

                                    <!-- Micro facts -->
                                    <div class="d-flex flex-wrap gap-2 mb-3">
                                        <span v-for="fact in chapter.microFacts" :key="fact"
                                            class="badge rounded-pill fw-normal"
                                            :class="[chapterColors[i % chapterColors.length].bg, chapterColors[i % chapterColors.length].text]"
                                            style="font-size: 0.8rem; padding: 0.4em 0.9em;">
                                            {{ fact }}
                                        </span>
                                    </div>

                                    <!-- Impact box -->
                                    <div class="rounded p-3" :class="chapterColors[i % chapterColors.length].bg"
                                        style="text-align: center;">
                                        <p class="small fw-semibold mb-1" style="font-size: 150%;"
                                            :class="chapterColors[i % chapterColors.length].text">
                                            <i class="pi pi-bolt me-1"></i>{{ chapter.impactTitle }}
                                        </p>
                                        <label>{{ chapter.impactText
                                        }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- One Small Change -->
            <div class="card border-0 bg_main text-white mb-4 shadow-sm">
                <div class="card-body p-4 d-flex align-items-start gap-3">
                    <i class="pi pi-lightbulb mt-1" style="font-size: 1.5rem;"></i>
                    <div class="row">
                        <label class="fw-bold mb-1 small text-uppercase">One Small Change</label>
                        <label>{{ journey.oneSmallChange }}</label>
                    </div>
                </div>
            </div>

            <!-- Summary Panel -->
            <div class="card border-0 shadow-sm mb-4">
                <div class="card-body p-5 text-center">
                    <h5 class="fw-bold mb-2">{{ journey.summaryPanel.title }}</h5>
                    <p class="text-secondary mb-4 col-md-7 mx-auto">{{ journey.summaryPanel.text }}</p>
                    <div class="d-flex flex-wrap justify-content-center gap-3">
                        <button class="btn bg_main fw-semibold px-4" @click="goBack">
                            <i class="pi pi-search me-2"></i>{{ journey.summaryPanel.ctaPrimary }}
                        </button>
                        <button class="btn btn-outline-success fw-semibold px-4">
                            <i class="pi pi-leaf me-2"></i>{{ journey.summaryPanel.ctaSecondary }}
                        </button>
                    </div>
                </div>
            </div>

            <!-- Closing Statement -->
            <p class="text-center text-muted fst-italic mt-4">{{ journey.closingStatement }}</p>
        </div>
    </div>
</template>
