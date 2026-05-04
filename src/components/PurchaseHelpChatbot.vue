<template>
  <div style="position:fixed; bottom:2rem; right:2rem; z-index:1000;">

    <!-- Floating button (closed) -->
    <div v-if="!isOpen" style="position:relative;">
      <button
        @click="isOpen = true"
        style="background:#16a34a; color:white; border-radius:50%; width:4rem; height:4rem; border:none; cursor:pointer; box-shadow:0 8px 24px rgba(22,163,74,0.5); display:flex; align-items:center; justify-content:center; animation:chatbounce 2s ease-in-out infinite; transition:transform 0.2s;"
        onmouseover="this.style.transform='scale(1.1)'; this.style.animationPlayState='paused'"
        onmouseout="this.style.transform='scale(1)'; this.style.animationPlayState='running'"
        aria-label="Open shopping assistant">
        <svg style="width:1.75rem; height:1.75rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
        </svg>
        <span style="position:absolute; top:-4px; right:-4px; background:#ef4444; color:white; font-size:0.75rem; font-weight:700; border-radius:50%; width:1.5rem; height:1.5rem; display:flex; align-items:center; justify-content:center; animation:pulse 2s infinite;">!</span>
      </button>
      <!-- Tooltip -->
      <div style="position:absolute; bottom:calc(100% + 0.5rem); right:0; background:#111827; color:white; font-size:0.875rem; padding:0.5rem 0.75rem; border-radius:0.5rem; white-space:nowrap; pointer-events:none;">
        Need help with a purchase?
        <div style="position:absolute; top:100%; right:1rem; width:0; height:0; border-left:4px solid transparent; border-right:4px solid transparent; border-top:4px solid #111827;"></div>
      </div>
    </div>

    <!-- Chat popup (open) -->
    <div v-else style="background:white; border-radius:1.5rem; box-shadow:0 25px 50px rgba(0,0,0,0.25); width:24rem; overflow:hidden; border:1px solid #e5e7eb; max-height:600px; display:flex; flex-direction:column;">

      <!-- Header -->
      <div style="background:white; border-bottom:1px solid #f3f4f6; padding:1rem 1.25rem; display:flex; align-items:center; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <div style="background:#dcfce7; border-radius:50%; padding:0.5rem; display:flex; align-items:center; justify-content:center;">
            <svg style="width:1.25rem; height:1.25rem; color:#16a34a;" fill="none" stroke="#16a34a" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
            </svg>
          </div>
          <div>
            <h3 style="font-weight:700; color:#111827; margin:0; font-size:0.9375rem;">Shopping Assistant</h3>
            <p style="font-size:0.75rem; color:#6b7280; margin:0;">{{ headerSubtitle }}</p>
          </div>
        </div>
        <button @click="handleClose"
          style="background:none; border:none; cursor:pointer; padding:0.25rem; border-radius:50%; color:#9ca3af; transition:background 0.2s;"
          onmouseover="this.style.background='#f3f4f6'; this.style.color='#374151'"
          onmouseout="this.style.background='none'; this.style.color='#9ca3af'">
          <svg style="width:1.25rem; height:1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"/>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <div style="padding:1.5rem; overflow-y:auto; flex:1;">

        <!-- STEP 0: Initial -->
        <template v-if="step === 0">
          <div style="background:#f9fafb; border-radius:0.75rem; padding:1rem; margin-bottom:1rem; border:1px solid #e5e7eb;">
            <p style="color:#374151; line-height:1.6; margin:0; font-size:0.9375rem;">
              Planning to buy new clothing? I can help you decide if it's the right purchase and find smarter alternatives!
            </p>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            <button @click="step = 1"
              style="width:100%; background:#16a34a; color:white; font-weight:600; padding:0.875rem 1rem; border-radius:0.75rem; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:0.5rem; transition:background 0.2s; font-size:0.9375rem;"
              onmouseover="this.style.background='#15803d'" onmouseout="this.style.background='#16a34a'">
              Yes, help me decide
              <svg style="width:1.25rem; height:1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </button>
            <button @click="handleClose"
              style="width:100%; background:#f3f4f6; color:#374151; font-weight:600; padding:0.875rem 1rem; border-radius:0.75rem; border:none; cursor:pointer; transition:background 0.2s; font-size:0.9375rem;"
              onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">
              Not right now
            </button>
          </div>
          <p style="font-size:0.75rem; color:#9ca3af; text-align:center; margin:1rem 0 0;">Make smarter, more sustainable choices</p>
        </template>

        <!-- STEP 1: Choose clothing type -->
        <template v-else-if="step === 1">
          <div style="background:#f9fafb; border-radius:0.75rem; padding:1rem; margin-bottom:1rem; border:1px solid #e5e7eb;">
            <p style="color:#374151; line-height:1.6; margin:0; font-size:0.9375rem;">Great! What type of clothing are you thinking of buying?</p>
          </div>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.75rem; margin-bottom:1rem;">
            <button v-for="type in clothingTypes" :key="type.id" @click="selectType(type)"
              style="background:white; border:1px solid #e5e7eb; border-radius:0.75rem; padding:1rem; cursor:pointer; text-align:center; transition:all 0.2s;"
              onmouseover="this.style.borderColor='#16a34a'; this.style.boxShadow='0 4px 12px rgba(22,163,74,0.15)'"
              onmouseout="this.style.borderColor='#e5e7eb'; this.style.boxShadow='none'">
              <div style="font-size:2rem; margin-bottom:0.5rem;">{{ type.emoji }}</div>
              <div style="font-size:0.875rem; font-weight:600; color:#374151;">{{ type.name }}</div>
            </button>
          </div>
          <button @click="step = 0"
            style="width:100%; background:#f3f4f6; color:#374151; font-weight:500; padding:0.75rem 1rem; border-radius:0.75rem; border:none; cursor:pointer; font-size:0.875rem; transition:background 0.2s;"
            onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">
            Back
          </button>
        </template>

        <!-- STEP 2: Questionnaire -->
        <template v-else-if="step === 2">
          <div style="background:#f0fdf4; border-radius:0.75rem; padding:0.875rem 1rem; margin-bottom:1.25rem; border:1px solid #bbf7d0;">
            <p style="color:#374151; margin:0; font-size:0.9375rem;">
              You selected: <strong>{{ selectedType.emoji }} {{ selectedType.name }}</strong>
            </p>
          </div>

          <!-- Q1: How often will you wear it -->
          <div style="margin-bottom:1.25rem;">
            <p style="font-size:0.875rem; font-weight:600; color:#111827; margin:0 0 0.5rem;">How often will you wear it?</p>
            <div style="display:flex; flex-direction:column; gap:0.5rem;">
              <label v-for="opt in wearFrequencyOptions" :key="opt.value"
                style="display:flex; align-items:center; gap:0.75rem; padding:0.625rem 0.875rem; border-radius:0.625rem; border:1px solid #e5e7eb; cursor:pointer; transition:all 0.2s;"
                :style="q1 === opt.value ? 'border-color:#16a34a; background:#f0fdf4;' : 'background:white;'">
                <input type="radio" v-model="q1" :value="opt.value" style="accent-color:#16a34a;" />
                <span style="font-size:0.875rem; color:#374151;">{{ opt.label }}</span>
              </label>
            </div>
          </div>

          <!-- Q2: Do you already own something similar -->
          <div style="margin-bottom:1.25rem;">
            <p style="font-size:0.875rem; font-weight:600; color:#111827; margin:0 0 0.5rem;">Do you already own something similar?</p>
            <div style="display:flex; gap:0.75rem;">
              <button @click="q2 = 'yes'"
                :style="q2 === 'yes' ? 'flex:1; padding:0.625rem; border-radius:0.625rem; border:2px solid #16a34a; background:#f0fdf4; color:#16a34a; font-weight:600; cursor:pointer; font-size:0.875rem;' : 'flex:1; padding:0.625rem; border-radius:0.625rem; border:1px solid #e5e7eb; background:white; color:#374151; font-weight:500; cursor:pointer; font-size:0.875rem;'">
                Yes
              </button>
              <button @click="q2 = 'no'"
                :style="q2 === 'no' ? 'flex:1; padding:0.625rem; border-radius:0.625rem; border:2px solid #16a34a; background:#f0fdf4; color:#16a34a; font-weight:600; cursor:pointer; font-size:0.875rem;' : 'flex:1; padding:0.625rem; border-radius:0.625rem; border:1px solid #e5e7eb; background:white; color:#374151; font-weight:500; cursor:pointer; font-size:0.875rem;'">
                No
              </button>
            </div>
          </div>

          <!-- Q3: Budget -->
          <div style="margin-bottom:1.5rem;">
            <p style="font-size:0.875rem; font-weight:600; color:#111827; margin:0 0 0.5rem;">What's your budget?</p>
            <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
              <button v-for="b in budgetOptions" :key="b" @click="q3 = b"
                :style="q3 === b ? 'padding:0.375rem 0.75rem; border-radius:9999px; border:2px solid #16a34a; background:#f0fdf4; color:#16a34a; font-weight:600; cursor:pointer; font-size:0.8125rem;' : 'padding:0.375rem 0.75rem; border-radius:9999px; border:1px solid #e5e7eb; background:white; color:#374151; cursor:pointer; font-size:0.8125rem;'">
                {{ b }}
              </button>
            </div>
          </div>

          <button @click="submitQuestionnaire" :disabled="!q1 || !q2 || !q3"
            style="width:100%; background:#16a34a; color:white; font-weight:600; padding:0.875rem 1rem; border-radius:0.75rem; border:none; cursor:pointer; font-size:0.9375rem; transition:background 0.2s; margin-bottom:0.75rem;"
            :style="(!q1 || !q2 || !q3) ? 'opacity:0.5; cursor:not-allowed;' : ''"
            onmouseover="if(this.style.opacity !== '0.5') this.style.background='#15803d'" onmouseout="this.style.background='#16a34a'">
            Get My Recommendation
          </button>
          <button @click="step = 1"
            style="width:100%; background:#f3f4f6; color:#374151; font-weight:500; padding:0.75rem 1rem; border-radius:0.75rem; border:none; cursor:pointer; font-size:0.875rem;"
            onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">
            Back
          </button>
        </template>

        <!-- STEP 3: Result -->
        <template v-else-if="step === 3">
          <div :style="resultCard.style" style="border-radius:0.75rem; padding:1rem; margin-bottom:1.25rem;">
            <div style="font-size:1.5rem; margin-bottom:0.5rem;">{{ resultCard.icon }}</div>
            <p style="font-weight:700; color:#111827; margin:0 0 0.5rem; font-size:1rem;">{{ resultCard.title }}</p>
            <p style="font-size:0.875rem; color:#374151; margin:0; line-height:1.6;">{{ resultCard.message }}</p>
          </div>
          <div style="background:#f9fafb; border-radius:0.75rem; padding:1rem; margin-bottom:1.25rem; border:1px solid #e5e7eb;">
            <p style="font-size:0.8125rem; color:#6b7280; margin:0; line-height:1.6;">
              For a full lifetime value analysis of your <strong>{{ selectedType.name }}</strong>, use the Analyze Lifetime Value tool above.
            </p>
          </div>
          <div style="display:flex; flex-direction:column; gap:0.75rem;">
            <button @click="handleRestart"
              style="width:100%; background:#16a34a; color:white; font-weight:600; padding:0.875rem 1rem; border-radius:0.75rem; border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; gap:0.5rem; font-size:0.9375rem;"
              onmouseover="this.style.background='#15803d'" onmouseout="this.style.background='#16a34a'">
              Start New Analysis
              <svg style="width:1.25rem; height:1.25rem;" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </button>
            <button @click="handleClose"
              style="width:100%; background:#f3f4f6; color:#374151; font-weight:500; padding:0.875rem 1rem; border-radius:0.75rem; border:none; cursor:pointer; font-size:0.9375rem;"
              onmouseover="this.style.background='#e5e7eb'" onmouseout="this.style.background='#f3f4f6'">
              Close
            </button>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const isOpen = ref(false)
