<script setup>
import { inject } from 'vue'

const {
  hasAnalyzed, ringPulsed, currentTipIndex,
  calc, displayScore, itemTypeIcon,
  heroSubline, valueLabel, scoreDescription, badgeStyle,
  resultMetrics, scoreBreakdown, recommendationTips, valueRecoveredPct,
  wearsPerMonth,
} = inject('lva')

const hints = [
  { icon: '⏳', label: 'Estimated Lifespan' },
  { icon: '💰', label: 'Cost Per Wear'      },
  { icon: '🌿', label: 'Eco Impact'          },
]
</script>

<template>
  <div class="lva-right">

    <!-- Empty state -->
    <div v-if="!hasAnalyzed" class="lva-empty">
      <div class="lva-empty-img-wrap">
        <img src="/clothing-rack.png" alt="" class="lva-empty-bg" onerror="this.style.opacity='0'" />
      </div>
      <div class="lva-empty-content">
        <h2 class="lva-empty-h">Ready to Analyze</h2>
        <p class="lva-empty-p">Fill in your item details on the left, then click <strong>Analyze Lifetime Value</strong> to see your personalized report.</p>
        <div class="lva-hint-cards">
          <div v-for="h in hints" :key="h.label" class="lva-hint-card">
            <div class="lva-hint-icon">{{ h.icon }}</div>
            <div class="lva-hint-label">{{ h.label }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Results -->
    <div v-else class="lva-results">

      <!-- Hero -->
      <div class="lva-hero">
        <div class="lva-hero-text">
          <h1 class="lva-hero-h">Analysis Complete</h1>
          <p class="lva-hero-p">{{ heroSubline }}</p>
        </div>
        <div class="lva-hero-img-wrap">
          <img src="/clothing-rack.png" alt="Clothing" class="lva-hero-img" onerror="this.style.display='none'" />
        </div>
      </div>

      <!-- Score + Metrics -->
      <div class="lva-score-block">
        <div class="lva-score-card">
          <div class="lva-ring-wrap" :class="{ 'lva-ring-pulsed': ringPulsed }" @animationend="ringPulsed = false">
            <svg width="96" height="96" viewBox="0 0 100 100" style="transform:rotate(-90deg)">
              <circle cx="50" cy="50" r="42" stroke="#c8e0c8" stroke-width="7" fill="none"/>
              <circle cx="50" cy="50" r="42" stroke="#1c4a1c" stroke-width="7" fill="none"
                stroke-linecap="round"
                :stroke-dasharray="`${2*Math.PI*42}`"
                :stroke-dashoffset="`${2*Math.PI*42*(1-displayScore/100)}`"
                class="lva-ring-stroke"/>
            </svg>
            <div class="lva-ring-center">
              <span class="lva-ring-num">{{ Math.round(displayScore) }}</span>
              <span class="lva-ring-denom">/100</span>
            </div>
          </div>
          <div class="lva-score-info">
            <p class="lva-score-lbl">Overall Value Score</p>
            <span class="lva-badge" :style="badgeStyle">{{ valueLabel }}</span>
            <p class="lva-score-desc">{{ scoreDescription }}</p>
          </div>
        </div>

        <div class="lva-metrics">
          <div v-for="(m,i) in resultMetrics" :key="m.label" class="lva-metric"
            :class="{ 'lva-metric-highlight': i === resultMetrics.length - 1 }">
            <div class="lva-metric-icon">{{ m.icon }}</div>
            <div class="lva-metric-val">{{ m.value }}</div>
            <div class="lva-metric-lbl">{{ m.label }}</div>
          </div>
        </div>
      </div>

      <!-- Break-even + Smart Rec -->
      <div class="lva-mid-row">

        <div class="lva-card">
          <p class="lva-card-title">Break-even Progress</p>
          <p class="lva-card-sub" v-if="valueRecoveredPct >= 100">
            At <strong>{{ wearsPerMonth }}×/month</strong>, you'll hit break-even in
            <strong>{{ Math.ceil(calc.breakEvenWears / wearsPerMonth) }} months</strong> —
            well within this item's {{ calc.lifespan.toFixed(1) }}-year projected life.
          </p>
          <p class="lva-card-sub" v-else>
            At <strong>{{ wearsPerMonth }}×/month</strong>, you won't reach the
            {{ calc.breakEvenWears }}-wear break-even within this item's projected lifespan.
            Wear it more often to get value from it.
          </p>
          <div class="lva-prog-wrap">
            <div class="lva-prog-track">
              <div class="lva-prog-fill" :class="{ 'lva-prog-full': valueRecoveredPct >= 100 }"
                :style="{ width: Math.min(100, valueRecoveredPct) + '%' }"></div>
              <div class="lva-prog-dot" :style="{ left: Math.min(97, valueRecoveredPct) + '%' }"></div>
            </div>
          </div>
          <div class="lva-prog-labels">
            <div>
              <span class="lva-pl-v">0 wears</span>
              <span class="lva-pl-h">start</span>
            </div>
            <div style="text-align:right">
              <span class="lva-pl-v lva-pl-accent">{{ calc.breakEvenWears }} wears</span>
              <span class="lva-pl-h">break-even goal</span>
            </div>
          </div>
        </div>

        <div class="lva-rec-card" :class="{ 'lva-rec-in': hasAnalyzed }">
          <div class="lva-rec-header">
            <p class="lva-card-title">Smart Recommendation</p>
            <span class="lva-rec-count">{{ currentTipIndex + 1 }} of {{ recommendationTips.length }}</span>
          </div>
          <div class="lva-rec-body">
            <span class="lva-rec-quote">"</span>
            <span class="lva-rec-bg-emoji">{{ itemTypeIcon || '👕' }}</span>
            <Transition name="rec-slide" mode="out-in">
              <p class="lva-rec-txt" :key="currentTipIndex">{{ recommendationTips[currentTipIndex] }}</p>
            </Transition>
          </div>
          <div class="lva-rec-footer">
            <div class="lva-tip-track">
              <div class="lva-tip-fill" :key="currentTipIndex"></div>
            </div>
            <div class="lva-dots">
              <button v-for="(_,i) in recommendationTips" :key="i"
                @click="currentTipIndex = i"
                class="lva-dot" :class="{ 'lva-dot-on': i === currentTipIndex }"></button>
            </div>
          </div>
        </div>

      </div>

      <!-- Score Breakdown -->
      <div class="lva-card">
        <p class="lva-card-title">Score Breakdown</p>
        <div class="lva-breakdown-grid">
          <div v-for="sub in scoreBreakdown" :key="sub.label" class="lva-bd-item">
            <div class="lva-bd-head">
              <span class="lva-bd-name">{{ sub.label }}</span>
              <span class="lva-bd-score">{{ Math.round(sub.score) }}/100</span>
            </div>
            <div class="lva-bd-track">
              <div class="lva-bd-fill" :style="{ width: sub.score + '%', background: sub.color }"></div>
            </div>
          </div>
        </div>
      </div>

      <p class="lva-footer-note">Insights are based on your inputs and industry benchmarks.</p>

    </div>
  </div>
</template>

<style scoped>
.lva-right { padding: 1.75rem 2rem; min-height: calc(100vh - 48px); }

/* Empty state */
.lva-empty {
  position: relative; min-height: 480px; border-radius: 1.25rem;
  overflow: hidden; border: 1px solid #daeada;
  display: flex; align-items: center; justify-content: center;
}
.lva-empty-img-wrap { position: absolute; inset: 0; }
.lva-empty-bg { width: 100%; height: 100%; object-fit: cover; object-position: center 30%; display: block; }
.lva-empty-img-wrap::after {
  content: ''; position: absolute; inset: 0; background: rgba(240,248,240,0.88);
}
.lva-empty-content { position: relative; z-index: 1; padding: 2.5rem 2rem; text-align: center; width: 100%; }
.lva-empty-h { font-size: 1.5rem; font-weight: 800; margin: 0 0 0.5rem; color: #1a1a1a; }
.lva-empty-p { font-size: 0.9375rem; color: #666; margin: 0 auto 1.5rem; max-width: 22rem; line-height: 1.7; }
.lva-hint-cards { display: grid; grid-template-columns: repeat(3,1fr); gap: 0.75rem; max-width: 24rem; margin: 0 auto; }
.lva-hint-card  { background: #f7faf7; border-radius: 0.875rem; padding: 1rem; border: 1px solid #daeada; text-align: center; }
.lva-hint-icon  { font-size: 1.75rem; margin-bottom: 0.375rem; }
.lva-hint-label { font-size: 0.75rem; font-weight: 600; color: #4a4a4a; line-height: 1.3; }

/* Results */
.lva-results { display: flex; flex-direction: column; gap: 1.125rem; }

/* Hero */
.lva-hero {
  background: white; border-radius: 1.25rem; border: 1px solid #daeada;
  position: relative; overflow: hidden; min-height: 130px;
}
.lva-hero-text {
  padding: 1.75rem 2rem; display: flex; flex-direction: column; justify-content: center;
  position: relative; z-index: 2; max-width: 60%;
}
.lva-hero-h {
  font-family: Georgia, 'Times New Roman', serif; font-size: 2rem; font-weight: 700;
  color: #1a1a1a; margin: 0 0 0.5rem; letter-spacing: -0.02em; line-height: 1.15;
}
.lva-hero-p { font-size: 0.9rem; color: #666; margin: 0; line-height: 1.6; }
.lva-hero-img-wrap { position: absolute; right: 0; top: 0; bottom: 0; width: 50%; z-index: 1; }
.lva-hero-img-wrap::before {
  content: ''; position: absolute; inset: 0; z-index: 2;
  background: linear-gradient(to right, white 0%, rgba(255,255,255,0.6) 35%, transparent 70%);
}
.lva-hero-img { width: 100%; height: 100%; object-fit: cover; display: block; }

/* Score block */
.lva-score-block { background: white; border-radius: 1.25rem; border: 1px solid #daeada; overflow: hidden; }
.lva-score-card  { display: flex; align-items: center; gap: 1.25rem; padding: 1.25rem 1.5rem; border-bottom: 1px solid #e0ede0; }
.lva-ring-wrap   { position: relative; flex-shrink: 0; }
.lva-ring-stroke { transition: stroke-dashoffset 1.2s ease-out; }
.lva-ring-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.lva-ring-num    { font-size: 1.75rem; font-weight: 800; color: #1a1a1a; line-height: 1; }
.lva-ring-denom  { font-size: 0.7rem; color: #aaa; line-height: 1; }
.lva-score-info  { flex: 1; }
.lva-score-lbl   { font-size: 0.7rem; color: #999; text-transform: uppercase; letter-spacing: 0.07em; margin: 0 0 0.375rem; font-weight: 600; }
.lva-badge       { display: inline-block; padding: 0.2rem 0.75rem; border-radius: 999px; font-size: 0.8rem; font-weight: 700; margin-bottom: 0.5rem; }
.lva-score-desc  { font-size: 0.8375rem; color: #555; line-height: 1.55; margin: 0; }

/* Metrics */
.lva-metrics { display: grid; grid-template-columns: repeat(6,1fr); }
.lva-metric  { padding: 0.875rem 0.5rem; text-align: center; border-right: 1px solid #e0ede0; }
.lva-metric:last-child { border-right: none; }
.lva-metric-highlight { background: #f0f8f0; }
.lva-metric-icon { font-size: 1.1rem; margin-bottom: 0.25rem; }
.lva-metric-val  { font-size: 0.9375rem; font-weight: 800; color: #1a1a1a; line-height: 1.2; margin-bottom: 0.2rem; }
.lva-metric-lbl  { font-size: 0.65rem; color: #888; line-height: 1.3; }

/* Cards */
.lva-mid-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.125rem; }
.lva-card {
  background: white; border-radius: 1.25rem; border: 1px solid #daeada; padding: 1.25rem 1.5rem;
}
.lva-card-title { font-size: 0.68rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #1a1a1a; margin: 0 0 0.375rem; }
.lva-card-sub   { font-size: 0.8125rem; color: #555; margin: 0 0 0.875rem; line-height: 1.5; }

/* Progress bar */
.lva-prog-wrap  { margin-bottom: 0.625rem; }
.lva-prog-track { position: relative; height: 8px; background: #d0e8d0; border-radius: 999px; overflow: visible; }
.lva-prog-fill  { height: 100%; background: #1c4a1c; border-radius: 999px; transition: width 1s ease; }
.lva-prog-dot   {
  position: absolute; top: 50%; transform: translate(-50%,-50%);
  width: 13px; height: 13px; background: white; border: 2.5px solid #1c4a1c;
  border-radius: 50%; pointer-events: none; transition: left 1s ease;
}
.lva-prog-labels { display: flex; justify-content: space-between; margin-top: 0.5rem; }
.lva-pl-v { display: block; font-size: 0.75rem; font-weight: 600; color: #1a1a1a; }
.lva-pl-accent { color: #1c4a1c; }
.lva-pl-h { display: block; font-size: 0.68rem; color: #999; margin-top: 0.1rem; }

/* Recommendation */
.lva-rec-card {
  background: white; border-radius: 1.25rem; border: 1px solid #daeada;
  padding: 1.25rem 1.5rem; opacity: 0; transform: translateY(12px);
  transition: opacity 0.6s ease, transform 0.6s ease; overflow: hidden;
}
.lva-rec-in { opacity: 1; transform: translateY(0); }
.lva-rec-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.625rem; }
.lva-rec-count  { font-size: 0.7rem; font-weight: 600; color: #aaa; letter-spacing: 0.04em; }
.lva-rec-body   { position: relative; min-height: 72px; margin-bottom: 1rem; padding-left: 2.25rem; }
.lva-rec-quote  {
  position: absolute; left: -0.25rem; top: -0.625rem;
  font-family: Georgia, serif; font-size: 3.5rem; color: #1c4a1c;
  opacity: 0.13; line-height: 1; pointer-events: none; user-select: none;
}
.lva-rec-bg-emoji {
  position: absolute; right: -0.75rem; bottom: -0.5rem; font-size: 3.75rem;
  opacity: 0.07; line-height: 1; pointer-events: none; user-select: none; transform: rotate(12deg);
}
.lva-rec-txt { font-size: 0.9rem; color: #2a2a2a; line-height: 1.7; margin: 0; position: relative; z-index: 1; }
.lva-rec-footer { display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.25rem; }
.lva-tip-track  { height: 2px; background: #d0e8d0; border-radius: 999px; overflow: hidden; }
.lva-tip-fill   {
  height: 100%; width: 100%; background: #1c4a1c; border-radius: 999px;
  transform-origin: left center; transform: scaleX(0);
}
.lva-dots { display: flex; gap: 0.375rem; }
.lva-dot  {
  height: 0.375rem; width: 0.375rem; border-radius: 999px;
  background: #c8e0c8; border: none; cursor: pointer; padding: 0;
  transition: width 0.35s cubic-bezier(0.16,1,0.3,1), background 0.25s ease;
}
.lva-dot-on { width: 1.25rem; background: #1c4a1c; }

/* Breakdown */
.lva-breakdown-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem 1.5rem; }
.lva-bd-item  { display: flex; flex-direction: column; gap: 0.3rem; }
.lva-bd-head  { display: flex; justify-content: space-between; align-items: center; }
.lva-bd-name  { font-size: 0.8rem; color: #444; font-weight: 500; }
.lva-bd-score { font-size: 0.8rem; font-weight: 700; color: #1a1a1a; }
.lva-bd-track { height: 6px; background: #d0e8d0; border-radius: 999px; overflow: hidden; }
.lva-bd-fill  { height: 100%; border-radius: 999px; transition: width 0.9s ease; }

.lva-footer-note { text-align: center; font-size: 0.75rem; color: #aaa; margin: 0; padding-bottom: 0.5rem; }

/* Transitions */
.rec-slide-enter-active { transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.16,1,0.3,1); }
.rec-slide-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.rec-slide-enter-from   { opacity: 0; transform: translateY(6px); }
.rec-slide-leave-to     { opacity: 0; transform: translateY(-4px); }

@media (prefers-reduced-motion: no-preference) {
  @keyframes lva-ring-pulse {
    0%   { transform: scale(1); }
    35%  { transform: scale(1.08); }
    65%  { transform: scale(0.97); }
    100% { transform: scale(1); }
  }
  @keyframes lva-prog-glow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(28,74,28,0); }
    50%       { box-shadow: 0 0 8px 2px rgba(28,74,28,0.35); }
  }
  @keyframes lva-tip-sweep { from { transform: scaleX(0); } to { transform: scaleX(1); } }
  @keyframes lva-metric-in { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes lva-bd-in     { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: translateX(0); } }
  @keyframes lva-hero-in   { from { opacity: 0; transform: translateY(6px) scale(0.97); } to { opacity: 1; transform: translateY(0) scale(1); } }

  .lva-tip-fill   { animation: lva-tip-sweep 4s linear forwards; }
  .lva-ring-pulsed{ animation: lva-ring-pulse 0.55s cubic-bezier(0.16,1,0.3,1); }
  .lva-prog-full  { animation: lva-prog-glow 2s ease-in-out infinite; }

  .lva-metric { animation: lva-metric-in 0.4s cubic-bezier(0.16,1,0.3,1) both; }
  .lva-metric:nth-child(1) { animation-delay: 0.05s; }
  .lva-metric:nth-child(2) { animation-delay: 0.10s; }
  .lva-metric:nth-child(3) { animation-delay: 0.15s; }
  .lva-metric:nth-child(4) { animation-delay: 0.20s; }
  .lva-metric:nth-child(5) { animation-delay: 0.25s; }
  .lva-metric:nth-child(6) { animation-delay: 0.30s; }

  .lva-bd-item { animation: lva-bd-in 0.35s cubic-bezier(0.16,1,0.3,1) both; }
  .lva-bd-item:nth-child(1) { animation-delay: 0.15s; }
  .lva-bd-item:nth-child(2) { animation-delay: 0.22s; }
  .lva-bd-item:nth-child(3) { animation-delay: 0.29s; }
  .lva-bd-item:nth-child(4) { animation-delay: 0.36s; }

  .lva-hero-h { animation: lva-hero-in 0.5s cubic-bezier(0.16,1,0.3,1) both 0.05s; }
}

@media (prefers-reduced-motion: reduce) {
  .lva-rec-card, .lva-rec-card.lva-rec-in { opacity: 1; transform: none; transition: none; }
  .lva-tip-fill { transform: scaleX(1); }
  .lva-dot { transition: background 0.15s ease; }
}

@media (max-width: 768px) {
  .lva-right { padding: 1rem; min-height: unset; }
  .lva-hero  { min-height: 90px; }
  .lva-hero-text { max-width: 70%; padding: 1.25rem 1rem; }
  .lva-hero-h    { font-size: 1.375rem; }
  .lva-hero-p    { display: none; }
  .lva-metrics   { grid-template-columns: repeat(3,1fr); }
  .lva-metric:nth-child(3) { border-right: none; }
  .lva-metric:nth-child(4),
  .lva-metric:nth-child(5),
  .lva-metric:nth-child(6) { border-top: 1px solid #e0ede0; }
  .lva-mid-row         { grid-template-columns: 1fr; }
  .lva-breakdown-grid  { grid-template-columns: 1fr; }
  .lva-score-card      { padding: 1rem; gap: 0.875rem; }
  .lva-ring-num        { font-size: 1.375rem; }
}
</style>
