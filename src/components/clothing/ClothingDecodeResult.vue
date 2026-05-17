<template>
  <div class="decode-result-layout animate-in">

    <!-- Fibre Composition -->
    <div class="result-card">
      <div class="card-header">
        <span class="material-symbols-outlined header-icon">published_with_changes</span>
        <h3>Fibre Composition</h3>
      </div>
      <div class="composition-container">
        <div class="donut-chart" :style="donutStyle">
          <div class="donut-hole">
            <span class="donut-total" v-if="dominantMaterial">
              {{ dominantMaterial.percent }}%<br>
              <small>{{ dominantMaterial.name.split(' ')[0] }}</small>
            </span>
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
      <div class="chip-row">
        <span v-for="badge in analysis?.badges ?? []" :key="badge" class="badge badge-outline">{{ badge.toUpperCase() }}</span>
        <span v-if="formData?.made_in" class="badge badge-light">MADE IN {{ formData.made_in.toUpperCase() }}</span>
      </div>
    </div>

    <!-- Carbon + Water -->
    <div class="stats-grid">
      <div class="result-card">
        <div class="card-header"><span class="material-symbols-outlined header-icon">air</span><h3>Carbon</h3></div>
        <span class="stat-value">{{ analysis?.carbon_kg ?? '-' }} kg</span>
        <span class="stat-sub">CO2e footprint</span>
      </div>
      <div class="result-card">
        <div class="card-header"><span class="material-symbols-outlined header-icon">opacity</span><h3>Water</h3></div>
        <span class="stat-value">{{ analysis?.water_liters ?? '-' }} L</span>
        <span class="stat-sub">~ {{ showers }} showers</span>
      </div>
    </div>

    <!-- Lifespan & Care -->
    <div class="result-card accent-left">
      <div class="card-header">
        <span class="material-symbols-outlined header-icon">favorite</span>
        <h3>Lifespan & Care</h3>
      </div>
      <p class="lifespan-text">Estimated life: <strong>{{ analysis?.estimated_lifespan ?? '-' }}</strong></p>
      <div v-for="(warn, i) in analysis?.care_warnings ?? []" :key="i" class="warning-box">
        <span class="material-symbols-outlined warn-icon">warning</span>
        <p>{{ warn }}</p>
      </div>
    </div>

    <!-- Brand Ethics -->
    <div class="result-card">
      <div class="card-header brand-header">
        <div class="brand-header-left">
          <span class="material-symbols-outlined header-icon">search</span>
          <h3>Brand Ethics</h3>
        </div>

        <a
          href="https://goodonyou.eco"
          target="_blank"
          rel="noopener noreferrer"
          class="brand-header-link"
        >
          Good On You Rating
        </a>
      </div>
      <div class="brand-info-row">
        <div>
          <h4 class="brand-name">{{ brandIsUnknown ? 'Unknown Brand' : brandName }}</h4>
        </div>
        <span v-if="!brandIsUnknown" class="rating-badge">{{ analysis?.brand_rating ?? 'Check Rating' }}</span>
      </div>
      <div v-if="brandIsUnknown" class="unknown-brand-tip">
        <span class="material-symbols-outlined tip-icon">info</span>
        <p>Brand not detected or unknown? Search on <a href="https://goodonyou.eco" target="_blank" rel="noopener noreferrer">Good On You</a>.</p>
      </div>
      <div class="take-back-row">
        <span class="material-symbols-outlined take-back-icon">cycle</span>
        <span class="take-back-label">AU Take-back Available</span>
        <a href="#" class="view-link">View Scheme</a>
      </div>
    </div>

    <!-- End-of-Life Pathway -->
    <div class="pathway-hero">
      <div class="pathway-header">
        <span class="material-symbols-outlined">delete_outline</span>
        <span>End-of-Life Pathway</span>
      </div>
      <span class="recommend-pill">RECOMMENDED</span>
      <h3 class="pathway-title">{{ analysis?.end_of_life_recommendation?.option ?? 'Recycling' }}</h3>
      <p class="pathway-reason">{{ analysis?.end_of_life_recommendation?.reason ?? '' }}</p>
      <a
        class="btn-pathway"
        href="https://upparel.com.au/clothing-recycling/"
        target="_blank"
        rel="noopener noreferrer"
      >
        Find nearest location
        <span class="material-symbols-outlined">arrow_forward</span>
      </a>
    </div>

    <!-- FAQ -->
    <div class="faq-section">
      <h3 class="section-title">Ask about this item</h3>
      <div class="faq-list">
        <div v-for="(faq, index) in analysis?.faqs ?? []" :key="index" class="faq-row" @click="toggleFaq(index)">
          <span class="faq-question">{{ faq.question }}</span>
          <span class="material-symbols-outlined faq-arrow">chevron_right</span>
        </div>
      </div>
      <div v-if="activeFaq !== null && analysis?.faqs?.[activeFaq]" class="faq-answer">
        <span class="material-symbols-outlined faq-answer-icon">chat_bubble_outline</span>
        <p>{{ analysis.faqs[activeFaq].answer }}</p>
      </div>
    </div>

    <!-- Next Step -->
    <div class="next-step-link">
      <p class="next-step-label">NEXT STEP</p>
      <a href="#" class="big-nav-link">
        Is it worth keeping? <span class="material-symbols-outlined">arrow_forward</span>
      </a>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({ formData: Object, analysis: Object });
