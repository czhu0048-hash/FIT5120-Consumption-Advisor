<template>
  <div class="form-container animate-in">
    <h1 class="font-display">Confirm details</h1>
    <p class="text-muted text-sm mb-6">We've extracted this from your label.</p>

    <div class="card shadow-sm border-0 mb-4 p-4">
      <div class="d-flex justify-content-between align-items-center mb-3">
        <h3 class="section-title">Composition</h3>
        <button class="edit-icon-btn" @click="toggleEdit('composition')">
          <span class="material-symbols-outlined">
            {{ isEditing.composition ? 'check' : 'edit' }}
          </span>
        </button>
      </div>

      <div v-if="!isEditing.composition" class="chip-container mb-4">
        <div v-for="(item, index) in parsedCompositions" :key="index" class="composition-pill">
          {{ item }}
        </div>
      </div>

      <div v-else class="mb-4">
        <input type="text" v-model="localData.composition" class="form-control edit-input"
          @keyup.enter="toggleEdit('composition')">
        <small class="text-muted mt-1 d-block">Separate with a comma (,)</small>
      </div>

      <hr class="divider">

      <div class="details-list">
        <div class="details-header mb-3">Details</div>

        <div class="detail-row">
          <span class="detail-label">Brand</span>
          <div class="detail-value-group">
            <input v-if="isEditing.brand" type="text" v-model="localData.brand"
              class="form-control form-control-sm edit-input-small" @keyup.enter="toggleEdit('brand')">
            <span v-else class="detail-value fw-bold">{{ localData.brand }}</span>
            <button class="edit-icon-tiny" @click="toggleEdit('brand')">
              <span class="material-symbols-outlined">
                {{ isEditing.brand ? 'check' : 'edit' }}
              </span>
            </button>
          </div>
        </div>

        <div class="detail-row">
          <span class="detail-label">Made in</span>
          <div class="detail-value-group">
            <input v-if="isEditing.madeIn" type="text" v-model="localData.madeIn"
              class="form-control form-control-sm edit-input-small" @keyup.enter="toggleEdit('madeIn')">
            <span v-else class="detail-value fw-bold">{{ localData.madeIn || 'Unknown' }}</span>
            <button class="edit-icon-tiny" @click="toggleEdit('madeIn')">
              <span class="material-symbols-outlined">
                {{ isEditing.madeIn ? 'check' : 'edit' }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="d-grid gap-3">
      <button @click="startAnalysis" class="btn btn-primary-dark py-3">
        Analyse this garment
        <span class="material-symbols-outlined icon-sm ms-2">arrow_right_alt</span>
      </button>
      <button @click="$emit('back')" class="btn btn-outline-light-custom py-3">
        Back to scan
      </button>
    </div>
  </div>
</template>






<script setup>
import { reactive, onMounted, computed, ref } from 'vue';
import axios from 'axios';

const props = defineProps(['formData']);
const emit = defineEmits(['back', 'analyse']);

const isAnalyzing = ref(false);

const localData = reactive({
  brand: '',
  composition: '',
  madeIn: ''
});

const isEditing = reactive({
  brand: false,
  composition: false,
  madeIn: false
});

onMounted(() => {
  localData.brand = props.formData?.brand || '';
  // Normalise on load: edit format always <Material> <xx%>
  localData.composition = normaliseComposition(props.formData?.composition || '');
  localData.madeIn = props.formData?.made_in || props.formData?.madeIn || '';
});


// handling of received format
const parsedCompositions = computed(() => {
  if (!localData.composition) return [];

  const raw = localData.composition.trim();

  // separated by commas
  if (raw.includes(',')) {
    return raw.split(',').map(item => {
      const str = item.trim();
      // Reorder "90% Cotton" → "Cotton 90%" if percent comes first
      const match = str.match(/^(\d+%)\s+(.+)/);
      return match ? `${match[2]} ${match[1]}` : str;
    }).filter(Boolean);
  }

  // separated by non-comma (pattern boundaries)
  const matches = raw.matchAll(/([A-Za-z][A-Za-z\s()-]*?)\s*(\d+)\s*%|(\d+)\s*%\s*([A-Za-z][A-Za-z\s()-]*)/g);
  const results = [];
  for (const m of matches) {
    if (m[1] && m[2]) {
      results.push(`${m[1].trim()} ${m[2]}%`);
    } else if (m[3] && m[4]) {
      results.push(`${m[4].trim()} ${m[3]}%`);
    }
  }

  // fallback - whole string as one pill
  return results.length > 0 ? results : [raw];
});

const toggleEdit = (field) => {
  isEditing[field] = !isEditing[field];
};

const startAnalysis = async () => {
  isAnalyzing.value = true;
  try {
    // const response = await axios.post('http://127.0.0.1:8000/api/decode', { //for local testing
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/decode`, {  //for prod
      composition: localData.composition,
      location: localData.madeIn,
      brand: localData.brand
    });

    emit('analyse', {
      formData: {
        brand: localData.brand || null,
        composition: localData.composition,
        made_in: localData.madeIn || null
      },
      analysis: response.data
    });

  } catch (err) {
    console.error('Analysis error:', err);
    alert("Analysis failed. Please check your connection.");
  } finally {
    isAnalyzing.value = false;
  }
};


const normaliseComposition = (raw) => {
  if (!raw) return '';

  // title-case and reorder if comma-separated
  if (raw.includes(',')) {
    return raw.split(',').map(part => {
      const str = part.trim();
      // <%> <Material> -> <Material> <%>
      const match = str.match(/^(\d+)\s*%\s*(.+)/);
      if (match) return `${toTitleCase(match[2])} ${match[1]}%`;
      // <Material> <%>
      const match2 = str.match(/^(.+?)\s+(\d+)\s*%$/);
      if (match2) return `${toTitleCase(match2[1])} ${match2[2]}%`;
      return toTitleCase(str);
    }).join(', ');
  }

  // if no commas
  const pairs = [];
  const regex = /(\d+)\s*%\s*([A-Za-z][A-Za-z\s\-()]*?)(?=\d|$)|([A-Za-z][A-Za-z\s\-()]*?)\s+(\d+)\s*%/g;
  let match;
  while ((match = regex.exec(raw)) !== null) {
    if (match[1] && match[2]) {
      pairs.push(`${toTitleCase(match[2].trim())} ${match[1]}%`);
    } else if (match[3] && match[4]) {
      pairs.push(`${toTitleCase(match[3].trim())} ${match[4]}%`);
    }
  }
  return pairs.length > 0 ? pairs.join(', ') : raw;
};

const toTitleCase = (str) =>
  str.toLowerCase().replace(/\b\w/g, c => c.toUpperCase());

</script>

<style scoped>
.form-container {
  max-width: 560px;
  margin: 0 auto;
  width: 100%;
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0;
}

.card {
  background: #ffffff;
  border-radius: 16px;
}

.chip-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.composition-pill {
  display: inline-block;
  background: #F8F9FA;
  border: 1px solid #E9ECEF;
  padding: 6px 14px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  color: #333;
}

.divider {
  border-top: 1px solid #F0F0F0;
  margin: 1.25rem 0;
}

.details-header {
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.detail-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  font-size: 0.9rem;
}

.detail-label {
  color: #666;
}

.detail-value-group {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  margin-left: 20px;
}

.detail-value {
  color: #1A1A1A;
  text-align: right;
}

/* edit controls */
.edit-icon-btn,
.edit-icon-tiny {
  background: none;
  border: none;
  color: #009387;
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 4px;
}

.edit-icon-tiny span {
  font-size: 20px;
  margin-left: 8px;
}

.edit-input {
  border-radius: 8px;
  border: 1px solid #009387;
  font-size: 0.9rem;
  width: 100%;
}

.edit-input-small {
  border-radius: 6px;
  border: 1px solid #009387;
  font-size: 0.85rem;
  max-width: 150px;
  text-align: right;
}

/* action buttons */
.btn-primary-dark {
  background-color: #3D6666;
  color: white;
  border: none;
  border-radius: 12px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-outline-light-custom {
  background-color: #FBFBF9;
  border: 1px solid #E5E5DF;
  color: #333;
  border-radius: 12px;
  font-weight: 500;
}

.material-symbols-outlined {
  vertical-align: middle;
}

.animate-in {
  animation: fadeUp 0.5s ease-out;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>