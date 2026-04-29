<template>
    <div class="container py-5">
        <div class="row g-4 justify-content-center">

            <!-- Awareness portal -->
            <MainFeaturePortal feature-name="Awareness" feature-description="Clothing Wastage Awareness."
                router-path="/food1" :image-src="foodMainOne" />

            <!-- Disposal portal -->
            <MainFeaturePortal feature-name="Before You Buy"
                feature-description="Before You Buy Clothing Decision Support." router-path="/food2"
                :image-src="foodMainTwo" />

            <!-- Estimation portal -->
            <MainFeaturePortal feature-name="Calculator"
                feature-description="Estimate Clothing Longevity and Break-Even Value" router-path="/food2"
                :image-src="foodMainTwo" />

        </div>
    </div>
</template>

<script setup>
import MainFeaturePortal from '@/components/MainFeaturePortal.vue';
import foodMainOne from '../assets/FoodMainOne.png';
import foodMainTwo from '../assets/FoodMainTwo.png';
</script>
