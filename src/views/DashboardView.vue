<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const toFoodDashboard = () => {
    router.push("/food")
}

const BASE_URL = import.meta.env.DEV
    ? ''
    : 'https://reduse-api-ddfkdgengccka5fz.australiaeast-01.azurewebsites.net'

async function testFoodDisposalApi() {
    try {
        const res = await fetch(`${BASE_URL}/api/food-disposal/`)
        const data = await res.json()
        console.log('[API Test] GET /api/food-disposal/', data)
    } catch (e) {
        console.error('[API Test] food-disposal error:', e)
    }
}

onMounted(testFoodDisposalApi)
</script>

<template>
    <div class="basic" style="text-align: center;">
        <h1>Manage your everyday consumption: Why It Matters</h1>
    </div>
    <div class="row">
        <div class="d-flex flex-column align-items-center">
            <!-- SDG Why It Matters cards -->
            <div class="row justify-content-center gap-3 mt-5 px-3">
                <div class="card sdg-card col-12 col-sm-5 col-md-3 p-3 text-center">
                    <div class="mb-2">
                        <i class="pi pi-globe" style="font-size: 2.5rem; color: darkgreen;"></i>
                    </div>
                    <h6 class="fw-bold font_sub">Our Planet Is Under Pressure</h6>
                    <p class="small text-muted mb-0">
                        Current consumption patterns are depleting natural resources faster than Earth can replenish
                        them. Shifting to responsible habits helps protect ecosystems for future generations.
                    </p>
                </div>
                <div class="card sdg-card col-12 col-sm-5 col-md-3 p-3 text-center">
                    <div class="mb-2">
                        <i class="pi pi-trash" style="font-size: 2.5rem; color: darkgreen;"></i>
                    </div>
                    <h6 class="fw-bold font_sub">Food Waste Has a Real Cost</h6>
                    <p class="small text-muted mb-0">
                        Around one-third of all food produced globally is wasted. Reducing waste saves money,
                        cuts greenhouse gas emissions, and ensures food reaches those who need it most.
                    </p>
                </div>
                <div class="card sdg-card col-12 col-sm-5 col-md-3 p-3 text-center">
                    <div class="mb-2">
                        <i class="pi pi-heart" style="font-size: 2.5rem; color: darkgreen;"></i>
                    </div>
                    <h6 class="fw-bold font_sub">Healthy Choices, Healthier Lives</h6>
                    <p class="small text-muted mb-0">
                        Mindful consumption leads to better nutrition and well-being. Small everyday decisions —
                        what you eat, how you dispose of waste — add up to meaningful change.
                    </p>
                </div>
            </div>

            <div class="mt-5"></div>
            <label style="font-size: 150%;">Get Your Consumption Advices For</label>
            <div class="flex-row justify-content-center">
                <button class="button_main" @click="toFoodDashboard">Food -></button>
                <button class="button_main">Household -></button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.sdg-card {
    border: 1.5px solid darkgreen;
    border-radius: 1rem;
    background-color: #f9fff9;
}
</style>