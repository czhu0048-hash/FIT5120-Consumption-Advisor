<script setup>
import { inject } from 'vue'
import { ANALYZING_MSGS } from '@/composables/useLifetimeValueAnalyzer'

const {
  itemType, material, price, quality,
  wearsPerMonth, washFrequency, tumbleDry, properStorage,
  recentlySelected, btnReady, isAnalyzing, analyzingMsgIdx,
  isPriceValid, canAnalyze, itemTypeIcon, usageLabel, washLabel,
  flash, handleAnalyze, resetAll,
} = inject('lva')
</script>

<template>
  <div class="lva-left">

    <!-- 1. Item Details -->
    <div class="lva-section">
      <div class="lva-sec-head">
        <p class="lva-sec-title">1. Item Details</p>
        <div class="lva-sec-line"></div>
      </div>

      <div class="lva-fields-2col">
        <div class="lva-field">
          <label class="lva-label">Clothing Type</label>
          <div class="lva-sel-wrap" :class="{ 'lva-sel-flash': recentlySelected === 'itemType' }">
            <span class="lva-sel-icon">{{ itemTypeIcon || '👔' }}</span>
            <select v-model="itemType" class="lva-sel" @change="flash('itemType')">
              <option value="">Select type</option>
              <option value="jacket">Jacket / Coat</option>
              <option value="shirt">Shirt / Top</option>
              <option value="pants">Pants / Jeans</option>
              <option value="dress">Dress / Skirt</option>
              <option value="shoes">Shoes / Boots</option>
              <option value="sweater">Sweater / Knitwear</option>
            </select>
            <span class="lva-chev">▾</span>
          </div>
        </div>

        <div class="lva-field">
          <label class="lva-label">Material</label>
          <div class="lva-sel-wrap" :class="{ 'lva-sel-flash': recentlySelected === 'material' }">
            <span class="lva-sel-icon lva-sel-icon-sm">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2.5" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 3c3 3 4.5 6 4.5 9s-1.5 6-4.5 9"/><path d="M3 12h18"/></svg>
            </span>
            <select v-model="material" class="lva-sel" @change="flash('material')">
              <option value="">Select material</option>
              <option value="leather">Leather (most durable)</option>
              <option value="wool">Wool (very durable)</option>
              <option value="denim">Denim (durable)</option>
              <option value="linen">Linen (good)</option>
              <option value="cotton">Cotton (average)</option>
              <option value="polyester">Polyester (lower)</option>
              <option value="silk">Silk (delicate)</option>
            </select>
            <span class="lva-chev">▾</span>
          </div>
        </div>

        <div class="lva-field">
          <label class="lva-label">Price Paid <span class="lva-req">*</span></label>
          <div class="lva-inp-wrap">
            <span class="lva-inp-prefix">$</span>
            <input type="number" v-model.number="price" min="1" max="2000" placeholder="e.g. 89" class="lva-inp" />
          </div>
          <p v-if="price !== null && !isPriceValid" class="lva-err">Enter a price greater than $0</p>
        </div>

        <div class="lva-field">
          <label class="lva-label">Brand Quality</label>
          <div class="lva-sel-wrap" :class="{ 'lva-sel-flash': recentlySelected === 'quality' }">
            <span class="lva-sel-icon lva-sel-icon-sm">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            </span>
            <select v-model="quality" class="lva-sel" @change="flash('quality')">
              <option value="fast">Fast Fashion (e.g. Zara, H&M)</option>
              <option value="mid">Mid-Range (e.g. Uniqlo, Gap)</option>
              <option value="premium">Premium (e.g. Levi's, Patagonia)</option>
              <option value="luxury">Luxury (e.g. Gucci, Burberry)</option>
            </select>
            <span class="lva-chev">▾</span>
          </div>
        </div>
      </div>
    </div>

    <div class="lva-divider"></div>

    <!-- 2. Use & Care -->
    <div class="lva-section">
      <div class="lva-sec-head">
        <p class="lva-sec-title">2. Use &amp; Care</p>
        <div class="lva-sec-line"></div>
      </div>

      <div class="lva-field">
        <div class="lva-slider-head">
          <label class="lva-label">Wears per Month</label>
          <span class="lva-slider-num">{{ wearsPerMonth }}×</span>
        </div>
        <input type="range" min="1" max="30" v-model.number="wearsPerMonth" class="lva-slider"
          :style="`--p:${(wearsPerMonth/30)*100}%`" />
        <p class="lva-hint-txt">{{ usageLabel }}</p>
      </div>

      <div class="lva-field">
        <div class="lva-slider-head">
          <label class="lva-label">Washes per Month</label>
          <span class="lva-slider-num">{{ washFrequency }}×</span>
        </div>
        <input type="range" min="0" max="20" v-model.number="washFrequency" class="lva-slider"
          :style="`--p:${(washFrequency/20)*100}%`" />
        <p class="lva-hint-txt">{{ washLabel }}</p>
      </div>

      <div class="lva-toggles-2col">
        <div class="lva-toggle-row">
          <div>
            <p class="lva-toggle-name">Tumble Dry</p>
            <p class="lva-toggle-sub">Reduces fabric lifespan</p>
          </div>
          <button @click="tumbleDry = !tumbleDry" class="lva-tog" :class="tumbleDry ? 'lva-tog-danger' : 'lva-tog-off'">
            <span class="lva-tog-thumb" :style="tumbleDry ? 'transform:translateX(1.25rem)' : 'transform:translateX(0.125rem)'"></span>
          </button>
        </div>

        <div class="lva-toggle-row">
          <div>
            <p class="lva-toggle-name">Proper Storage</p>
            <p class="lva-toggle-sub">Hanging, folded correctly</p>
          </div>
          <button @click="properStorage = !properStorage" class="lva-tog" :class="properStorage ? 'lva-tog-on' : 'lva-tog-off'">
            <span class="lva-tog-thumb" :style="properStorage ? 'transform:translateX(1.25rem)' : 'transform:translateX(0.125rem)'"></span>
          </button>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="lva-actions">
      <button @click="handleAnalyze" :disabled="isAnalyzing || !canAnalyze"
        class="lva-analyze-btn" :class="{ 'lva-btn-ready': btnReady }">
        <svg v-if="isAnalyzing" class="lva-spin-icon" viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" stroke-width="3"/>
          <path d="M12 2a10 10 0 0110 10" stroke="white" stroke-width="3" stroke-linecap="round"/>
        </svg>
        <Transition name="rec-slide" mode="out-in">
          <span :key="isAnalyzing ? analyzingMsgIdx : 'idle'">
            {{ isAnalyzing ? ANALYZING_MSGS[analyzingMsgIdx] : 'Analyze Lifetime Value' }}
          </span>
        </Transition>
      </button>
      <button @click="resetAll" class="lva-reset-link">Reset all values</button>
    </div>

  </div>
</template>

<style scoped>
.lva-left {
  background: white;
  border-right: 1px solid #c8e0c8;
  padding: 1.125rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: sticky;
  top: 0;
  overflow: visible;
}

.lva-section    { display: flex; flex-direction: column; gap: 0.5rem; }
.lva-fields-2col  { display: grid; grid-template-columns: 1fr 1fr; gap: 0.625rem; }
.lva-toggles-2col { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
.lva-divider    { height: 1px; background: #e0ede0; margin: 0.125rem 0; }

.lva-sec-head   { margin-bottom: 0.25rem; }
.lva-sec-title  { font-size: 0.68rem; font-weight: 800; letter-spacing: 0.1em; text-transform: uppercase; color: #1a1a1a; margin: 0 0 0.3rem; }
.lva-sec-line   { width: 1.625rem; height: 2px; background: #1c4a1c; border-radius: 1px; }

.lva-field  { display: flex; flex-direction: column; gap: 0.25rem; }
.lva-label  { font-size: 0.75rem; color: #5a5a5a; font-weight: 500; }
.lva-req    { color: #c0392b; }
.lva-err    { font-size: 0.72rem; color: #c0392b; margin: 0; }

.lva-sel-wrap, .lva-inp-wrap { position: relative; display: flex; align-items: center; }
.lva-sel-icon {
  position: absolute; left: 0.75rem; font-size: 0.9rem;
  pointer-events: none; z-index: 1; display: flex; align-items: center; justify-content: center; line-height: 1;
}
.lva-sel-icon-sm { font-size: 0.75rem; color: #888; }
.lva-chev { position: absolute; right: 0.75rem; font-size: 0.65rem; color: #aaa; pointer-events: none; }

.lva-sel {
  width: 100%; padding: 0.6rem 1.75rem 0.6rem 2.25rem;
  background: #f7faf7; border: 1px solid #c8e0c8; border-radius: 0.5rem;
  font-size: 0.85rem; color: #1a1a1a; outline: none; appearance: none;
  cursor: pointer; transition: border-color 0.2s;
}
.lva-sel:focus { border-color: #1c4a1c; box-shadow: 0 0 0 3px rgba(28,74,28,0.1); }

.lva-sel-wrap.lva-sel-flash .lva-sel {
  border-color: #1c4a1c;
  box-shadow: 0 0 0 3px rgba(28,74,28,0.14);
  transition: border-color 0.1s ease, box-shadow 0.5s ease;
}

.lva-inp-prefix { position: absolute; left: 0.75rem; font-size: 0.85rem; color: #666; font-weight: 600; }
.lva-inp {
  width: 100%; padding: 0.6rem 1rem 0.6rem 1.875rem;
  background: #f7faf7; border: 1px solid #c8e0c8; border-radius: 0.5rem;
  font-size: 0.85rem; color: #1a1a1a; outline: none; box-sizing: border-box; transition: border-color 0.2s;
}
.lva-inp:focus { border-color: #1c4a1c; box-shadow: 0 0 0 3px rgba(28,74,28,0.1); }
.lva-inp::-webkit-outer-spin-button, .lva-inp::-webkit-inner-spin-button { -webkit-appearance: none; }

.lva-slider-head { display: flex; justify-content: space-between; align-items: center; }
.lva-slider-num  { font-size: 1.25rem; font-weight: 800; color: #1c4a1c; line-height: 1; }
.lva-hint-txt    { font-size: 0.7rem; color: #888; margin: 0.125rem 0 0; }

.lva-slider {
  width: 100%; height: 5px; border-radius: 999px; appearance: none; cursor: pointer; outline: none;
  background: linear-gradient(to right, #1c4a1c 0%, #1c4a1c var(--p), #c8e0c8 var(--p), #c8e0c8 100%);
}
.lva-slider::-webkit-slider-thumb {
  -webkit-appearance: none; width: 1rem; height: 1rem; border-radius: 50%;
  background: white; border: 2px solid #1c4a1c; cursor: pointer;
  box-shadow: 0 1px 4px rgba(0,0,0,0.15); transition: box-shadow 0.2s;
}
.lva-slider::-webkit-slider-thumb:hover { box-shadow: 0 0 0 4px rgba(28,74,28,0.15); }
.lva-slider::-moz-range-thumb {
  width: 1rem; height: 1rem; border-radius: 50%;
  background: white; border: 2px solid #1c4a1c; cursor: pointer;
}

.lva-toggle-row {
  display: flex; align-items: center; justify-content: space-between;
  padding: 0.5rem 0.625rem; background: #f7faf7; border-radius: 0.5rem; border: 1px solid #daeada;
}
.lva-toggle-name { font-size: 0.85rem; font-weight: 600; color: #1a1a1a; margin: 0; }
.lva-toggle-sub  { font-size: 0.7rem; color: #888; margin: 0.1rem 0 0; }
.lva-tog {
  position: relative; width: 2.75rem; height: 1.5rem; border-radius: 999px;
  border: none; cursor: pointer; flex-shrink: 0; transition: background 0.25s;
}
.lva-tog-off    { background: #d4cfc8; }
.lva-tog-on     { background: #1c4a1c; }
.lva-tog-danger { background: #c0392b; }
.lva-tog-thumb {
  position: absolute; top: 0.125rem; width: 1.25rem; height: 1.25rem;
  background: white; border-radius: 50%; box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); display: block;
}

.lva-actions { display: flex; flex-direction: column; gap: 0.5rem; margin-top: auto; padding-top: 0.5rem; }
.lva-analyze-btn {
  width: 100%; background: #2f6f4e; color: white;
  padding: 0.875rem 1rem; border-radius: 0.625rem; font-weight: 700; font-size: 0.9375rem;
  border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
  gap: 0.5rem; transition: all 0.2s; letter-spacing: 0.01em;
}
.lva-analyze-btn:hover:not(:disabled)  { background: #285f43; transform: translateY(-1px); box-shadow: 0 6px 16px rgba(47,111,78,0.28); }
.lva-analyze-btn:active:not(:disabled) { transform: scale(0.97) translateY(0); box-shadow: none; transition-duration: 0.08s; }
.lva-analyze-btn:disabled { opacity: 0.4; cursor: not-allowed; }
.lva-reset-link {
  background: none; border: none; cursor: pointer; font-size: 0.8rem; color: #888;
  text-align: center; text-decoration: underline; text-underline-offset: 2px;
  transition: color 0.2s; padding: 0.25rem;
}
.lva-reset-link:hover { color: #1c4a1c; }

.lva-spin-icon { width: 1rem; height: 1rem; flex-shrink: 0; }

.rec-slide-enter-active { transition: opacity 0.22s ease, transform 0.22s cubic-bezier(0.16,1,0.3,1); }
.rec-slide-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.rec-slide-enter-from   { opacity: 0; transform: translateY(6px); }
.rec-slide-leave-to     { opacity: 0; transform: translateY(-4px); }

@media (prefers-reduced-motion: no-preference) {
  @keyframes lva-spin { to { transform: rotate(360deg); } }
  @keyframes lva-btn-ready {
    0%   { box-shadow: 0 0 0 0 rgba(28,74,28,0.45); }
    60%  { box-shadow: 0 0 0 10px rgba(28,74,28,0); }
    100% { box-shadow: 0 0 0 0 rgba(28,74,28,0); }
  }
  .lva-spin-icon { animation: lva-spin 0.8s linear infinite; }
  .lva-btn-ready { animation: lva-btn-ready 0.7s ease-out; }
}

@media (max-width: 768px) {
  .lva-left { position: static; padding: 0.625rem 0.75rem; gap: 0.45rem; border-right: none; border-bottom: 1px solid #c8e0c8; }
  .lva-fields-2col, .lva-toggles-2col { gap: 0.45rem; }
  .lva-sel, .lva-inp { min-height: 2.15rem; padding-top: 0.35rem; padding-bottom: 0.35rem; font-size: 0.74rem; }
  .lva-label { font-size: 0.68rem; }
  .lva-sec-head { margin-bottom: 0.1rem; }
  .lva-sec-title { font-size: 0.62rem; margin-bottom: 0.2rem; }
  .lva-sel-icon { font-size: 0.8rem; left: 0.5rem; }
  .lva-sel { padding-left: 1.75rem; }
  .lva-chev { right: 0.5rem; }
  .lva-inp-prefix { left: 0.5rem; font-size: 0.78rem; }
  .lva-inp { padding-left: 1.5rem; }
  .lva-section { gap: 0.4rem; }
  .lva-divider { margin: 0.05rem 0; }
  .lva-slider { height: 4px; }
  .lva-slider-num { font-size: 0.95rem; }
  .lva-hint-txt { display: none; }
  .lva-toggle-row { padding: 0.35rem 0.45rem; }
  .lva-toggle-name { font-size: 0.74rem; }
  .lva-toggle-sub { display: none; }
  .lva-tog { width: 2.25rem; height: 1.25rem; }
  .lva-tog-thumb { width: 1rem; height: 1rem; }
  .lva-actions { padding-top: 0.25rem; gap: 0.25rem; }
  .lva-analyze-btn { padding: 0.65rem; font-size: 0.84rem; }
  .lva-reset-link { padding: 0.1rem; font-size: 0.74rem; }
}
</style>
