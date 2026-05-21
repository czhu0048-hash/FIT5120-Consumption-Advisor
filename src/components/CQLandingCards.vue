<script setup>
defineEmits(['startQuiz', 'openCalculator'])
</script>

<template>
  <section class="cq-cards">

    <!-- Quiz card -->
    <div class="cq-card cq-card-quiz">
      <div class="cq-comp-badge">COMPLIMENTARY</div>
      <div class="cq-card-icon-wrap">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#009387" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v4"/><circle cx="12" cy="15" r=".5" fill="#009387"/></svg>
      </div>
      <h2 class="cq-card-h">Not sure yet?</h2>
      <p class="cq-card-script">Let's figure it out.</p>
      <div class="cq-card-rule"></div>
      <p class="cq-card-desc">A quick questionnaire to help you make mindful, aligned purchase decisions.</p>
      <div class="cq-features">
        <div class="cq-feature">
          <div class="cq-feature-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#009387" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 8v4l3 3"/></svg>
          </div>
          <span>Smart<br>guidance</span>
        </div>
        <div class="cq-feature">
          <div class="cq-feature-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#009387" stroke-width="2.5" stroke-linecap="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
          </div>
          <span>No<br>pressure</span>
        </div>
        <div class="cq-feature">
          <div class="cq-feature-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#009387" stroke-width="2.5" stroke-linecap="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <span>Better<br>decisions</span>
        </div>
      </div>
      <button @click="$emit('startQuiz')" class="cq-quiz-btn">Take the Quiz →</button>
    </div>

    <!-- Calculator card -->
    <div class="cq-card cq-card-calc">
      <div class="cq-card-top-row">
        <div class="cq-card-icon-wrap">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#009387" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/></svg>
        </div>
        <div class="cq-rec-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
          RECOMMENDED
        </div>
        <div class="cq-popular-label">Most popular</div>
      </div>
      <h2 class="cq-card-h cq-card-h-lg">
        Know what your clothes are<br>
        <span class="cq-script cq-script-underline">Really</span> worth.
      </h2>
      <div class="cq-card-rule"></div>
      <p class="cq-card-desc">Our powerful calculator reveals the real lifetime value, cost per wear, and environmental impact of your clothes.</p>
      <div class="cq-tags">
        <span class="cq-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>
          True lifetime value
        </span>
        <span class="cq-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
          Cost per wear
        </span>
        <span class="cq-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="#009387" stroke="none"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 5.25-8 5.25V7a2 2 0 10-4 0v2S2 9 2 20a2 2 0 002 2c3.13 0 5-2.46 5-2.46A14.18 14.18 0 0117 8z"/></svg>
          Environmental impact
        </span>
      </div>
      <button @click="$emit('openCalculator')" class="cq-calc-btn">Open the Calculator →</button>
      <p class="cq-trust">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
        100% private &bull; No signup needed
      </p>
    </div>

  </section>
</template>

<style scoped>
.cq-cards {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 1.25rem;
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
}

.cq-card {
  background: white;
  border-radius: 1.5rem;
  padding: 2rem 1.875rem;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease;
}
.cq-card:hover { transform: translateY(-3px); box-shadow: 0 20px 48px rgba(0,147,135,0.1); }

.cq-card-quiz { border: 1.5px solid #b2e0dc; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
.cq-card-calc { border: 1.5px solid #b2e0dc; box-shadow: 0 8px 32px rgba(0,147,135,0.1); }

.cq-comp-badge {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  background: rgba(0, 147, 135, 0.08);
  color: #009387;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
}

.cq-card-icon-wrap {
  width: 2.875rem;
  height: 2.875rem;
  background: rgba(0, 147, 135, 0.07);
  border-radius: 0.875rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.cq-card-top-row { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; }

.cq-rec-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  background: #009387;
  color: white;
  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
}

.cq-popular-label {
  font-family: 'Covered By Your Grace', cursive;
  font-size: 1.0625rem;
  color: #009387;
  margin-left: auto;
}

.cq-card-h { font-size: 1.5rem; font-weight: 800; color: #111; margin: 0; line-height: 1.2; letter-spacing: -0.02em; }
.cq-card-h-lg { font-size: 1.625rem; }

.cq-card-script { font-family: 'Covered By Your Grace', cursive; font-size: 1.4rem; color: #009387; margin: 0; }
.cq-script { font-family: 'Covered By Your Grace', cursive; color: #009387; font-size: 1.1em; }
.cq-script-underline { text-decoration: underline; text-underline-offset: 5px; text-decoration-thickness: 2px; }

.cq-card-rule { height: 2px; width: 2rem; background: #009387; border-radius: 1px; opacity: 0.35; }
.cq-card-desc { font-size: 0.9rem; color: #555; line-height: 1.65; margin: 0; }

.cq-features { display: flex; gap: 1.5rem; margin-top: 0.25rem; }
.cq-feature { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; text-align: center; }
.cq-feature-icon {
  width: 2.5rem; height: 2.5rem; border-radius: 50%;
  background: rgba(0, 147, 135, 0.07);
  display: flex; align-items: center; justify-content: center;
}
.cq-feature span { font-size: 0.75rem; font-weight: 600; color: #444; line-height: 1.3; }

.cq-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.cq-tag {
  display: inline-flex; align-items: center; gap: 0.35rem;
  background: rgba(0, 147, 135, 0.06); color: #009387;
  font-size: 0.75rem; font-weight: 600;
  padding: 0.35rem 0.875rem; border-radius: 0.5rem;
  border: 1px solid rgba(0, 147, 135, 0.15);
}

.cq-quiz-btn {
  margin-top: auto;
  background: white;
  border: 2px solid #009387;
  color: #009387;
  font-size: 0.9375rem; font-weight: 700;
  padding: 0.8125rem 1.5rem; border-radius: 0.875rem;
  cursor: pointer; transition: all 0.2s cubic-bezier(0.16,1,0.3,1); text-align: center;
}
.cq-quiz-btn:hover { background: #009387; color: white; transform: translateY(-1px); }
.cq-quiz-btn:active { transform: scale(0.97); }

.cq-calc-btn {
  margin-top: 0.5rem;
  background: #009387; border: none; color: white;
  font-size: 1rem; font-weight: 700;
  padding: 1rem 1.5rem; border-radius: 0.875rem;
  cursor: pointer; transition: all 0.2s cubic-bezier(0.16,1,0.3,1); text-align: center;
  box-shadow: 0 4px 16px rgba(0,147,135,0.28);
}
.cq-calc-btn:hover { background: #007a6f; transform: translateY(-1px); box-shadow: 0 8px 24px rgba(0,147,135,0.35); }
.cq-calc-btn:active { transform: scale(0.97); }

.cq-trust { display: flex; align-items: center; justify-content: center; gap: 0.4rem; font-size: 0.775rem; color: #888; margin: 0; }

@media (max-width: 900px) {
  .cq-cards { grid-template-columns: 1fr; }
}
</style>
