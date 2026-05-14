<template>
    <div style="justify-content: center; align-items: center; text-align: center;">
        <RedUseHeader inter="Find your home's " grace="Waste Hotspot"></RedUseHeader>
        <p class="col-12 col-md-6">
            Our quick audit helps you discover where your household waste comes from -- and shows you simple ways to
            reduce it.
        </p>
        <div class="tabs col-12 col-md-6 offset-3">
            <div class="tab" :class="{ active: activeTab === 0 }" @click="activeTab = 0"><b>Audit Options</b>
            </div>
            <div class="tab" :class="{ active: activeTab === 1 }" @click="activeTab = 1"><b>How it works</b>
            </div>
        </div>
        <div class="row gap-5 d-flex justify-content-center">
            <MainFunctionButton feature-name="Kitchen" icon-name="pi pi-clipboard"></MainFunctionButton>
            <MainFunctionButton feature-name="Bathroom" icon-name="pi pi-clipboard"></MainFunctionButton>
            <MainFunctionButton feature-name="Laundary" icon-name="pi pi-clipboard"></MainFunctionButton>
        </div>
    </div>
</template>


<script setup>
import MainFunctionButton from '@/components/misc/MainFunctionButton.vue';
import RedUseHeader from '@/components/misc/RedUseHeader.vue';
import { ref } from 'vue';

const activeTab = ref(0);

</script>