const step = ref(0)
const selectedType = ref(null)
const q1 = ref('')
const q2 = ref('')
const q3 = ref('')

const clothingTypes = [
  { id: 'tshirt', name: 'T-Shirt', emoji: '👕' },
  { id: 'trouser', name: 'Trouser/Jeans', emoji: '👖' },
  { id: 'jacket', name: 'Jacket/Coat', emoji: '🧥' },
  { id: 'dress', name: 'Dress', emoji: '👗' },
  { id: 'shoes', name: 'Shoes', emoji: '👟' },
  { id: 'sweater', name: 'Sweater', emoji: '🧶' },
]

const wearFrequencyOptions = [
  { value: 'daily', label: 'Daily or almost daily' },
  { value: 'weekly', label: 'A few times a week' },
  { value: 'monthly', label: 'A few times a month' },
  { value: 'rarely', label: 'Rarely (special occasions)' },
]

const budgetOptions = ['Under $30', '$30-$60', '$60-$100', '$100-$200', 'Over $200']

const headerSubtitle = computed(() => {
  if (step.value === 0) return 'Here to help you decide'
  if (step.value === 1) return 'Choose clothing type'
  if (step.value === 2) return 'Quick questionnaire'
  return 'Your recommendation'
})

const resultCard = computed(() => {
  const hasOwn = q2.value === 'yes'
  const rarelyWears = q1.value === 'rarely' || q1.value === 'monthly'
  if (hasOwn && rarelyWears) {
    return {
      icon: '⚠️',
      title: 'Reconsider this purchase',
      message: "You already own something similar and plan to wear this rarely. This purchase may end up unused. Consider borrowing or renting instead.",
      style: 'background:#fffbeb; border:1px solid #fde68a;',
    }
  }
  if (hasOwn) {
    return {
      icon: '🤔',
      title: 'Think it over',
      message: "You already own something similar. Try styling what you have differently before buying something new. If you still need it, choose quality over price.",
      style: 'background:#fff7ed; border:1px solid #fed7aa;',
    }
  }
  if (rarelyWears) {
    return {
      icon: '💡',
      title: 'Smarter alternatives exist',
      message: "For something you'll wear rarely, consider renting, borrowing, or buying second-hand to reduce environmental impact and save money.",
      style: 'background:#eff6ff; border:1px solid #bfdbfe;',
    }
  }
  return {
    icon: '✅',
    title: 'Good candidate for purchase',
    message: "Wearing it frequently without a duplicate item is a good sign. Choose a quality material to maximize longevity and cost-per-wear.",
    style: 'background:#f0fdf4; border:1px solid #bbf7d0;',
  }
})

function selectType(type) {
  selectedType.value = type
  step.value = 2
}

function submitQuestionnaire() {
  step.value = 3
}

function handleRestart() {
  step.value = 0
  selectedType.value = null
  q1.value = ''
  q2.value = ''
  q3.value = ''
}

function handleClose() {
  isOpen.value = false
  handleRestart()
}
</script>

<style>
@keyframes chatbounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}
</style>
