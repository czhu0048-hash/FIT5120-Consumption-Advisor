<template>
  <div v-if="currentScreen === 1" class="text-center">
    <RedUseHeader paragraph="          Check any label to uncover the environmental cost and life of your clothes.
" inter="Decode" grace="your wardrobe"></RedUseHeader>
  </div>
  <div class="d-flex flex-column" style="min-height: 100vh;">
    <div class="container mt-5 flex-grow-1">


      <DecodeInput v-if="currentScreen === 1" @next="goToConfirm" />

      <DecodeConfirm v-if="currentScreen === 2" :formData="formData" @back="currentScreen = 1"
        @analyse="onAnalyseDone" />

      <!-- analysis prop to DecodeResult -->
      <DecodeResult v-if="currentScreen === 3" :formData="formData" :analysis="analysisResult"
        @back="currentScreen = 2" />

    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import DecodeInput from '@/components/clothing/ClothingDecodeInput.vue';
import DecodeConfirm from '@/components/clothing/ClothingDecodeConfirm.vue';
import DecodeResult from '@/components/clothing/ClothingDecodeResult.vue';
import RedUseHeader from '@/components/misc/RedUseHeader.vue';

const currentScreen = ref(1);

// no hardcoded defaults
const formData = reactive({
  brand: '',
  composition: '',
  made_in: ''
});

// separate ref for the AI analysis JSON
const analysisResult = ref(null);

// when DecodeInput emits 'next' (after ai extract or manual entry)
const goToConfirm = (data) => {
  if (data) {
    formData.brand = data.brand || '';
    formData.composition = data.composition || '';
    formData.made_in = data.made_in || data.madeIn || '';
  }
  currentScreen.value = 2;
};

// called when DecodeConfirm emits 'analyse' with { formData, analysis }
const onAnalyseDone = ({ formData: confirmedData, analysis }) => {
  formData.brand = confirmedData.brand || '';
  formData.composition = confirmedData.composition || '';
  formData.made_in = confirmedData.made_in || '';

  analysisResult.value = analysis;

  currentScreen.value = 3;
};
</script>

<style scoped>
.font-inter {
  font-family: 'Inter', sans-serif;
  overflow-x: hidden;
  color: black;
}

.font-grace {
  font-family: 'Covered By Your Grace';
  color: #009387;
  font-size: clamp(24px, 5vw, 60px);
  margin-bottom: 20px;
  word-spacing: -7px;
}
</style>