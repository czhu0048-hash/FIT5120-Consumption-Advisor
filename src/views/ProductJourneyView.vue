<script setup>
/**
 * Hardcorded example items.
 */
import MainFunctionButton from '@/components/misc/MainFunctionButton.vue';
import RedUseHeader from '@/components/misc/RedUseHeader.vue';
import StepsIndicator from '@/components/misc/StepsIndicator.vue';
import { ref } from 'vue';

const popularItems = [
    { name: 'Plastic Bottle', icon: 'pi pi-star' },
    { name: 'T-shirt', icon: 'pi pi-star' },
    { name: 'Laptop', icon: 'pi pi-desktop' },
    { name: 'Chair', icon: 'pi pi-home' },
    { name: 'Shopping Bag', icon: 'pi pi-shopping-bag' },
]

const steps = [
    { icon: 'pi pi-search', label: 'Search for an item', description: 'Type any household product to get started.' },
    { icon: 'pi pi-map', label: 'We reveal its full journey', description: 'From raw materials to disposal, laid out clearly.' },
    { icon: 'pi pi-heart', label: 'Make mindful choices', description: 'Use what you learn to reduce your footprint.' },
]

const searchedItem = ref("")
const search = () => {

}
</script>

<template>
    <RedUseHeader class="mt-5" inter="Uncover the hidden journey of " grace="any item " inter-two="you use">
    </RedUseHeader>
    <p class="mb-5">Every item has a journey -- from where it begins,
        how it reaches you, to where it ends up.
        Search any household item to see its full story.
    </p>

    <!-- Search for an item -->
    <div class="card p-4 mb-4">
        <h5 class="fw-bold mb-3">Search for an item</h5>
        <div class="col-12 row g-3 gap-5 justify-content-center">
            <div class="col-3">
                <input class="form-control" type="text" placeholder="e.g. chair, desk fan" v-model="searchedItem"
                    @keyup.enter="search">
            </div>
            <button class="btn btn-success fw-bold col-auto" @click="search" :disabled="searching">
                <i class="pi pi-search me-2"></i>Search
            </button>
        </div>
    </div>

    <!-- Popular items to explore -->
    <div class="card p-4 mb-4">
        <h5 class="fw-bold mb-3">Popular items to explore</h5>
        <div class="row g-3 gap-5">
            <MainFunctionButton v-for="item in popularItems" :key="item.name" :feature-name="item.name"
                :icon-name="item.icon" col-class="col-12 col-md-2" />
        </div>
    </div>

    <!-- How it works -->
    <div class="card p-4">
        <h5 class="fw-bold mb-4">How it works</h5>
        <div class="row text-center g-4">
            <div v-for="(step, i) in steps" :key="i" class="col-12 col-md-4">
                <StepsIndicator :index="i" :step="step"></StepsIndicator>
            </div>
        </div>
    </div>
</template>