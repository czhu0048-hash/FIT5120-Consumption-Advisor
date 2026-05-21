<template>
  <section class="closing-section">
    <div class="closing-pill">

      <!-- Plant bleeds above pill -->
      <img src="@/assets/Wel_plant.png" alt="" class="closing-plant" aria-hidden="true" />

      <!-- Tagline -->
      <div class="closing-tagline">
        <span class="line1">Small choices today,</span>
        <span class="line2"><em class="accent">big impact</em> tomorrow.</span>
      </div>

      <!-- Icons -->
      <div class="closing-icons">
        <!-- Bowl / food -->
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 11h18v1a9 9 0 01-18 0v-1z"/><path d="M8 11V7a4 4 0 018 0v4"/><line x1="12" y1="20" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
        <span class="dot">·</span>
        <!-- Shirt -->
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a1 1 0 00-.66 1.2l1 3.48a1 1 0 001.24.68L7 8.16V21a1 1 0 001 1h8a1 1 0 001-1V8.16l1.8.66a1 1 0 001.24-.68l1-3.48a1 1 0 00-.66-1.2z"/>
        </svg>
        <span class="dot">·</span>
        <!-- Fan -->
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="3"/>
          <path d="M12 2C6.5 2 4 6 4 9c0 2.5 1.5 4 3 4h2M12 22c5.5 0 8-4 8-7 0-2.5-1.5-4-3-4h-2M2 12c0-5.5 4-8 7-8 2.5 0 4 1.5 4 3v2M22 12c0 5.5-4 8-7 8-2.5 0-4-1.5-4-3v-2"/>
        </svg>
        <span class="dot">·</span>
        <!-- Washing machine -->
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2"/><circle cx="12" cy="13" r="4"/>
          <line x1="6" y1="6" x2="6.01" y2="6"/><line x1="10" y1="6" x2="14" y2="6"/>
        </svg>
        <span class="dot">·</span>
        <!-- Recycle bin -->
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="1 4 1 10 7 10"/><polyline points="23 20 23 14 17 14"/>
          <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15"/>
        </svg>
        <span class="dot">·</span>
        <!-- Leaf -->
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 5.25-8 5.25V7a2 2 0 10-4 0v2S2 9 2 20a2 2 0 002 2c3.13 0 5-2.46 5-2.46A14.18 14.18 0 0117 8z"/>
        </svg>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Sits on the same green as the page */
.closing-section {
  width: 100%;
  background: #f4fdf9;
  padding: 0 5% clamp(48px, 6vw, 80px);
  box-sizing: border-box;
}

/* Pill container */
.closing-pill {
  max-width: 1400px;
  margin: 0 auto;
  background: #eef8f3;
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 999px;
  box-shadow: 0 2px 24px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  gap: clamp(20px, 3vw, 44px);
  padding: 0 clamp(40px, 5vw, 72px) 0 0;
  min-height: 112px;
  overflow: visible;
}

/* Plant overflows above the pill */
.closing-plant {
  height: 185px;
  width: auto;
  object-fit: contain;
  flex-shrink: 0;
  align-self: flex-end;
  display: block;
  margin-bottom: -1px;
  mix-blend-mode: multiply;
}

/* Tagline */
.closing-tagline {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  flex-shrink: 0;
}

.line1,
.line2 {
  font-size: clamp(1rem, 1.4vw, 1.25rem);
  font-weight: 700;
  color: #111;
  line-height: 1.35;
}

.accent {
  font-style: normal;
  color: #1a6b52;
}

/* Icons */
.closing-icons {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-left: auto;
  flex-wrap: nowrap;
}

.closing-icons svg {
  width: 34px;
  height: 34px;
  color: #7aaa96;
  flex-shrink: 0;
}

.dot {
  color: #b0cfc5;
  font-size: 1rem;
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .closing-icons { display: none; }
  .closing-pill { border-radius: 1.5rem; }
}

@media (max-width: 600px) {
  .closing-plant { height: 120px; }
  .line1, .line2 { font-size: 1rem; }
}
</style>
