<template>
  <div class="d-flex flex-column" style="min-height: 100vh;">
    <div class="container mt-5 flex-grow-1">
      
      <div v-if="currentScreen === 1" class="text-center mb-4">
        <h1 class="display-5 fw-normal">
          <span class="font-inter"><b>Decode</b></span>
          <span class="font-grace"> your wardrobe</span>
        </h1>
        <p class="text-secondary fs-8">Check any label to uncover the environmental cost and life of your clothes.</p>
      </div>

      <DecodeInput 
        v-if="currentScreen === 1" 
        @next="goToConfirm" 
      />

      <DecodeConfirm 
        v-if="currentScreen === 2" 
        :formData="formData" 
        @back="currentScreen = 1" 
        @analyse="currentScreen = 3" 
      />

      <DecodeResult 
        v-if="currentScreen === 3" 
        :formData="formData" 
        @back="currentScreen = 2"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import DecodeInput from '@/components/clothing/ClothingDecodeInput.vue';
//import DecodeConfirm from '@/components/ClothingDecodeConfirm.vue';
//import DecodeResult from '@/components/ClothingDecodeResult.vue';

const currentScreen = ref(1);
const formData = reactive({
  brand: 'Zara',
  composition: 'Polyester 65%, Cotton 35%'
});

const goToConfirm = (data) => {
  if (data) {
    formData.brand = data.brand;
    formData.composition = data.composition;
  }
  currentScreen.value = 2;
};

const restart = () => {
  currentScreen.value = 1;
};
</script>

<style scoped>

.font-inter {
	font-family: 'Inter', sans-serif;
	overflow-x: hidden;
  color: black
}


.font-grace {
	font-family: 'Covered By Your Grace';
	color: #009387;
	font-size: clamp(24px, 5vw, 60px);
	margin-bottom: 20px;
  word-spacing: -7px;
}

</style>