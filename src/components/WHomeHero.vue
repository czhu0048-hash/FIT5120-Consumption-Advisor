<template>
  <section class="hero">
    <div class="hero-inner">

      <!-- Left: text + scroll cue -->
      <div class="hero-left">
        <h1 class="hero-heading">
          Buy Less,<br>
          Use Again,<br>
          Live <span class="hero-script">Wisely.</span>
        </h1>
        <p class="hero-sub">
          A platform built for Australian households to make smarter, more responsible choices across food, clothing, and everyday home habits.
        </p>
        <button class="hero-scroll" @click="$emit('scrollDown')">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
          Scroll to explore
        </button>
      </div>

      <!-- Right: illustration bleeds to edge -->
      <div class="hero-right">
        <img
          src="@/assets/Wel_hero_house.png"
          alt="RedUse platform overview"
          class="hero-img"
        />
      </div>

    </div>
  </section>
</template>

<script setup>
defineEmits(['scrollDown'])
</script>

<style scoped>
.hero {
  width: 100%;
  background: #f4fdf9;
  /* Only pad left and top/bottom — right side is open so image can bleed */
  padding: clamp(56px, 7vw, 100px) 0 0 5%;
  box-sizing: border-box;
  overflow: hidden;
}

.hero-inner {
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 42% 58%;
  align-items: center;
  gap: 0;
}

/* ── Left ─────────────────────────────────────────── */
.hero-left {
  display: flex;
  flex-direction: column;
  gap: 1.75rem;
  text-align: left;
  padding-bottom: clamp(56px, 7vw, 100px);
  padding-right: 2rem;
}

.hero-heading {
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
  font-size: clamp(3.25rem, 5.5vw, 5.25rem);
  font-weight: 900;
  line-height: 1.06;
  color: #0f1a14;
  margin: 0;
  letter-spacing: -0.035em;
}

.hero-script {
  font-family: 'Covered By Your Grace', cursive;
  font-weight: 400;
  color: #009387;
  font-size: 1.08em;
  letter-spacing: 0;
}

.hero-sub {
  font-size: 1.175rem;
  color: #5a6672;
  line-height: 1.75;
  margin: 0;
  font-weight: 400;
  width: 100%;
  text-align: left;
}

.hero-scroll {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 600;
  color: #009387;
  padding: 0;
  letter-spacing: 0.01em;
  font-family: inherit;
  transition: gap 0.25s ease;
}
.hero-scroll:hover { gap: 0.75rem; }
.hero-scroll svg { transition: transform 0.25s ease; }
.hero-scroll:hover svg { transform: translateY(3px); }

/* ── Right ────────────────────────────────────────── */
.hero-right {
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  height: 100%;
}

.hero-img {
  width: 100%;
  max-width: 820px;
  height: auto;
  object-fit: contain;
  display: block;
  mix-blend-mode: multiply;
  /* Slight upward offset so image feels anchored at the top */
  margin-bottom: -4px;
}

/* ── Responsive ───────────────────────────────────── */
@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 48% 52%; }
  .hero-heading { font-size: clamp(2.75rem, 5vw, 3.75rem); }
}

@media (max-width: 768px) {
  .hero {
    padding: 2.5rem 5%;
  }
  .hero-inner { grid-template-columns: 1fr; gap: 2rem; }
  .hero-left  { padding-right: 0; padding-bottom: 0; }
  .hero-img   { max-width: 100%; }
}
</style>
