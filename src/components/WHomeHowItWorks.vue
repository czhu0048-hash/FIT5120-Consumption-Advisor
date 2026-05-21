<template>
  <!-- <div class="hiw-steps"> -->
  <div class="row text-center g-4 mt-5 mb-5">
    <div class="col-12 col-md-4" v-for="(step, i) in steps" :key="i">
      <!-- <div class="step"> -->
      <StepsIndicator :step="step" :index="i" />
    </div>
  </div>
</template>

<script setup>
import StepsIndicator from './misc/StepsIndicator.vue'

const steps = [
  { label: 'Explore', description: 'Search items, scan products, or audit your home to gather data.' },
  { label: 'Understand', description: 'We analyse the full picture — cost, impact, usage and waste patterns.' },
  { label: 'Improve', description: 'Get smart recommendations and take action toward a better everyday.' },
]
</script>

<style scoped>
.hiw-section {
  width: 100%;
  background: #f4fdf9;
  box-sizing: border-box;
}

.hiw-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(40px, 5vw, 64px) 5% clamp(40px, 5vw, 64px);
}

.hiw-title {
  font-size: clamp(1.25rem, 2vw, 1.6rem);
  font-weight: 800;
  color: #111;
  margin: 0 0 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2.5px solid #009387;
  display: inline-block;
}

.hiw-title-accent {
  font-family: 'Covered By Your Grace', cursive;
  color: #009387;
  font-size: 1.05em;
  font-weight: 400;
}

.hiw-steps {
  display: flex;
  align-items: center;
  gap: 0;
  margin-top: clamp(28px, 3.5vw, 44px);
  flex-wrap: nowrap;
}

.step {
  flex: 1;
  gap: 1rem;
  min-width: 0;
}

.step-body {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.step-num {
  font-size: 0.9rem;
  font-weight: 700;
  color: #009387;
}

.step-title {
  font-size: 1rem;
  font-weight: 700;
  color: #111;
}

.step-desc {
  font-size: 0.82rem;
  color: #6b7280;
  line-height: 1.55;
  margin: 0;
}

.step-arrow {
  flex-shrink: 0;
  width: 60px;
  margin: 0 0.5rem;
  margin-bottom: 2rem;
}

.step-arrow svg {
  width: 100%;
}

@media (max-width: 900px) {
  .hiw-steps {
    flex-wrap: wrap;
    gap: 1.5rem;
  }

  .step-arrow {
    display: none;
  }

  .step {
    flex: 1 1 200px;
  }
}

@media (max-width: 600px) {
  .step {
    flex: 1 1 100%;
  }
}
</style>
