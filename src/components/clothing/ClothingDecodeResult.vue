<template>
  <div class="decode-result-layout animate-in">

    <!-- fibre composition card -->
    <div class="result-card">
      <div class="card-header">
        <span class="material-symbols-outlined header-icon">published_with_changes</span>
        <h3>Fibre Composition</h3>
      </div>

      <div class="composition-container">
        <div class="chart-wrapper">
          <div class="donut-chart" :style="donutStyle">
            <div class="donut-hole">
              <span class="donut-total" v-if="dominantMaterial">
                {{ dominantMaterial.percent }}%<br>
                <small>{{ dominantMaterial.name.split(' ')[0] }}</small>
              </span>
            </div>
          </div>
        </div>


        <div class="material-details">
          <div v-for="item in materials" :key="item.name" class="material-row">
            <div class="material-label">
              <span class="dot" :style="{ backgroundColor: item.color }"></span>
              <span class="name">{{ item.name }}</span>
            </div>
            <span class="percent"><strong>{{ item.percent }}%</strong></span>
          </div>
        </div>
      </div>

      <!-- dynamic badges from analysis -->
      <div class="chip-row mt-4">
        <template v-if="analysis?.badges?.length">
          <span
            v-for="badge in analysis.badges"
            :key="badge"
            class="badge badge-outline"
          >{{ badge.toUpperCase() }}</span>
        </template>
        <span v-if="formData?.made_in" class="badge badge-light">
          MADE IN {{ formData.made_in.toUpperCase() }}
        </span>
      </div>
    </div>

    <!-- Carbon + Water Stats -->
    <div class="stats-grid">
      <div class="result-card">
        <div class="card-header">
          <span class="material-symbols-outlined header-icon">air</span>
          <h3>Carbon</h3>
        </div>
        <div class="stat-content">
          <span class="stat-value">{{ analysis?.carbon_kg ?? '—' }} kg</span>
          <span class="stat-sub">CO2e footprint</span>
        </div>
      </div>

      <div class="result-card">
        <div class="card-header">
          <span class="material-symbols-outlined header-icon">opacity</span>
          <h3>Water</h3>
        </div>
        <div class="stat-content">
          <span class="stat-value">{{ analysis?.water_liters ?? '—' }} L</span>
          <span class="stat-sub">~ {{ showers }} showers</span>
        </div>
      </div>
    </div>

    <!-- lifespan & care -->
    <div class="result-card accent-left">
      <div class="card-header">
        <span class="material-symbols-outlined header-icon">favorite</span>
        <h3>Lifespan & Care</h3>
      </div>
      <p class="text-sm mt-2">
        Estimated life: <strong>{{ analysis?.estimated_lifespan ?? '—' }}</strong>
      </p>

      <div
        v-for="(warn, i) in analysis?.care_warnings ?? []"
        :key="i"
        class="warning-box mt-2"
      >
        <span class="material-symbols-outlined warn-icon">warning</span>
        <p>{{ warn }}</p>
      </div>
    </div>

    <!-- brand ethics -->
    <div class="result-card">
      <div class="card-header">
        <span class="material-symbols-outlined header-icon">search</span>
        <h3>Brand Ethics</h3>
      </div>

      <div class="brand-info-row mt-3">
        <div>
          <h4 class="brand-name">{{ brandIsUnknown ? 'Unknown Brand' : brandName }}</h4>
          <p class="text-xs text-muted">Good On You Rating</p>
        </div>
        <!-- if brand is known -->
        <span v-if="!brandIsUnknown" class="rating-badge">Check Rating</span>
      </div>

      <!-- if brand is unknown -->
      <div v-if="brandIsUnknown" class="unknown-brand-tip mt-3">
        <span class="material-symbols-outlined tip-icon">info</span>
        <p>
          Brand not detected — search on
          <a href="https://goodonyou.eco" target="_blank" rel="noopener noreferrer">Good On You</a>
          to check ethics rating.
        </p>
      </div>

      <div class="take-back-row mt-4">
        <span class="material-symbols-outlined text-sm">cycle</span>
        <span class="text-xs">AU Take-back Available</span>
        <a href="#" class="view-link ml-auto">View Scheme</a>
      </div>
    </div>

    <!-- end-of-life pathway -->
    <div class="pathway-hero mt-4">
      <div class="pathway-header">
        <span class="material-symbols-outlined">delete_outline</span>
        <span>End-of-Life Pathway</span>
      </div>
      <span class="recommend-pill">RECOMMENDED</span>
      <h3 class="mt-2">{{ analysis?.end_of_life_recommendation?.option ?? 'Recycling' }}</h3>
      <p class="text-xs opacity-80 mt-2">
        {{ analysis?.end_of_life_recommendation?.reason ?? '' }}
      </p>
      <button class="btn-pathway mt-4">
        Find nearest location <span class="material-symbols-outlined">arrow_forward</span>
      </button>
    </div>

    <!-- FAQ Section -->
    <div class="faq-section mt-5">
      <h3 class="section-title">Ask about this item</h3>
      <div class="faq-list">
        <div
          v-for="(faq, index) in analysis?.faqs ?? []"
          :key="index"
          class="faq-row"
          @click="toggleFaq(index)"
        >
          <span class="faq-question">{{ faq.question }}</span>
          <span class="material-symbols-outlined faq-arrow">chevron_right</span>
        </div>
      </div>
    </div>

    <!-- next step (link with epic 5 calculator) -->
    <div class="next-step-link mt-5">
      <p class="text-xs text-muted uppercase tracking-widest">Next Step</p>
      <a href="#" class="big-nav-link">
        Is it worth keeping?
        <span class="material-symbols-outlined">arrow_forward</span>
      </a>
    </div>

  </div>
