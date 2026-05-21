<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const cards = [
  {
    category: 'RECIPES',
    bg: '#faf5ec',
    img: new URL('@/assets/Wel_card_recipes.png', import.meta.url).href,
    route: '/food/recipes',
  },
  {
    category: 'DECODE YOUR WARDROBE',
    bg: '#edf5f2',
    img: new URL('@/assets/Wel_card_wardrobe.png', import.meta.url).href,
    route: '/clothing/textiledecode',
  },
  {
    category: 'PRODUCT JOURNEY',
    bg: '#f0eeff',
    img: new URL('@/assets/Wel_card_journey.png', import.meta.url).href,
    route: '/household/journey',
  },
  {
    category: 'CLOTHING CALCULATOR',
    bg: '#faf5ec',
    img: new URL('@/assets/Wel_card_calculator.png', import.meta.url).href,
    route: '/clothing/analyzer',
  },
]
</script>

<template>
  <section class="features">
    <div class="features-inner">

      <!-- Section header -->
      <div class="features-header">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="#009387" stroke="none">
          <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 5.25-8 5.25V7a2 2 0 10-4 0v2S2 9 2 20a2 2 0 002 2c3.13 0 5-2.46 5-2.46A14.18 14.18 0 0117 8z"/>
        </svg>
        <span>Explore what matters to you</span>
      </div>

      <!-- Cards grid -->
      <div class="cards">
        <div
          v-for="card in cards"
          :key="card.category"
          class="card"
          :style="{ background: card.bg }"
          @click="router.push(card.route)"
        >
          <img :src="card.img" :alt="card.category" class="card-img" />
        </div>
      </div>

    </div>
  </section>
</template>

<style scoped>
/* Outer page band — barely-there neutral, transitions from hero naturally */
.features {
  width: 100%;
  background: #f4fdf9;
  padding: clamp(40px, 5vw, 72px) 5%;
  box-sizing: border-box;
}

/* Container — lifted card on white, defined only by shadow */
.features-inner {
  background: #ffffff;
  border-radius: 1.5rem;
  padding: clamp(28px, 3vw, 44px) clamp(24px, 3vw, 44px);
  max-width: 1400px;
  margin: 0 auto;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow:
    0 2px 8px rgba(0,0,0,0.04),
    0 8px 32px rgba(0,0,0,0.07);
}

/* Header */
.features-header {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  font-size: 0.9rem;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 1.5rem;
}

/* Grid */
.cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.875rem;
}

/* Card */
.card {
  border-radius: 1.125rem;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.25s cubic-bezier(0.16,1,0.3,1), box-shadow 0.25s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0 18px 44px rgba(0,0,0,0.11);
}

/* Image fills whole card */
.card-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
  display: block;
}

/* Responsive */
@media (max-width: 1100px) {
  .cards { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 600px) {
  .cards { grid-template-columns: 1fr; }
}
</style>
