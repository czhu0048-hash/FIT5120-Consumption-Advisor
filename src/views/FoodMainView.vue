<template>
    <div class="container py-5">
        <div class="row g-4 justify-content-center">

            <!-- Recipe portal -->
            <MainFeaturePortal feature-name="Kitchen-raid Recipes"
                feature-description="Turn what's already in your home into a proper meal. Search by ingredients you have on hand."
                router-path="/food1" :image-src="foodMainOne" />

            <!-- Disposal portal -->
            <MainFeaturePortal feature-name="Food Disposal"
                feature-description="Not sure what bin it goes in? Find the right disposal method for every type of food waste."
                router-path="/food2" :image-src="foodMainTwo" />

        </div>
    </div>
</template>

<script setup>
import MainFeaturePortal from '@/components/MainFeaturePortal.vue';
import foodMainOne from '../assets/FoodMainOne.png';
import foodMainTwo from '../assets/FoodMainTwo.png';
</script>
