<template>
    <div style="font-size: 150%; text-align: center; justify-content: center; margin-bottom: 5%;">
        <label>What type of food
            waste do you want to
            dispose of?</label>
    </div>
    <div class="container col-12 col-md-6 offset-md-3">
        <select class="form-select" id="wastetype">
            <option value="dry">Dry</option>
            <option value="wet">Wet</option>
        </select>
    </div>
    <div class="row mt-5" v-if="currentDisposalMethods.length">
        <div class="d-flex flex-wrap justify-content-start">
            <div v-for="(value, index) in currentDisposalMethods" :key="index" class="card m-2" style="width: 18rem;">
                <FoodDisposalCard></FoodDisposalCard>
            </div>
        </div>
    </div>
</template>

<script setup>
import FoodDisposalCard from '@/components/FoodDisposalCard.vue';
import { onMounted, ref } from 'vue';

const currentDisposalMethods = ref([]);

onMounted(() => {
    for (let i = 0; i < 6; i++) {
        currentDisposalMethods.value.push("");
    }
});
</script>