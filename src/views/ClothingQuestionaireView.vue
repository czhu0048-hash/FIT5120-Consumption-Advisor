<script setup>
import { ref, computed, watch } from 'vue';
import { useRouter } from 'vue-router';
import { getQuestionIndex } from '@/utils/questionaireController';
import ClothingQuestionaireCard from '@/components/clothing/ClothingQuestionaireCard.vue';
import CQLandingHero from '@/components/CQLandingHero.vue';
import CQLandingCards from '@/components/CQLandingCards.vue';
import CQStatsStrip from '@/components/CQStatsStrip.vue';

const router = useRouter();
const quizStarted = ref(false);

const openCalculator = () => router.push('/clothing/analyzer');
const startQuiz     = () => { quizStarted.value = true; };

const showQuestionnaire = computed(() => quizStarted.value || getQuestionIndex.value !== -1);

// When quiz resets to -1 (back button on Q1), return to landing
watch(getQuestionIndex, (val) => { if (val === -1) quizStarted.value = false; });
</script>

<template>
  <!-- Quiz flow -->
  <div v-if="showQuestionnaire" class="cq-quiz-wrap">
    <ClothingQuestionaireCard
      title="About to tap &quot;buy&quot;?"
      description="Six quick questions, no judgement, no pressure — just a pause"
      confirmLabel="Let's do it →"
      skipLabel="Already decided? Make it last"
      :skipIntro="true"
      @openCalculator="openCalculator"
    />
  </div>

  <!-- Landing page -->
  <div v-else class="cq-wrap">
    <CQLandingHero />
    <CQLandingCards @startQuiz="startQuiz" @openCalculator="openCalculator" />
    <div class="cq-leaf-deco" aria-hidden="true">
      <svg viewBox="0 0 200 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M180 10 C180 10 20 60 10 200 C0 340 120 290 140 200 C160 110 180 10 180 10Z" fill="#007a6f" opacity="0.85"/>
        <path d="M180 10 C180 10 100 80 95 200" stroke="#009387" stroke-width="2" fill="none" opacity="0.4"/>
      </svg>
    </div>
    <CQStatsStrip />
  </div>
</template>

<style scoped>
.cq-wrap {
  min-height: 100vh;
  background: #edfafa;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  color: #1a1a1a;
  padding: 2.5rem 2.5rem 0;
  position: relative;
  overflow: hidden;
}

.cq-quiz-wrap { padding: 2rem; }

.cq-leaf-deco {
  position: fixed;
  bottom: -20px;
  right: -20px;
  width: 160px;
  height: 240px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.9;
}

@media (prefers-reduced-motion: no-preference) {
  @keyframes cq-rise {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .cq-wrap > * { animation: cq-rise 0.6s cubic-bezier(0.16,1,0.3,1) both; }
  .cq-wrap > *:nth-child(1) { animation-delay: 0.05s; }
  .cq-wrap > *:nth-child(2) { animation-delay: 0.2s; }
  .cq-wrap > *:nth-child(3) { animation-delay: 0.35s; }
}

@media (max-width: 900px) {
  .cq-wrap { padding: 1.75rem 1.25rem 0; }
  .cq-leaf-deco { width: 100px; height: 150px; }
}
</style>