const activeFaq = ref(null);
const COLORS = ['#4F772D', '#90A955', '#ECF39E', '#C6C19A', '#A3B18A', '#588157'];

const materials = computed(() =>
  (props.analysis?.materials ?? []).map((m, i) => ({ ...m, color: COLORS[i % COLORS.length] }))
);

const donutStyle = computed(() => {
  let cursor = 0;
  const stops = materials.value.map((m, i) => {
    const from = cursor; cursor += m.percent;
    return `${COLORS[i % COLORS.length]} ${from}% ${cursor}%`;
  });
  return { background: `conic-gradient(${stops.join(', ')})` };
});

const dominantMaterial = computed(() =>
  materials.value.length ? materials.value.reduce((a, b) => a.percent > b.percent ? a : b) : null
);

const brandName = computed(() => props.formData?.brand || null);
const brandIsUnknown = computed(() => !brandName.value || brandName.value.toLowerCase() === 'unknown');
const showers = computed(() => Math.round((props.analysis?.water_liters ?? 0) / 25.6));
const toggleFaq = (i) => { activeFaq.value = activeFaq.value === i ? null : i; };
</script>

<style scoped>
.decode-result-layout {
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 60px;
  box-sizing: border-box;
}

.result-card {
  background: white;
  border-radius: 16px;
  padding: 20px;
  border: 1px solid #E5E5DF;
  text-align: left;
}

