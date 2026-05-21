<template>
  <section class="cq-hero">
    <div class="cq-hero-left">
      <div class="cq-badge">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="#009387" stroke="none"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 5.25-8 5.25V7a2 2 0 10-4 0v2S2 9 2 20a2 2 0 002 2c3.13 0 5-2.46 5-2.46A14.18 14.18 0 0117 8z"/></svg>
        Smarter choices. Lower impact.
      </div>
      <h1 class="cq-hero-h">
        Every Choice<br>
        <span class="cq-script">Changes</span> Everything.
      </h1>
      <p class="cq-hero-sub">Make confident clothing decisions that save you money and reduce waste.</p>
    </div>

    <div class="cq-hero-right">
      <div class="cq-circle-soft"></div>
      <div class="cq-dash-ring cq-dash-ring-1"></div>
      <div class="cq-dash-ring cq-dash-ring-2"></div>
      <img src="/clothing-rack.png" alt="Clothing rack" class="cq-hero-img" />
      <div class="cq-leaf-pin">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#009387" stroke="none"><path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 5.25-8 5.25V7a2 2 0 10-4 0v2S2 9 2 20a2 2 0 002 2c3.13 0 5-2.46 5-2.46A14.18 14.18 0 0117 8z"/></svg>
      </div>
    </div>
  </section>
</template>

<style scoped>
.cq-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto 2rem;
  min-height: 340px;
}

.cq-hero-left {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.cq-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(0, 147, 135, 0.1);
  color: #009387;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.375rem 0.9rem;
  border-radius: 999px;
  width: fit-content;
}

.cq-hero-h {
  font-size: clamp(2rem, 3.75vw, 3rem);
  font-weight: 800;
  color: #111;
  line-height: 1.15;
  margin: 0;
  letter-spacing: -0.03em;
}

.cq-script {
  font-family: 'Covered By Your Grace', cursive;
  font-weight: 400;
  color: #009387;
  font-size: 1.12em;
}

.cq-hero-sub {
  font-size: 1rem;
  color: #555;
  line-height: 1.65;
  margin: 0;
  max-width: 36ch;
}

.cq-hero-right {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 360px;
}

.cq-circle-soft {
  position: absolute;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(0, 147, 135, 0.06);
  top: 50%;
  right: -10px;
  transform: translateY(-50%);
  pointer-events: none;
}

.cq-dash-ring {
  position: absolute;
  border-radius: 50%;
  border: 1.5px dashed rgba(0, 147, 135, 0.2);
  pointer-events: none;
}
.cq-dash-ring-1 { width: 340px; height: 340px; top: 50%; right: -30px; transform: translateY(-50%); }
.cq-dash-ring-2 { width: 80px; height: 80px; bottom: 30px; right: 40px; }

.cq-hero-img {
  position: relative;
  z-index: 1;
  width: 90%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
  border-radius: 1.25rem;
  display: block;
}

.cq-leaf-pin {
  position: absolute;
  top: 0.5rem;
  right: 0.25rem;
  z-index: 2;
  width: 2.5rem;
  height: 2.5rem;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

@media (max-width: 900px) {
  .cq-hero { grid-template-columns: 1fr; min-height: auto; }
  .cq-hero-right { height: 220px; }
}
</style>
