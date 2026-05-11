<template>
  <div class="form-container">
    <div class="tabs">
      <div class="tab" :class="{ active: activeTab === 'photo' }" @click="activeTab = 'photo'"><b>Photo scan</b></div>
      <div class="tab" :class="{ active: activeTab === 'manual' }" @click="activeTab = 'manual'"><b>Manual entry</b>
      </div>
    </div>

    <div v-if="activeTab === 'photo'" :key="'photo'" class="animate-in">
      <div v-if="!previewUrl" class="capture-grid">
        <div class="capture-option" @click="$refs.cameraInput.click()">
          <span class="material-symbols-outlined icon-md">photo_camera</span>
          <span class="text-sm font-medium">Take photo</span>
        </div>
        <div class="capture-option" @click="$refs.fileInput.click()">
          <span class="material-symbols-outlined icon-md">image</span>
          <span class="text-sm font-medium">Upload image</span>
        </div>

        <input type="file" ref="cameraInput" accept="image/*" capture="environment" class="hidden"
          @change="handleFileUpload">
        <input type="file" ref="fileInput" accept="image/*" class="hidden" @change="handleFileUpload">
      </div>

      <div v-else>
        <img :src="previewUrl" alt="Label preview" class="mock-preview mt-4" />
        <button @click="proceedToConfirm" class="btn btn-primary mt-4 w-100">
          <span class="material-symbols-outlined icon-sm">wand_stars</span> Scan this label
        </button>
      </div>
    </div>

    <div v-if="activeTab === 'manual'" :key="'manual'" class="animate-in">
      <div class="input-group">
        <label>Brand name</label>
        <input type="text" v-model="localFormData.brand" placeholder="e.g., Zara">
      </div>

      <div class="input-group">
        <label>Fibre composition <span style="color: #D93B3B">*</span></label>
        <input type="text" v-model="localFormData.composition" placeholder="e.g., 50% Cotton, 50% Polyester"
          :style="errors.composition ? 'border-color: #D93B3B' : ''">
        <!-- Error Handling in progress -->
        <p v-if="errors.composition" style="color: #D93B3B; font-size: 0.75rem; margin-top: 4px; text-align: left;">
          Please enter the composition to proceed.
        </p>
      </div>
      <button @click="proceedToConfirm" class="btn btn-primary mt-4 w-100"><b>Next step</b></button>
    </div>


    <div class="expandable-tooltip mt-4 animate-in">
      <div class="tooltip-toggle" @click="tooltipOpen = !tooltipOpen">
        <span class="material-symbols-outlined icon-xs">shield_lock</span><b> Transparency & Privacy</b>
      </div>
      <div v-if="tooltipOpen" class="tooltip-content mt-2">
        <p class="mb-2"><strong>AI Usage:</strong> We use Gemini AI to extract fabric details from your labels.</p>
        <p><strong>Your Privacy:</strong> We don’t store your photos. Images are processed and then discarded.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';

const emit = defineEmits(['next']);
const activeTab = ref('photo');
const previewUrl = ref(null);
const tooltipOpen = ref(true);
const errors = reactive({ composition: false });

const localFormData = reactive({
  brand: '',
  composition: ''
});

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    previewUrl.value = URL.createObjectURL(file);
    localFormData.brand = "Detected Brand";
    localFormData.composition = "Detected 100% Cotton";
    errors.composition = false;
  }
};

const proceedToConfirm = () => {
  // Error handling (In progress)
  if (!localFormData.composition || localFormData.composition.trim() === "") {
    errors.composition = true;
    return;
  }
  errors.composition = false;
  emit('next', { ...localFormData });
};
</script>

<style scoped>
.form-container {
  max-width: 560px;
  margin: 0 auto;
  width: 100%;
}

.capture-option {
  background: white;
  border: 1px solid #E5E5DF;
  border-radius: 12px;
  padding: 24px 12px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.capture-option:hover {
  border-color: #01696F;
}

.icon-md {
  font-size: 32px;
  color: #01696F;
  margin-bottom: 8px;
}


.btn-primary.w-100 {
  width: 100%;
  display: flex;
  box-sizing: border-box;
}


.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #E5E5DF;
  border-radius: 0.4rem !important;
}

.tabs {
  display: flex;
  background: white;
  border: 1px solid #E5E5DF;
  border-radius: 8px;
  margin-bottom: 24px;
}

.tab {
  flex: 1;
  text-align: center;
  padding: 10px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  border-radius: 4px;
  color: #5C5C5C;
  transition: all 0.2s ease;
}

.tab.active {
  background: #009387;
  color: white;
}

.capture-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.input-group {
  margin-bottom: 16px;
  text-align: left;
}

.input-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 16px;
  border-radius: 8px;
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid transparent;
  gap: 8px;
}

.btn-primary {
  background-color: #009387;
  color: white;
}


.animate-in {
  animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.hidden {
  display: none;
}
</style>