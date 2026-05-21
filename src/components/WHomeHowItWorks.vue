<template>
  <section class="hiw-section" id="how-it-works">
    <div class="hiw-inner">
      <h2 class="hiw-title">How it <span class="hiw-title-accent">works</span></h2>

      <div class="hiw-steps">

        <!-- Step 1 -->
        <div class="step">
          <div class="step-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
              <circle cx="11" cy="11" r="7"/><path d="M21 21l-4.35-4.35"/>
            </svg>
          </div>
          <div class="step-body">
            <div class="step-num">1</div>
            <b class="step-title">Explore</b>
            <p class="step-desc">Search items, scan products, or audit your home to gather data.</p>
          </div>
        </div>

        <div class="step-arrow" aria-hidden="true">
          <svg viewBox="0 0 60 12" fill="none">
            <line x1="0" y1="6" x2="48" y2="6" stroke="#b0b8b4" stroke-width="1.5" stroke-dasharray="4 4"/>
            <path d="M48 2l6 4-6 4" stroke="#b0b8b4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>
        </div>

        <!-- Step 2 -->
        <div class="step">
          <div class="step-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
              <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
            </svg>
          </div>
          <div class="step-body">
            <div class="step-num">2</div>
            <b class="step-title">Understand</b>
            <p class="step-desc">We analyse the full picture — cost, impact, usage and waste patterns.</p>
          </div>
        </div>

        <div class="step-arrow" aria-hidden="true">
          <svg viewBox="0 0 60 12" fill="none">
            <line x1="0" y1="6" x2="48" y2="6" stroke="#b0b8b4" stroke-width="1.5" stroke-dasharray="4 4"/>
            <path d="M48 2l6 4-6 4" stroke="#b0b8b4" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>
        </div>

        <!-- Step 3 -->
        <div class="step">
          <div class="step-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 5.25-8 5.25V7a2 2 0 10-4 0v2S2 9 2 20a2 2 0 002 2c3.13 0 5-2.46 5-2.46A14.18 14.18 0 0117 8z"/>
            </svg>
          </div>
          <div class="step-body">
            <div class="step-num">3</div>
            <b class="step-title">Improve</b>
            <p class="step-desc">Get smart recommendations and take action toward a better everyday.</p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

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
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  min-width: 0;
}

.step-icon {
  flex-shrink: 0;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #f0f4f2;
  display: flex;
  align-items: center;
  justify-content: center;
}
.step-icon svg {
  width: 22px;
  height: 22px;
  color: #009387;
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
.step-arrow svg { width: 100%; }

@media (max-width: 900px) {
  .hiw-steps { flex-wrap: wrap; gap: 1.5rem; }
  .step-arrow { display: none; }
  .step { flex: 1 1 200px; }
}

@media (max-width: 600px) {
  .step { flex: 1 1 100%; }
}
</style>