.card-header { display: flex; align-items: center; gap: 8px; color: #3D4F41; margin-bottom: 4px;}
.card-header h3 { font-size: 0.9rem; font-weight: 700; margin: 0; }
.header-icon { font-size: 1.2rem; }

.brand-header-left { display: flex; align-items: center; gap: 8px; }
.brand-header-link { margin-left: auto; font-size: 0.8rem; font-weight: 600; color: #009387; text-decoration: none;  }
.brand-header-link:hover { text-decoration: underline; }

/* Composition */
.composition-container { display: flex; align-items: center; gap: 32px; margin-top: 16px; }
.donut-chart { width: 100px; height: 100px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.donut-hole { width: 70px; height: 70px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-align: center; }
.donut-total { font-size: 0.8rem; font-weight: 800; line-height: 1; }
.material-details { flex: 1; display: flex; flex-direction: column; gap: 8px; }
.material-row { display: flex; justify-content: space-between; font-size: 0.85rem; }
.material-label { display: flex; align-items: center; gap: 8px; }
.dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.chip-row { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 16px; }
.badge { padding: 4px 10px; border-radius: 6px; font-size: 0.7rem; font-weight: 800; }
.badge-outline { border: 1px solid #E5E5DF; color: #8C8C8C; }
.badge-light { background: #F3F3F0; color: #5C5C5C; }

/* Stats */
.stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.stat-value { display: block; font-size: 1.5rem; font-weight: 800; margin-top: 12px; }
.stat-sub { display: block; font-size: 0.75rem; color: #8C8C8C; }

/* Lifespan */
/* .accent-left { border-left: 3px solid #90A955; } */
.lifespan-text { font-size: 0.875rem; color: #3D4F41; text-align: left !important; margin: 8px 0 8px; display: block; max-width: none; white-space: nowrap; }
.warning-box { background: #FFFBEB; border-radius: 8px; padding: 10px 14px; display: flex; gap: 10px; align-items: flex-start; margin-top: 8px; }
.warning-box p { font-size: 0.8rem; margin: 0; color: #92400E; text-align: left; flex: 1; max-width: none;}
.warn-icon { color: #B45309; font-size: 1.2rem; flex-shrink: 0; }

/* Brand */
.brand-info-row { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; margin-top: 12px; }
.brand-info-row > div { flex: 1; min-width: 0; }
.brand-name { font-size: 1.1rem; font-weight: 700; margin: 0 0 2px; text-align: left; }
.brand-info-row p { text-align: left; margin: 0; }
.rating-badge { background: #FEF3C7; color: #92400E; padding: 6px 16px; border-radius: 20px; font-size: 0.8rem; font-weight: 700; white-space: nowrap; flex-shrink: 0; }

.unknown-brand-tip { display: flex; gap: 10px; align-items: flex-start; background: #F0F4FF; border-radius: 8px; padding: 10px 14px; margin-top: 12px;}
.unknown-brand-tip p { font-size: 0.8rem; color: #3D4F41; margin: 0; text-align: left; flex: 1; min-width: 0;}
.unknown-brand-tip a { color: #009387; font-weight: 700; white-space: nowrap;}

.tip-icon { color: #3D5A99; font-size: 1.2rem; }
.take-back-row {display: flex;align-items: center;gap: 8px;padding: 10px 14px;margin-top: 12px;background: #EFF5EE; border-radius: 10px; border: none;}
.take-back-icon {color: #3D6666;font-size: 1.1rem;flex-shrink: 0;}
.take-back-label {font-size: 0.82rem;font-weight: 600;color: #3D4F41;flex: 1;}
.view-link {color: #009387;font-size: 0.8rem;font-weight: 600;text-decoration: underline;white-space: nowrap;text-decoration: none;}



/* .take-back-row { display: flex; align-items: center; gap: 8px; padding-top: 12px; margin-top: 12px; border-top: 1px solid #F3F3F0; }
.view-link { color: #009387; font-size: 0.8rem; font-weight: 600; text-decoration: underline; margin-left: auto; } */

/* Pathway */
.pathway-hero { background: #007f70; padding: 24px; border-radius: 16px; }
.pathway-header { display: flex; align-items: center; gap: 8px; font-size: 0.8rem; color: white !important; margin-bottom: 12px; }
.pathway-header span { color: white !important; }
.recommend-pill { display: inline-block; font-size: 0.65rem; font-weight: 800; background: rgba(255,255,255,0.2); color: white !important; padding: 4px 10px; border-radius: 4px; letter-spacing: 0.5px; }
.pathway-title { color: white !important; font-size: 1.4rem; font-weight: 700; text-align: left; margin: 8px 0 0; }
.pathway-reason { font-size: 0.82rem; color: white !important; text-align: left !important; margin: 8px 0 0; line-height: 1.5; max-width: none; width: 100%;}
.btn-pathway { width: 100%; background: white; color: #3D4F41; border: none; padding: 14px; border-radius: 12px; font-weight: 700; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; margin-top: 16px;text-decoration: none; }
.btn-pathway:hover { background: #f0f0f0; }

/* FAQ */
.faq-section { background: white; border-radius: 16px; padding: 20px; border: 1px solid #E5E5DF; }
.section-title { font-size: 1rem; font-weight: 700; color: #1A1A1A; margin-bottom: 16px; text-align: left; }
.faq-list { display: flex; flex-direction: column; border-top: 1px solid #E5E5DF; }
.faq-row { display: flex; justify-content: space-between; align-items: center; padding: 14px 0; border-bottom: 1px solid #E5E5DF; cursor: pointer; transition: padding-left 0.2s; }
.faq-row:hover { padding-left: 6px; }
.faq-question { font-size: 0.85rem; color: #3D4F41; font-weight: 500; flex: 1; padding-right: 12px; text-align: left; }
.faq-arrow { color: #BDBDBD; font-size: 1.2rem; flex-shrink: 0; }
.faq-answer { display: flex; gap: 10px; align-items: flex-start; background: #F8FAF8; border-radius: 10px; padding: 12px 14px; margin-top: 12px; }
.faq-answer p { font-size: 0.82rem; color: #3D4F41; margin: 0; text-align: left; flex: 1; line-height: 1.5; }
.faq-answer-icon { color: #009387; font-size: 1.1rem; flex-shrink: 0; }

/* Next Step */
.next-step-link { background: #009387; border-radius: 16px; padding: 20px 24px; text-align: center; }
.next-step-label { font-size: 0.7rem; color: white; letter-spacing: 0.08em; text-transform: uppercase; text-align: center; }
.big-nav-link { display: inline-flex; align-items: center; gap: 8px; font-size: 1.1rem; font-weight: 700; color: white; text-decoration: none; }

/* Utilities */
.text-xs { font-size: 0.75rem; }
.text-muted { color: #8C8C8C; }

/* Animation */
.animate-in { animation: fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

/* Responsive */
@media (max-width: 480px) {.stats-grid { grid-template-columns: 1fr 1fr; }.composition-container { flex-direction: column; gap: 20px; align-items: flex-start; }}
@media (max-width: 360px) { .stats-grid { grid-template-columns: 1fr; }}
</style>