<template>
  <section class="impact-section">
    <div class="impact-inner">

      <!-- Left: headline -->
      <div class="impact-left">
        <p class="impact-heading">
          The impact is real.<br>
          But so is the <span class="impact-accent">opportunity.</span>
        </p>
        <svg class="impact-leaf" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 5.25-8 5.25V7a2 2 0 10-4 0v2S2 9 2 20a2 2 0 002 2c3.13 0 5-2.46 5-2.46A14.18 14.18 0 0117 8z"/>
        </svg>
      </div>

      <!-- Vertical rule -->
      <div class="impact-rule" aria-hidden="true"></div>

      <!-- Stats -->
      <div class="impact-stats">

        <div class="stat">
          <div class="stat-icon">
            <!-- seedling / food -->
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 5.25-8 5.25V7a2 2 0 10-4 0v2S2 9 2 20a2 2 0 002 2c3.13 0 5-2.46 5-2.46A14.18 14.18 0 0117 8z"/></svg>
          </div>
          <div class="stat-body">
            <div class="stat-num">7.6M <span class="stat-unit">tonnes</span></div>
            <div class="stat-desc">of food wasted every year in Australia</div>
            <a href="https://www.dcceew.gov.au/environment/protection/waste/national-waste-reports"
               target="_blank" rel="noopener noreferrer" class="stat-source">Source: DOCEEW</a>
          </div>
        </div>

        <div class="stat-divider" aria-hidden="true"></div>

        <div class="stat">
          <div class="stat-icon">
            <!-- shirt -->
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a1 1 0 00-.66 1.2l1 3.48a1 1 0 001.24.68L7 8.16V21a1 1 0 001 1h8a1 1 0 001-1V8.16l1.8.66a1 1 0 001.24-.68l1-3.48a1 1 0 00-.66-1.2z"/></svg>
          </div>
          <div class="stat-body">
            <div class="stat-num">&gt;200K <span class="stat-unit">tonnes</span></div>
            <div class="stat-desc">of clothing sent to landfill</div>
            <a href="https://ausfashioncouncil.com/program/seamless/"
               target="_blank" rel="noopener noreferrer" class="stat-source">Source: Australian Fashion Council</a>
          </div>
        </div>

        <div class="stat-divider" aria-hidden="true"></div>

        <div class="stat">
          <div class="stat-icon">
            <!-- device/tablet -->
            <svg viewBox="0 0 24 24" fill="currentColor"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><circle cx="12" cy="18" r="1"/></svg>
          </div>
          <div class="stat-body">
            <div class="stat-num">~540K <span class="stat-unit">tonnes</span></div>
            <div class="stat-desc">of e-waste produced every year</div>
            <a href="https://www.dcceew.gov.au/environment/protection/waste/publications/national-waste-resource-recovery-reporting"
               target="_blank" rel="noopener noreferrer" class="stat-source">Source: National Waste Report 2024</a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
/* Full-width dark green — no white gap */
.impact-section {
  width: 100%;
  background: #0f2318;
  padding: clamp(40px, 5vw, 72px) 5%;
  box-sizing: border-box;
}

.impact-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: clamp(24px, 4vw, 56px);
}

/* Left */
.impact-left {
  flex: 0 0 auto;
  min-width: 260px;
  max-width: 320px;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.impact-heading {
  font-size: clamp(1.1rem, 1.4vw, 1.3rem);
  font-weight: 700;
  color: #ffffff;
  line-height: 1.55;
  margin: 0;
  white-space: nowrap;
}

.impact-accent {
  color: #c9a84c;
  font-style: italic;
}

.impact-leaf {
  width: 20px;
  height: 20px;
  color: #c9a84c;
}

/* Vertical rule */
.impact-rule {
  width: 1px;
  align-self: stretch;
  background: rgba(255,255,255,0.15);
  flex-shrink: 0;
}

/* Stats row */
.impact-stats {
  flex: 1;
  display: flex;
  align-items: center;
}

.stat {
  flex: 1;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0 clamp(16px, 2.5vw, 40px);
}

/* Icon circle */
.stat-icon {
  flex-shrink: 0;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #1e3d2a;
  border: 1px solid rgba(201,168,76,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 2px;
}
.stat-icon svg {
  width: 20px;
  height: 20px;
  color: #c9a84c;
}

.stat-body {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
}

/* Golden number */
.stat-num {
  font-size: clamp(1.4rem, 2vw, 1.9rem);
  font-weight: 900;
  color: #c9a84c;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.stat-unit {
  font-size: 0.75em;
  font-weight: 600;
  color: #c9a84c;
  opacity: 0.8;
}

.stat-desc {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.8);
  line-height: 1.45;
}

.stat-source {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.35);
  text-decoration: none;
  transition: color 0.2s;
}
.stat-source:hover { color: #c9a84c; }

/* Thin dividers between stats */
.stat-divider {
  width: 1px;
  height: 60px;
  background: rgba(255,255,255,0.1);
  flex-shrink: 0;
  align-self: center;
}

/* Responsive */
@media (max-width: 900px) {
  .impact-inner { flex-direction: column; align-items: flex-start; }
  .impact-rule { display: none; }
  .impact-left { max-width: 100%; }
  .impact-stats { width: 100%; flex-wrap: wrap; gap: 1.5rem; }
  .stat { flex: 1 1 140px; padding: 0; }
  .stat-divider { display: none; }
}

@media (max-width: 500px) {
  .stat { flex: 1 1 100%; }
}
</style>