</template>


<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  formData: Object,   // { brand, composition, made_in } from /api/extract
  analysis: Object    // full JSON from /api/decode
});

const activeFaq = ref(null);

const COLORS = ['#4F772D', '#90A955', '#ECF39E', '#C6C19A', '#A3B18A', '#588157'];

const materials = computed(() =>
  (props.analysis?.materials ?? []).map((m, i) => ({
    ...m,
    color: COLORS[i % COLORS.length]
  }))
);

const donutStyle = computed(() => {
  let cursor = 0;
  const stops = materials.value.map((m, i) => {
    const from = cursor;
    cursor += m.percent;
    return `${COLORS[i % COLORS.length]} ${from}% ${cursor}%`;
  });
  return { background: `conic-gradient(${stops.join(', ')})` };
});

const dominantMaterial = computed(() => {
  if (!materials.value.length) return null;
  return materials.value.reduce((a, b) => a.percent > b.percent ? a : b);
});

const brandName = computed(() => props.formData?.brand || null);
const brandIsUnknown = computed(() =>
  !brandName.value || brandName.value.toLowerCase() === 'unknown'
);

const showers = computed(() =>
  Math.round((props.analysis?.water_liters ?? 0) / 25.6)
);

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index;
};
</script>


<style scoped>
.decode-result-layout {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 60px;
}

.result-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #E5E5DF;
  text-align: left;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #3D4F41;
}

.card-header h3 {
  font-size: 0.9rem;
  font-weight: 700;
  margin: 0;
}

.header-icon { font-size: 1.2rem; }

.composition-container {
  display: flex;
  align-items: center;
  gap: 32px;
  margin-top: 20px;
}

.donut-chart {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.donut-hole {
  width: 70px;
  height: 70px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.donut-total {
  font-size: 0.8rem;
  font-weight: 800;
  line-height: 1;
}

.material-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.material-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
}

.material-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 1rem;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 800;
  margin-top: 12px;
}

.stat-sub {
  font-size: 0.75rem;
  color: #8C8C8C;
}

.warning-box {
  background: #FFFBEB;
  border-radius: 8px;
  padding: 10px 14px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.warning-box p {
  font-size: 0.8rem;
  margin: 0;
  color: #92400E;
}

.warn-icon {
  color: #B45309;
  font-size: 1.2rem;
}

.brand-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.rating-badge {
  background: #FEF3C7;
  color: #92400E;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
}

.unknown-brand-tip {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  background: #F0F4FF;
  border-radius: 8px;
  padding: 10px 14px;
}

.unknown-brand-tip p {
  font-size: 0.8rem;
  color: #3D4F41;
  margin: 0;
}

.unknown-brand-tip a {
  color: #009387;
  font-weight: 700;
}

.tip-icon {
  color: #3D5A99;
  font-size: 1.2rem;
}

.take-back-row {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid #F3F3F0;
}

.pathway-hero {
  background: #007a70;
  color: white;
  padding: 24px;
  border-radius: 16px;
  text-align: left;
}

.pathway-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.8rem;
  opacity: 0.6;
  margin-bottom: 12px;
}

.recommend-pill {
  font-size: 0.65rem;
  font-weight: 800;
  background: rgba(255, 255, 255, 0.2);
  padding: 2px 8px;
  border-radius: 4px;
}

.btn-pathway {
  width: 100%;
  background: white;
  color: #3D4F41;
  border: none;
  padding: 14px;
  border-radius: 12px;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
}

.section-title {
  font-size: 1rem;
  font-weight: 700;
  color: #1A1A1A;
  margin-bottom: 16px;
  text-align: left;
}

.faq-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid #E5E5DF;
}

.faq-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid #E5E5DF;
  cursor: pointer;
  transition: all 0.2s ease;
}

.faq-row:hover {
  background-color: rgba(0, 147, 135, 0.02);
  padding-left: 8px;
}

.faq-question {
  font-size: 0.9rem;
  color: #3D4F41;
  font-weight: 500;
}

.faq-arrow {
  color: #BDBDBD;
  font-size: 1.2rem;
}

.big-nav-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 1.1rem;
  font-weight: 700;
  color: #009387;
  text-decoration: none;
  margin-top: 4px;
}

.text-sm { font-size: 0.875rem; }
.text-xs { font-size: 0.75rem; }
.text-muted { color: #8C8C8C; }
.mt-2 { margin-top: 0.5rem; }
.mt-3 { margin-top: 0.75rem; }
.mt-4 { margin-top: 1.5rem; }
.mt-5 { margin-top: 2.5rem; }
.ml-auto { margin-left: auto; }

.badge {
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.7rem;
  font-weight: 800;
}

.badge-outline {
  border: 1px solid #E5E5DF;
  color: #8C8C8C;
}

.badge-light {
  background: #F3F3F0;
  color: #5C5C5C;
}

.animate-in {
  animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes fadeUp {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

@media (max-width: 480px) {
  .stats-grid { grid-template-columns: 1fr; }
  .composition-container {
    flex-direction: column;
    gap: 20px;
    align-items: flex-start;
  }
}
</style>