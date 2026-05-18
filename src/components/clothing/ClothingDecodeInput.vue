<template>
  <div class="form-container">
    <div class="tabs">
      <div class="tab" :class="{ active: activeTab === 'photo' }" @click="activeTab = 'photo'">
        <b>Photo scan</b>
      </div>
      <div class="tab" :class="{ active: activeTab === 'manual' }" @click="activeTab = 'manual'">
        <b>Manual entry</b>
      </div>
    </div>

    <div v-if="activeTab === 'photo'" :key="'photo'" class="animate-in">
      <div v-if="!previewUrl" class="capture-grid">
        <div class="capture-option" @click="$refs.fileInput.click()">
          <span class="material-symbols-outlined icon-md">image</span>
          <span class="text-sm font-medium">Upload image</span>
        </div>

        <div class="capture-option" @click="$refs.cameraInput.click()">
          <span class="material-symbols-outlined icon-md">mobile_camera</span>
          <span class="text-sm font-medium">Take photo (Mobile)</span>
        </div>

        <input type="file" ref="cameraInput" accept="image/jpeg, image/png, image/webp" capture="environment" class="hidden" @change="handleFileUpload">
        
        <input type="file" ref="fileInput" accept="image/jpeg, image/png, image/webp" class="hidden" @change="handleFileUpload">
      </div>

      <div v-else>
        <img :src="previewUrl" alt="Label preview" class="mock-preview mt-4" />
        <button @click="proceedToConfirm" class="btn btn-primary mt-4 w-100">
          <span class="material-symbols-outlined icon-sm icon-white">document_scanner</span>
          Scan this label
        </button>
        <button @click="previewUrl = null" class="btn btn-link w-100 mt-2 text-secondary text-sm">Retake photo</button>
      </div>
    </div>

    <div v-if="activeTab === 'manual'" :key="'manual'" class="animate-in">
      <div class="input-group">
        <label>Fibre composition <span style="color: #D93B3B">*</span></label>
        <input 
          type="text" 
          v-model="localFormData.composition" 
          placeholder="e.g., Polyester 65%, Cotton 35%"
          :class="{ 'border-danger': errors.composition }"
        >
        <small class="text-muted mt-1 d-block">Separate different materials with a comma (,)</small>
        <p v-if="errors.composition" class="error-text">Please enter the composition to proceed.</p>
      </div>

      <div class="input-group">
        <label>Brand name</label>
        <input type="text" v-model="localFormData.brand" placeholder="e.g. Zara">
      </div>

      <div class="input-group">
        <label>Made in</label>
        <input type="text" v-model="localFormData.madeIn" placeholder="e.g., China">
      </div>

      <button @click="proceedToConfirm" class="btn btn-primary mt-4 w-100"><b>Next step</b></button>
    </div>

    <div class="section-separator mt-5 animate-in">
      <div class="tip-toggle">
        <span class="material-symbols-outlined icon-xs">shield_lock</span><b> Transparency & Privacy</b>
      </div>
      <div class="tip-content mt-2">
        <p class="mb-2"><strong>AI Usage:</strong> We use Gemini AI to extract fabric details from your labels.</p>
        <p><strong>Your Privacy:</strong> We do not store your photos. Images are processed and then discarded.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2'; //error handling

const emit = defineEmits(['next']);
const activeTab = ref('photo');
const previewUrl = ref(null);
const isScanning = ref(false); // loading state
const errors = reactive({ composition: false });

const localFormData = reactive({
  brand: '',
  composition: '',
  madeIn: ''
});

const handleFileUpload = async (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    Swal.fire({ title: 'Invalid File', text: 'Please upload an image file (JPG, PNG, or WebP)', icon: 'error', confirmButtonColor: '#009387' });
    event.target.value = "";
    return;
  }

  previewUrl.value = URL.createObjectURL(file);
  pendingFile.value = file; // store file reference, not calling AI API
};

const pendingFile = ref(null);

const proceedToConfirm = () => {
  if (!localFormData.composition && !pendingFile.value) {
    errors.composition = true;
    return;
  }
  errors.composition = false;

  if (pendingFile.value) {
    // photo path - emit file to parent, parent handles extract API and loading page
    emit('next', { file: pendingFile.value, skipExtract: false });
  } else {
    // manual path - skip loading
    emit('next', {
      skipExtract: true,
      brand: localFormData.brand,
      composition: localFormData.composition,
      made_in: localFormData.madeIn
    });
  }
};


</script>

<style scoped>
.form-container {
  max-width: 560px; 
  margin: 0 auto;
  width: 100%;
}

.capture-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
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
  border-color: #009387;
  background-color: #f0f9f8;
}

.icon-md {
  font-size: 32px;
  color: #009387;
  margin-bottom: 8px;
}

.input-group {
  margin-bottom: 20px;
  text-align: left;
}

.input-group label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.input-group input {
  width: 100%;
  padding: 12px;
  border: 1px solid #E5E5DF;
  border-radius: 8px !important;
  box-sizing: border-box;
}

.border-danger {
  border-color: #D93B3B !important;
}

.error-text {
  color: #D93B3B;
  font-size: 0.75rem;
  margin-top: 4px;
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
  padding: 12px;
  font-size: 0.875rem;
  font-weight: 500;
  cursor: pointer;
  color: #5C5C5C;
}

.tab.active {
  background: #009387;
  color: white;
  border-radius: 4px;
}


.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 16px;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-primary {
  background-color: #009387;
  color: white;
  border: none;
  gap: 10px;
}

.btn-primary:hover { background-color: #007a70; }
.btn-primary:active { background-color: #00665e !important; }

.w-100 { width: 100%; }

.icon-white {
  color: white !important;
}


.mock-preview {
  width: 100%;
  height: 280px;
  border-radius: 12px;
  object-fit: cover;
}

.section-separator {
  border-top: 1px solid #E5E5DF;
  padding-top: 16px;
}


/* transparency & privacy */
.tip-toggle {
  display: flex;
  gap: 3px;
  font-size: 0.85rem;
  color: black;
  align-items: center;
  /*cursor: pointer;*/
}

.tip-content {
  background: #fff;
  border-radius: 8px;
  box-sizing: border-box;
  border: 1px solid #E5E5DF;
  font-size: 0.8rem;
  padding: 12px 16px;
  text-align: left;
  width: 100%;
}

.tip-content p  {
  text-align: left;
  width: 100%;
  max-width: 100%;
  margin: 0;
  display: block;
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

.hidden { display: none; }
</style>