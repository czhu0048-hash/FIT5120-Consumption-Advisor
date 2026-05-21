<script setup>
import { provide } from 'vue'
import { useRouter } from 'vue-router'
import { useLifetimeValueAnalyzer } from '@/composables/useLifetimeValueAnalyzer'
import LVAInputPanel from '@/components/LVAInputPanel.vue'
import LVAResultsPanel from '@/components/LVAResultsPanel.vue'

const router = useRouter()
const lva = useLifetimeValueAnalyzer()
provide('lva', lva)

const { hasAnalyzed, resetAll } = lva
</script>

<template>
  <div class="lva-wrap">

    <div class="lva-topbar">
      <button @click="router.back()" class="lva-back">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
        Back to wardrobe
      </button>
      <Transition name="fade-up">
        <button v-if="hasAnalyzed" @click="resetAll" class="lva-reset-pill">↺ Reset</button>
      </Transition>
    </div>

    <div class="lva-grid">
      <LVAInputPanel />
      <LVAResultsPanel />
    </div>

  </div>
</template>

<style scoped>
.lva-wrap {
  min-height: 100vh;
  background: #eef5ee;
  display: flex;
  flex-direction: column;
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  color: #1a1a1a;
}

.lva-topbar {
  background: #eef5ee;
  border-bottom: 1px solid #c8e0c8;
  padding: 0.75rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-shrink: 0;
}
.lva-back {
  background: none; border: none; cursor: pointer; font-size: 0.875rem; color: #4a4a4a;
  display: flex; align-items: center; gap: 0.375rem; font-weight: 500; padding: 0; transition: color 0.2s;
}
.lva-back:hover { color: #1c4a1c; }
.lva-back svg { transition: transform 0.2s cubic-bezier(0.16,1,0.3,1); }
.lva-back:hover svg { transform: translateX(-3px); }

.lva-reset-pill {
  background: none; border: 1.5px solid #1c4a1c; color: #1c4a1c;
  font-size: 0.8rem; font-weight: 600; padding: 0.3rem 0.875rem;
  border-radius: 999px; cursor: pointer; transition: all 0.2s;
}
.lva-reset-pill:hover { background: #1c4a1c; color: white; }

.lva-grid {
  display: grid;
  grid-template-columns: 300px 1fr;
  flex: 1;
  align-items: start;
}

.fade-up-enter-active { transition: opacity 0.25s ease, transform 0.25s cubic-bezier(0.16,1,0.3,1); }
.fade-up-leave-active { transition: opacity 0.15s ease; }
.fade-up-enter-from   { opacity: 0; transform: translateY(6px); }
.fade-up-leave-to     { opacity: 0; }

@media (max-width: 768px) {
  .lva-topbar { padding: 0.625rem 1rem; }
  .lva-grid   { grid-template-columns: 1fr; }
}
</style>
