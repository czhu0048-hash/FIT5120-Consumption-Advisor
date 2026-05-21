<template>
  <section class="cq-stats">
    <div class="cq-stat">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#009387" stroke-width="2" stroke-linecap="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/></svg>
      <div><strong>Reduce waste</strong><span>Make choices that matter</span></div>
    </div>
    <div class="cq-stat">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#009387" stroke-width="2" stroke-linecap="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
      <div><strong>Save money</strong><span>Spend smarter, not more</span></div>
    </div>
    <div class="cq-stat">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#009387" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
      <div><strong>Extend lifespan</strong><span>Get more from what you own</span></div>
    </div>
    <div class="cq-stat">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#009387" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg>
      <div><strong>Lower impact</strong><span>For a better planet</span></div>
    </div>
  </section>
</template>

<style scoped>
.cq-stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  border-top: 1px solid #b2e0dc;
  max-width: 100%;
  margin-top: 2.5rem;
}

.cq-stat {
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 1.5rem 1rem;
  border-right: 1px solid #b2e0dc;
}
.cq-stat:last-child { border-right: none; }

.cq-stat div { display: flex; flex-direction: column; gap: 0.2rem; }
.cq-stat strong { font-size: 0.875rem; font-weight: 700; color: #1a1a1a; }
.cq-stat span { font-size: 0.75rem; color: #777; }

@media (max-width: 900px) {
  .cq-stats { grid-template-columns: repeat(2, 1fr); }
  .cq-stat:nth-child(2) { border-right: none; }
  .cq-stat:nth-child(3) { border-top: 1px solid #b2e0dc; }
  .cq-stat:nth-child(4) { border-top: 1px solid #b2e0dc; border-right: none; }
}
</style>
