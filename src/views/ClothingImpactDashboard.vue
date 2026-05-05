<template>
  <div style="width:100%; background:#fff;">

    <!-- SECTION 1: HERO -->
    <section style="position:relative; overflow:hidden; background:#f9fafb;">
      <div style="display:grid; grid-template-columns:1fr 1fr; align-items:center;">
        <div style="padding:6rem 4rem 6rem 5rem;">
          <h1 style="font-size:4rem; font-weight:800; color:#111827; line-height:1.1; margin:0 0 1.5rem;">
            Fashion feels cheap.
            <span style="display:block; color:#16a34a; margin-top:0.5rem;">The impact isn't.</span>
          </h1>
          <h2 style="font-size:1.5rem; font-weight:600; color:#374151; margin:0 0 1rem;">
            Clothes don't wear out, attention does.
          </h2>
          <p style="font-size:0.875rem; color:#6b7280; line-height:1.75; max-width:36rem; margin:0 0 2rem;">
            Most garments are discarded long before their usable life ends.
          </p>
          <div style="display:flex; gap:1rem; flex-wrap:wrap;">
            <button @click="showAnalyzer = true"
              style="background:linear-gradient(to right, #16a34a, #059669); color:white; padding:1rem 2rem; border-radius:0.75rem; font-weight:600; font-size:1rem; border:none; cursor:pointer; display:flex; align-items:center; gap:0.5rem; transition:transform 0.2s, box-shadow 0.2s;"
              onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.2)'"
              onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
              Analyze Lifetime Value
              <svg style="width:1.25rem; height:1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <button
              style="border:2px solid #d1d5db; color:#374151; padding:1rem 2rem; border-radius:0.75rem; font-weight:600; font-size:1rem; background:white; cursor:pointer; transition:all 0.2s;"
              onmouseover="this.style.borderColor='#16a34a'; this.style.color='#16a34a'; this.style.background='#f0fdf4'"
              onmouseout="this.style.borderColor='#d1d5db'; this.style.color='#374151'; this.style.background='white'">
              Explore Smarter Choices
            </button>
          </div>
        </div>
        <div style="position:relative; min-height:500px;">
          <img :src="wardrobeImg" alt="Overflowing wardrobe"
            style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover;" />
          <div
            style="position:absolute; inset-block:0; left:0; width:8rem; background:linear-gradient(to right, #f9fafb, rgba(249,250,251,0.5), transparent); pointer-events:none;">
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 2: IMPACT SNAPSHOT -->
    <section style="max-width:80rem; margin:0 auto; padding:4rem 1.5rem;">
      <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:1.5rem;">
        <div v-for="(card, idx) in impactCards" :key="idx"
          style="position:relative; background:white; border-radius:1.5rem; padding:2rem; border:1px solid #e5e7eb; overflow:hidden; cursor:pointer; transition:transform 0.3s, box-shadow 0.3s;"
          onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.12)'"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
          <div
            :style="{ position: 'absolute', top: 0, right: 0, width: '8rem', height: '8rem', background: card.bgGradient, opacity: 0.15, borderRadius: '50%', marginRight: '-4rem', marginTop: '-4rem' }">
          </div>
          <div style="position:relative; z-index:1;">
            <div
              :style="{ display: 'inline-flex', padding: '0.75rem', borderRadius: '0.75rem', background: card.iconBg, marginBottom: '1rem' }">
              <span style="font-size:1.5rem;">{{ card.emoji }}</span>
            </div>
            <div style="margin-bottom:0.75rem;">
              <div style="font-size:2.5rem; font-weight:800; color:#111827;">{{ card.number }}</div>
              <div style="font-size:0.875rem; font-weight:600; color:#374151;">{{ card.unit }}</div>
            </div>
            <p style="font-size:0.875rem; color:#6b7280; line-height:1.6;">{{ card.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 3: PERSONAL IMPACT SLIDER -->
    <section style="background:linear-gradient(135deg, #f0fdf4, #ecfdf5, #f0fdfa); padding:5rem 0;">
      <div style="max-width:56rem; margin:0 auto; padding:0 1.5rem;">
        <div style="text-align:center; margin-bottom:3rem;">
          <h2 style="font-size:2.75rem; font-weight:800; color:#111827; margin:0 0 1rem;">
            Your wardrobe tells a story.
            <span style="display:block; color:#16a34a; margin-top:0.5rem;">Not a good one.</span>
          </h2>
          <p style="font-size:1.125rem; color:#4b5563; margin:0;">
            If you buy <strong>{{ itemsPerMonth }}</strong> clothing items per month ({{ impact.itemsYear }} per year),
            <strong>{{ impact.unusedItems }}</strong> may never be fully used.
          </p>
        </div>
        <div
          style="background:white; border-radius:2rem; box-shadow:0 25px 50px rgba(0,0,0,0.1); padding:3rem; border:1px solid #e5e7eb;">
          <div style="margin-bottom:2rem;">
            <label style="display:block; font-size:1.125rem; font-weight:600; color:#111827; margin-bottom:1rem;">How
              many clothes do you buy per month?</label>
            <input type="range" min="0" max="10" v-model.number="itemsPerMonth"
              style="width:100%; height:0.75rem; border-radius:9999px; appearance:none; cursor:pointer; outline:none;"
              :style="`background: linear-gradient(to right, #86efac 0%, #16a34a ${(itemsPerMonth / 10) * 100}%, #e5e7eb ${(itemsPerMonth / 10) * 100}%, #e5e7eb 100%)`" />
            <div
              style="display:flex; justify-content:space-between; font-size:0.875rem; color:#6b7280; margin-top:0.5rem;">
              <span>0</span>
              <span style="font-size:1.5rem; font-weight:800; color:#16a34a;">{{ itemsPerMonth }}</span>
              <span>10</span>
            </div>
          </div>
          <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:1.5rem;">
            <div
              style="background:linear-gradient(135deg, #fef2f2, #fff7ed); border-radius:1rem; padding:1.5rem; border:1px solid #fecaca;">
              <div style="font-size:0.875rem; color:#dc2626; font-weight:600; margin-bottom:0.5rem;">Estimated Waste
              </div>
              <div style="font-size:1.875rem; font-weight:800; color:#111827;">{{ impact.unusedItems }} items</div>
              <div style="font-size:0.75rem; color:#6b7280; margin-top:0.25rem;">Never fully used</div>
            </div>
            <div
              style="background:linear-gradient(135deg, #fffbeb, #fefce8); border-radius:1rem; padding:1.5rem; border:1px solid #fde68a;">
              <div style="font-size:0.875rem; color:#d97706; font-weight:600; margin-bottom:0.5rem;">Money Lost</div>
              <div style="font-size:1.875rem; font-weight:800; color:#111827;">${{ impact.moneyLost }}</div>
              <div style="font-size:0.75rem; color:#6b7280; margin-top:0.25rem;">On unused items</div>
            </div>
            <div :style="impactLevelCard">
              <div :style="impactLevelLabel">Environmental Impact</div>
              <div style="font-size:1.875rem; font-weight:800; color:#111827;">{{ impact.impactLevel }}</div>
              <div style="font-size:0.75rem; color:#6b7280; margin-top:0.25rem;">Overall rating</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 4: WHY THIS HAPPENS -->
    <section style="max-width:80rem; margin:0 auto; padding:5rem 1.5rem;">
      <div style="text-align:center; margin-bottom:4rem;">
        <h2 style="font-size:2.75rem; font-weight:800; color:#111827; margin:0 0 1rem;">Why this happens</h2>
        <p style="font-size:1.125rem; color:#6b7280; max-width:32rem; margin:0 auto;">Understanding the problem is the
          first step to solving it.</p>
      </div>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:2rem;">
        <div v-for="item in whyThisHappens" :key="item.title"
          style="background:white; border-radius:1.5rem; padding:2rem; border:1px solid #e5e7eb; transition:box-shadow 0.3s, transform 0.3s;"
          onmouseover="this.style.boxShadow='0 20px 40px rgba(0,0,0,0.12)'; this.style.transform='translateY(-4px)'"
          onmouseout="this.style.boxShadow='none'; this.style.transform='none'">
          <div
            :style="{ display: 'inline-flex', padding: '1rem', borderRadius: '1rem', background: item.gradient, marginBottom: '1.5rem' }">
            <span style="font-size:1.875rem;">{{ item.emoji }}</span>
          </div>
          <h3 style="font-size:1.5rem; font-weight:800; color:#111827; margin:0 0 0.75rem;">{{ item.title }}</h3>
          <p style="color:#6b7280; line-height:1.7; margin:0;">{{ item.description }}</p>
        </div>
      </div>
    </section>

    <!-- SECTION 5: SMART DECISION ENGINE DEMO -->
    <section style="background:#f9fafb; padding:5rem 0;">
      <div style="max-width:56rem; margin:0 auto; padding:0 1.5rem;">
        <div style="text-align:center; margin-bottom:3rem;">
          <h2 style="font-size:2.75rem; font-weight:800; color:#111827; margin:0 0 1rem;">Before you buy, know this.
          </h2>
          <p style="font-size:1.125rem; color:#6b7280; margin:0;">Our AI analyzes your wardrobe to help you make smarter
            decisions.</p>
        </div>
        <div
          style="background:white; border-radius:2rem; box-shadow:0 25px 50px rgba(0,0,0,0.1); overflow:hidden; border:1px solid #e5e7eb;">
          <div style="display:grid; grid-template-columns:1fr 1fr;">
            <div
              style="background:linear-gradient(135deg, #dbeafe, #e0e7ff); padding:3rem; display:flex; align-items:center; justify-content:center;">
              <div style="font-size:6rem;">🧥</div>
            </div>
            <div style="padding:2.5rem;">
              <div style="margin-bottom:1.5rem;">
                <h3 style="font-size:1.875rem; font-weight:800; color:#111827; margin:0 0 0.5rem;">Denim Jacket</h3>
                <div style="display:flex; align-items:center; gap:0.75rem;">
                  <div style="font-size:1.5rem; font-weight:800; color:#111827;">$89</div>
                  <div
                    style="background:#fee2e2; color:#b91c1c; padding:0.25rem 0.75rem; border-radius:9999px; font-size:0.875rem; font-weight:600;">
                    Not Recommended</div>
                </div>
              </div>
              <div style="margin-bottom:2rem;">
                <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.75rem;">
                  <span style="font-size:0.875rem; font-weight:600; color:#374151;">Smart Score</span>
                  <span style="font-size:1.875rem; font-weight:800; color:#f97316;">62/100</span>
                </div>
                <div style="height:0.75rem; background:#e5e7eb; border-radius:9999px; overflow:hidden;">
                  <div
                    style="height:100%; background:linear-gradient(to right, #fb923c, #fbbf24); border-radius:9999px; width:62%;">
                  </div>
                </div>
              </div>
              <div style="display:flex; flex-direction:column; gap:1rem; margin-bottom:2rem;">
                <div v-for="rating in smartRatings" :key="rating.label"
                  style="display:flex; align-items:center; justify-content:space-between;">
                  <span style="color:#374151;">{{ rating.label }}</span>
                  <div style="display:flex; gap:2px;">
                    <span v-for="i in 5" :key="i" style="font-size:0.875rem;"
                      :style="{ color: i <= rating.stars ? rating.color : '#d1d5db' }">★</span>
                  </div>
                </div>
              </div>
              <div
                style="background:#fffbeb; border:1px solid #fde68a; border-radius:0.75rem; padding:1rem; margin-bottom:1.5rem;">
                <p style="font-size:0.875rem; color:#78350f; font-weight:500; margin:0;">You already own 3 similar
                  items. Consider reusing instead of buying.</p>
              </div>
              <button
                style="width:100%; background:#16a34a; color:white; padding:1rem; border-radius:0.75rem; font-weight:600; border:none; cursor:pointer; transition:background 0.2s;"
                onmouseover="this.style.background='#15803d'" onmouseout="this.style.background='#16a34a'">
                See Better Alternatives
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 6: ACTIONABLE STEPS -->
    <section style="max-width:56rem; margin:0 auto; padding:5rem 1.5rem;">
      <div style="text-align:center; margin-bottom:3rem;">
        <h2 style="font-size:2.75rem; font-weight:800; color:#111827; margin:0 0 1rem;">What You Can Do Today</h2>
        <p style="font-size:1.125rem; color:#6b7280; margin:0;">Small changes compound into massive impact over time.
        </p>
      </div>

      <div
        style="background:white; border-radius:2rem; box-shadow:0 25px 50px rgba(0,0,0,0.1); padding:2.5rem; border:1px solid #e5e7eb;">
        <div style="display:flex; flex-direction:column; gap:1.5rem;">
          <div v-for="(step, idx) in actionableSteps" :key="idx"
            style="display:flex; align-items:center; gap:1rem; padding:1rem; border-radius:0.75rem; cursor:pointer; transition:background 0.2s;"
            onmouseover="this.style.background='#f0fdf4'" onmouseout="this.style.background='transparent'">
            <div
              style="flex-shrink:0; width:2rem; height:2rem; background:#dcfce7; border-radius:50%; display:flex; align-items:center; justify-content:center; transition:background 0.2s;">
              <svg style="width:1.25rem; height:1.25rem; color:#16a34a;" fill="none" stroke="#16a34a"
                viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div style="flex:1;">
              <p style="font-size:1.125rem; font-weight:500; color:#111827; margin:0;">{{ step }}</p>
            </div>
            <div style="font-size:1.875rem; font-weight:800; color:#d1d5db;">{{ idx + 1 }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION 7: FINAL CTA -->
    <section
      style="position:relative; overflow:hidden; background:linear-gradient(135deg, #111827, #14532d, #064e3b); padding:6rem 0;">
      <div style="position:relative; z-index:1; max-width:48rem; margin:0 auto; padding:0 1.5rem; text-align:center;">
        <h2 style="font-size:3.5rem; font-weight:800; color:white; margin:0 0 1.5rem; line-height:1.1;">Your next
          purchase decides the future.</h2>
        <p
          style="font-size:1.25rem; color:#a7f3d0; margin:0 0 3rem; max-width:36rem; margin-left:auto; margin-right:auto;">
          Small changes today create long-term impact. Join thousands making better choices.</p>
        <button @click="showAnalyzer = true"
          style="background:white; color:#111827; padding:1.25rem 2.5rem; border-radius:0.75rem; font-weight:700; font-size:1.125rem; border:none; cursor:pointer; display:inline-flex; align-items:center; gap:0.75rem; transition:transform 0.2s, box-shadow 0.2s;"
          onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 20px 40px rgba(0,0,0,0.3)'"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='none'">
          Start Making Better Choices
          <svg style="width:1.5rem; height:1.5rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        <div
          style="margin-top:3rem; display:flex; align-items:center; justify-content:center; gap:3rem; color:#a7f3d0;">
          <div>
            <div style="font-size:1.875rem; font-weight:800; color:white;">12,453</div>
            <div style="font-size:0.875rem;">Users joined</div>
          </div>
          <div style="width:1px; height:3rem; background:#166534;"></div>
          <div>
            <div style="font-size:1.875rem; font-weight:800; color:white;">$2.4M</div>
            <div style="font-size:0.875rem;">Money saved</div>
          </div>
          <div style="width:1px; height:3rem; background:#166534;"></div>
          <div>
            <div style="font-size:1.875rem; font-weight:800; color:white;">89k</div>
            <div style="font-size:0.875rem;">Items reused</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Modals -->
    <LifetimeValueAnalyzer :is-open="showAnalyzer" @close="showAnalyzer = false" />
    <PurchaseHelpChatbot />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import LifetimeValueAnalyzer from '../components/LifetimeValueAnalyzer.vue'
import PurchaseHelpChatbot from '../components/PurchaseHelpChatbot.vue'
import wardrobeImg from '../assets/wardrobe.png'

const itemsPerMonth = ref(2)
const showAnalyzer = ref(false)

const impact = computed(() => {
  const itemsYear = itemsPerMonth.value * 12
  const unusedItems = Math.round(itemsYear * 0.6)
  const moneyLost = unusedItems * 40
  const impactLevel = itemsYear > 15 ? 'High' : itemsYear > 8 ? 'Medium' : 'Low'
  return { unusedItems, moneyLost, impactLevel, itemsYear }
})

const impactLevelCard = computed(() => {
  if (impact.value.impactLevel === 'High') return { background: 'linear-gradient(135deg, #fef2f2, #fee2e2)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #fca5a5' }
  if (impact.value.impactLevel === 'Medium') return { background: 'linear-gradient(135deg, #fffbeb, #fef3c7)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #fde68a' }
  return { background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', borderRadius: '1rem', padding: '1.5rem', border: '1px solid #86efac' }
})

const impactLevelLabel = computed(() => {
  const color = impact.value.impactLevel === 'High' ? '#dc2626' : impact.value.impactLevel === 'Medium' ? '#d97706' : '#16a34a'
  return { fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', color }
})

const impactCards = [
  {
    emoji: '⏰', number: '200+', unit: 'Years',
    description: 'Takes to decompose in landfill',
    bgGradient: 'linear-gradient(135deg, #ef4444, #f97316)',
    iconBg: 'linear-gradient(135deg, #fee2e2, #ffedd5)',
  },
  {
    emoji: '📈', number: '60%', unit: 'More Clothing',
    description: 'Bought vs 15 years ago',
    bgGradient: 'linear-gradient(135deg, #f97316, #f59e0b)',
    iconBg: 'linear-gradient(135deg, #ffedd5, #fef3c7)',
  },
  {
    emoji: '👕', number: 'Only 7', unit: 'Wears',
    description: 'Average usage before disposal',
    bgGradient: 'linear-gradient(135deg, #f59e0b, #eab308)',
    iconBg: 'linear-gradient(135deg, #fef3c7, #fef9c3)',
  },
  {
    emoji: '♻️', number: '20%', unit: 'Recycled',
    description: 'Most clothing ends in landfill',
    bgGradient: 'linear-gradient(135deg, #22c55e, #10b981)',
    iconBg: 'linear-gradient(135deg, #dcfce7, #d1fae5)',
  },
]

const whyThisHappens = [
  {
    emoji: '🛍️', title: 'Impulse Buying',
    description: 'You buy more than you actually need.',
    gradient: 'linear-gradient(135deg, #a855f7, #ec4899)',
  },
  {
    emoji: '⚡', title: 'Fast Fashion Cycle',
    description: 'Trends change faster than usage.',
    gradient: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
  },
  {
    emoji: '🧠', title: 'Low Awareness',
    description: 'The real impact is invisible at purchase.',
    gradient: 'linear-gradient(135deg, #22c55e, #14b8a6)',
  },
]

const actionableSteps = [
  'Wear each item at least 30 times',
  'Wait 48 hours before impulse buying',
  'Repair instead of replacing',
  'Resell or donate unused items',
  'Choose quality over quantity',
]

const smartRatings = [
  { label: 'Health Impact', stars: 4, color: '#22c55e' },
  { label: 'Price Efficiency', stars: 2, color: '#f59e0b' },
  { label: 'Longevity', stars: 3, color: '#3b82f6' },
  { label: 'Waste Impact', stars: 1, color: '#ef4444' },
]
</script>
