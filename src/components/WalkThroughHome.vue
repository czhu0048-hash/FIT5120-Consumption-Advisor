<template>
  <!-- Full-viewport container — house IS the background -->
  <div style="position:relative; height:calc(100vh - 3.75rem); overflow:hidden; font-family:'Inter',sans-serif;">

    <!-- ── Full-bleed house image ── -->
    <img
      :src="houseImg"
      alt="House"
      style="position:absolute; inset:0; width:100%; height:100%; object-fit:cover; object-position:center; pointer-events:none; user-select:none;" />

    <!-- Top gradient for header readability -->
    <div style="position:absolute; top:0; left:0; right:0; height:14rem; background:linear-gradient(to bottom, rgba(15,30,20,0.55) 0%, transparent 100%); pointer-events:none; z-index:1;"></div>

    <!-- ── Floating header — top left ── -->
    <div style="position:absolute; top:1.75rem; left:2rem; z-index:10;">
      <h1 style="font-size:1.75rem; font-weight:800; color:#fff; margin:0 0 0.25rem; text-shadow:0 2px 12px rgba(0,0,0,0.4);">Your Household</h1>
      <p style="font-size:0.8125rem; color:rgba(255,255,255,0.75); margin:0 0 1rem; line-height:1.5; text-shadow:0 1px 6px rgba(0,0,0,0.4);">
        Tap any room to begin its consumption check.
      </p>
      <!-- Progress pill -->
      <div style="display:inline-flex; align-items:center; gap:0.75rem; background:rgba(255,255,255,0.14); backdrop-filter:blur(12px); border:1px solid rgba(255,255,255,0.22); border-radius:14px; padding:0.625rem 1rem;">
        <div style="width:2rem; height:2rem; border-radius:8px; background:rgba(64,201,116,0.25); border:1px solid rgba(64,201,116,0.4); display:flex; align-items:center; justify-content:center; font-size:1rem; flex-shrink:0;">🌿</div>
        <div>
          <div style="font-size:0.5625rem; font-weight:800; color:rgba(255,255,255,0.6); text-transform:uppercase; letter-spacing:0.12em; margin-bottom:0.125rem;">OVERALL PROGRESS</div>
          <div style="font-size:0.9375rem; font-weight:800; color:#fff;">{{ completedPct }}% <span style="font-weight:500; color:rgba(255,255,255,0.65); font-size:0.8125rem;">completed</span></div>
          <div style="margin-top:0.3rem; height:3px; width:120px; background:rgba(255,255,255,0.2); border-radius:9999px; overflow:hidden;">
            <div :style="{ width: completedPct + '%', height:'100%', background:'#40c974', borderRadius:'9999px', transition:'width 0.6s ease' }"></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Room count — top right ── -->
    <div style="position:absolute; top:1.75rem; right:2rem; z-index:10; display:flex; gap:0.5rem;">
      <div v-for="id in ROOM_ORDER" :key="id"
        :style="{
          width:'0.5rem', height:'0.5rem', borderRadius:'50%',
          background: completed.has(id) ? '#40c974' : 'rgba(255,255,255,0.3)',
          transition: 'background 0.3s'
        }"></div>
    </div>

    <!-- ── SVG polygon overlays — covers full image ── -->
    <svg
      style="position:absolute; inset:0; width:100%; height:100%; z-index:5;"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice">
      <defs>
        <filter id="roomGlow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.2" result="blur"/>
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <g v-for="id in ROOM_ORDER" :key="id">
        <!-- Glow halo on hover / active -->
        <polygon
          v-if="statusOf(id) === 'active' || statusOf(id) === 'hovered'"
          :points="ROOM_REGIONS[id]"
          fill="rgba(64,201,116,0.18)"
          stroke="#40c974"
          stroke-width="1.5"
          filter="url(#roomGlow)"
          style="transition:all 0.2s;" />
        <!-- Done tint -->
        <polygon
          v-if="statusOf(id) === 'done'"
          :points="ROOM_REGIONS[id]"
          fill="rgba(26,46,31,0.35)"
          stroke="rgba(45,106,79,0.7)"
          stroke-width="1"
          style="transition:all 0.2s;" />
        <!-- Invisible click + hover target -->
        <polygon
          :points="ROOM_REGIONS[id]"
          fill="transparent"
          stroke="transparent"
          stroke-width="5"
          style="cursor:pointer;"
          @click="openRoom(id)"
          @mouseenter="hovered = id"
          @mouseleave="hovered = null" />
        <!-- Anchor dot -->
        <circle
          :cx="CALLOUTS[id].ax" :cy="CALLOUTS[id].ay" r="1.8"
          :fill="statusOf(id)==='done' ? '#2d6a4f' : (statusOf(id)==='active'||statusOf(id)==='hovered') ? '#40c974' : 'rgba(255,255,255,0.8)'"
          :stroke="statusOf(id)==='done' ? 'rgba(45,106,79,0.5)' : 'rgba(255,255,255,0.5)'"
          stroke-width="0.5"
          style="cursor:pointer; transition:all 0.2s;"
          @click="openRoom(id)"
          @mouseenter="hovered = id"
          @mouseleave="hovered = null" />
        <text
          v-if="statusOf(id) === 'done'"
          :x="CALLOUTS[id].ax" :y="CALLOUTS[id].ay + 1"
          text-anchor="middle" font-size="3.5" fill="#fff"
          font-family="Inter,sans-serif" font-weight="800"
          style="user-select:none; pointer-events:none;">✓</text>
      </g>
    </svg>

    <!-- ── Floating room pills ── -->
    <div
      v-for="id in ROOM_ORDER" :key="'pill-'+id"
      :style="{
        position: 'absolute',
        left: CALLOUTS[id].lx + '%',
        top: CALLOUTS[id].ly + '%',
        transform: `translate(-50%,-50%) ${statusOf(id)==='active'||statusOf(id)==='hovered' ? 'scale(1.08)' : 'scale(1)'}`,
        background: statusOf(id)==='done'
          ? '#2d6a4f'
          : (statusOf(id)==='active'||statusOf(id)==='hovered')
            ? '#1a2e1f'
            : 'rgba(255,255,255,0.88)',
        backdropFilter: 'blur(8px)',
        border: statusOf(id)==='done'
          ? '1.5px solid rgba(64,201,116,0.5)'
          : (statusOf(id)==='active'||statusOf(id)==='hovered')
            ? '1.5px solid rgba(64,201,116,0.7)'
            : '1.5px solid rgba(255,255,255,0.6)',
        borderRadius: '20px',
        padding: '5px 12px',
        cursor: 'pointer',
        boxShadow: (statusOf(id)==='active'||statusOf(id)==='hovered')
          ? '0 6px 20px rgba(0,0,0,0.35)'
          : '0 2px 10px rgba(0,0,0,0.18)',
        transition: 'all 0.22s',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        gap: '5px',
        whiteSpace: 'nowrap',
      }"
      @click="openRoom(id)"
      @mouseenter="hovered = id"
      @mouseleave="hovered = null">
      <span style="font-size:11px;">{{ statusOf(id) === 'done' ? '✓' : ROOMS[id].icon }}</span>
      <span :style="{
        fontFamily:'Inter,sans-serif', fontSize:'10px', fontWeight:700,
        color: (statusOf(id)==='done'||statusOf(id)==='active'||statusOf(id)==='hovered') ? '#fff' : '#1a2e1f'
      }">{{ ROOMS[id].name }}</span>
    </div>

    <!-- ── Dim overlay — appears behind panel ── -->
    <Transition name="fade">
      <div
        v-if="panelOpen"
        @click="closePanel"
        style="position:absolute; inset:0; background:rgba(0,0,0,0.35); z-index:15; cursor:pointer;">
      </div>
    </Transition>

    <!-- ── Right slide-in panel ── -->
    <div
      :style="{
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: '420px',
        background: '#fff',
        zIndex: 20,
        boxShadow: '-8px 0 40px rgba(0,0,0,0.2)',
        transform: panelOpen ? 'translateX(0)' : 'translateX(100%)',
        transition: 'transform 0.38s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }">

      <!-- Panel — questions mode -->
      <template v-if="panelMode === 'questions' && activeRoom">
        <!-- Panel header -->
        <div style="padding:1.25rem 1.25rem 0; flex-shrink:0;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.875rem;">
            <div style="display:flex; align-items:center; gap:0.625rem;">
              <div style="width:2.5rem; height:2.5rem; border-radius:12px; background:#e8f5ee; display:flex; align-items:center; justify-content:center; font-size:1.25rem; flex-shrink:0;">
                {{ activeRoom.icon }}
              </div>
              <div>
                <h3 style="font-size:0.9375rem; font-weight:800; color:#1a2e1f; margin:0 0 0.125rem;">{{ activeRoom.name }} Consumption Check</h3>
                <p style="font-size:0.6875rem; color:#90a89a; margin:0;">{{ activeRoom.label }}</p>
              </div>
            </div>
            <button @click="closePanel"
              style="width:2rem; height:2rem; border-radius:50%; border:1.5px solid #e4ede8; background:white; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:0.875rem; color:#6b7280; flex-shrink:0; font-family:Inter,sans-serif;">
              ✕
            </button>
          </div>
          <!-- Answer progress bar -->
          <div style="display:flex; align-items:center; gap:0.5rem; padding-bottom:1rem; border-bottom:1px solid #f0f5f2;">
            <div style="display:flex; gap:3px; flex:1;">
              <div v-for="(_, i) in activeRoom.questions" :key="i"
                :style="{
                  flex:1, height:'4px', borderRadius:'9999px',
                  background: selectedAnswers[i] !== null ? '#2d6a4f' : '#e4ede8',
                  transition: 'background 0.2s'
                }"></div>
            </div>
            <span style="font-size:0.6875rem; font-weight:700; color:#2d6a4f; white-space:nowrap;">
              {{ answeredCount }} / {{ activeRoom.questions.length }} answered
            </span>
          </div>
        </div>

        <!-- Scrollable questions body -->
        <div style="flex:1; overflow-y:auto; padding:1rem 1.25rem;">
          <div v-for="(q, qi) in activeRoom.questions" :key="qi"
            style="margin-bottom:1.25rem;">
            <!-- Question -->
            <div style="background:#f8fcf9; border:1px solid #e4ede8; border-radius:12px; padding:0.875rem; margin-bottom:0.5rem; display:flex; gap:0.625rem; align-items:flex-start;">
              <span style="background:#2d6a4f; color:#fff; font-size:0.625rem; font-weight:800; min-width:1.25rem; height:1.25rem; border-radius:50%; display:inline-flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px;">{{ qi + 1 }}</span>
              <p style="font-size:0.875rem; color:#1a2e1f; font-weight:600; line-height:1.5; margin:0;">{{ q.q }}</p>
            </div>
            <!-- Options — 2 col grid -->
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:0.4rem;">
              <button
                v-for="(opt, oi) in q.options" :key="oi"
                @click="selectAnswer(qi, oi)"
                :style="{
                  background: selectedAnswers[qi] === oi ? '#2d6a4f' : '#fff',
                  border: `1.5px solid ${selectedAnswers[qi] === oi ? '#2d6a4f' : '#dce8e2'}`,
                  borderRadius: '10px',
                  padding: '0.625rem 0.75rem',
                  display: 'flex', alignItems: 'center', gap: '7px',
                  cursor: 'pointer', textAlign: 'left',
                  transition: 'all 0.15s',
                  fontFamily: 'Inter,sans-serif'
                }">
                <div :style="{
                  width:'14px', height:'14px', borderRadius:'50%', flexShrink:0,
                  border: `2px solid ${selectedAnswers[qi]===oi ? '#fff' : '#b8d0c4'}`,
                  display:'flex', alignItems:'center', justifyContent:'center'
                }">
                  <div v-if="selectedAnswers[qi] === oi"
                    style="width:6px; height:6px; border-radius:50%; background:#fff;"></div>
                </div>
                <span :style="{
                  fontSize:'0.75rem', lineHeight:1.3,
                  color: selectedAnswers[qi]===oi ? '#fff' : '#3d5a47',
                  fontWeight: selectedAnswers[qi]===oi ? 600 : 400
                }">{{ opt }}</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Submit footer -->
        <div style="padding:1rem 1.25rem; border-top:1px solid #f0f5f2; flex-shrink:0; background:white;">
          <button
            @click="submitAnswers"
            :disabled="answeredCount < activeRoom.questions.length"
            :style="{
              width:'100%', border:'none', borderRadius:'12px', padding:'14px',
              fontSize:'0.9375rem', fontWeight:800, color:'#fff',
              background: answeredCount === activeRoom.questions.length ? '#2d6a4f' : '#d0e4d8',
              cursor: answeredCount === activeRoom.questions.length ? 'pointer' : 'not-allowed',
              transition:'all 0.2s', fontFamily:'Inter,sans-serif',
              display:'flex', alignItems:'center', justifyContent:'center', gap:'8px'
            }">
            {{ answeredCount < activeRoom.questions.length
              ? `Answer all ${activeRoom.questions.length - answeredCount} remaining question${activeRoom.questions.length - answeredCount > 1 ? 's' : ''}`
              : 'See My Results →'
            }}
          </button>
          <p style="text-align:center; font-size:0.6875rem; color:#a0bba8; margin:0.5rem 0 0;">🔒 Your responses are private and used only to personalise your results.</p>
        </div>
      </template>

      <!-- Panel — results mode -->
      <template v-else-if="panelMode === 'results' && activeRoom">
        <div style="flex:1; overflow-y:auto; padding:1.25rem;">
          <!-- Header -->
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:1rem;">
            <div style="display:flex; align-items:center; gap:0.625rem;">
              <div style="width:2.5rem; height:2.5rem; border-radius:12px; background:#e8f5ee; display:flex; align-items:center; justify-content:center; font-size:1.25rem;">{{ activeRoom.icon }}</div>
              <h3 style="font-size:0.9375rem; font-weight:800; color:#1a2e1f; margin:0;">{{ activeRoom.name }} Results</h3>
            </div>
            <div style="display:flex; align-items:center; gap:0.5rem;">
              <div :style="{ background: scoreCfg.bg, border:`1px solid ${scoreCfg.color}44`, borderRadius:'20px', padding:'3px 12px' }">
                <span :style="{ fontSize:'0.6875rem', fontWeight:700, color:scoreCfg.color }">{{ scoreCfg.label }}</span>
              </div>
              <button @click="closePanel"
                style="width:2rem; height:2rem; border-radius:50%; border:1.5px solid #e4ede8; background:white; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:0.875rem; color:#6b7280; font-family:Inter,sans-serif;">✕</button>
            </div>
          </div>

          <!-- Result body -->
          <div style="background:#f8fcf9; border:1px solid #e4ede8; border-radius:12px; padding:1rem; margin-bottom:0.75rem;">
            <h4 style="font-size:0.875rem; font-weight:800; color:#1a2e1f; margin:0 0 0.375rem;">{{ roomResult.title }}</h4>
            <p style="font-size:0.8125rem; color:#4a6b55; line-height:1.65; margin:0;">{{ roomResult.body }}</p>
          </div>

          <!-- Tips -->
          <div style="background:#f8fcf9; border:1px solid #e4ede8; border-radius:12px; padding:1rem; margin-bottom:0.875rem;">
            <div style="font-size:0.5625rem; font-weight:800; color:#90b09a; letter-spacing:0.12em; text-transform:uppercase; margin-bottom:0.75rem;">What to try</div>
            <div v-for="(tip, i) in roomResult.tips" :key="i"
              :style="{ display:'flex', gap:'10px', marginBottom: i < roomResult.tips.length-1 ? '0.75rem' : '0' }">
              <div style="width:1.375rem; height:1.375rem; border-radius:50%; background:#e4ede8; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px;">
                <span style="font-size:0.5625rem; font-weight:800; color:#2d6a4f;">{{ i + 1 }}</span>
              </div>
              <p style="font-size:0.8125rem; color:#3d5a47; line-height:1.6; margin:0;">{{ tip }}</p>
            </div>
          </div>

          <!-- Progress nudge -->
          <div v-if="completed.size < ROOM_ORDER.length"
            style="background:#f0f8f4; border:1px dashed #b8d4c0; border-radius:10px; padding:10px 14px; text-align:center; margin-bottom:0.875rem;">
            <p style="font-size:0.75rem; color:#5a8a6a; margin:0;">💡 <strong>{{ completed.size }} of {{ ROOM_ORDER.length }}</strong> rooms done — complete all for your full household picture.</p>
          </div>
        </div>

        <!-- Footer buttons -->
        <div style="padding:1rem 1.25rem; border-top:1px solid #f0f5f2; flex-shrink:0; background:white; display:flex; flex-direction:column; gap:0.5rem;">
          <button @click="handleBack"
            style="width:100%; background:#2d6a4f; border:none; border-radius:12px; padding:13px; font-size:0.875rem; font-weight:800; color:#fff; cursor:pointer; font-family:Inter,sans-serif; display:flex; align-items:center; justify-content:center; gap:6px;">
            {{ completed.size < ROOM_ORDER.length ? '← Back to House' : 'See Full Summary →' }}
          </button>
          <button @click="retakeRoom"
            style="width:100%; background:transparent; border:1.5px solid #dce8e2; border-radius:12px; padding:11px; font-size:0.8125rem; font-weight:600; color:#5a8a6a; cursor:pointer; font-family:Inter,sans-serif;">
            Redo this room
          </button>
        </div>
      </template>

      <!-- Panel — summary mode -->
      <template v-else-if="panelMode === 'summary'">
        <div style="flex:1; overflow-y:auto; padding:1.25rem;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:0.25rem;">
            <h3 style="font-size:1rem; font-weight:800; color:#1a2e1f; margin:0;">Your Household Picture</h3>
            <button @click="closePanel"
              style="width:2rem; height:2rem; border-radius:50%; border:1.5px solid #e4ede8; background:white; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:0.875rem; color:#6b7280; font-family:Inter,sans-serif;">✕</button>
          </div>
          <p style="font-size:0.8125rem; color:#5a8a6a; margin:0 0 1.25rem; line-height:1.5;">{{ summaryMsg }}</p>

          <div style="display:flex; flex-direction:column; gap:0.625rem; margin-bottom:1.25rem;">
            <div v-for="s in summaryScores" :key="s.id"
              style="display:flex; align-items:center; gap:0.75rem; background:#f8fcf9; border:1px solid #e4ede8; border-radius:12px; padding:0.75rem 1rem; cursor:pointer;"
              @click="viewRoomResult(s.id)">
              <span style="font-size:1.125rem;">{{ s.icon }}</span>
              <span style="font-size:0.875rem; font-weight:700; color:#1a2e1f; flex:1;">{{ s.name }}</span>
              <div :style="{ background: SCORE_CFG[s.level].bg, border:`1px solid ${SCORE_CFG[s.level].color}44`, borderRadius:'20px', padding:'3px 10px' }">
                <span :style="{ fontSize:'0.625rem', fontWeight:700, color: SCORE_CFG[s.level].color }">{{ SCORE_CFG[s.level].label }}</span>
              </div>
              <span style="color:#9ca3af; font-size:0.875rem;">›</span>
            </div>
          </div>
        </div>

        <div style="padding:1rem 1.25rem; border-top:1px solid #f0f5f2; flex-shrink:0; background:white;">
          <button @click="reset"
            style="width:100%; background:transparent; border:1.5px solid #c8ddd4; border-radius:10px; padding:12px; font-size:0.875rem; font-weight:700; color:#5a8a6a; cursor:pointer; font-family:Inter,sans-serif;">
            Start Over →
          </button>
        </div>
      </template>

    </div><!-- end panel -->

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import houseImg from '/house-isometric.png'

const ROOM_REGIONS = {
  kitchen:  '5,5  48,5  48,42  28,52  5,42',
  bathroom: '50,5  80,5  80,48  50,48',
  bedroom:  '80,8  96,15  96,65  70,65  70,48  80,48',
  living:   '5,44  28,54  28,92  5,92',
  laundry:  '38,58  68,58  68,92  38,92',
}

const CALLOUTS = {
  kitchen:  { lx: 8,  ly: 8,  ax: 25, ay: 28 },
  bathroom: { lx: 64, ly: 8,  ax: 62, ay: 25 },
  bedroom:  { lx: 78, ly: 50, ax: 83, ay: 38 },
  living:   { lx: 5,  ly: 80, ax: 14, ay: 68 },
  laundry:  { lx: 44, ly: 86, ax: 52, ay: 72 },
}

const ROOM_ORDER = ['kitchen', 'bathroom', 'bedroom', 'living', 'laundry']

const SCORE_CFG = {
  low:  { label: 'Conscious',       color: '#2d6a4f', bg: '#e8f5ee' },
  mid:  { label: 'Room to Improve', color: '#a06820', bg: '#fdf3e3' },
  high: { label: 'Needs Attention', color: '#b03020', bg: '#fdecea' },
}

const ROOMS = {
  kitchen: {
    id: 'kitchen', name: 'Kitchen', icon: '🍳', label: 'Where food waste begins',
    questions: [
      { q: 'How often do you throw away food before it\'s used?', options: ['Almost never','Once a week','A few times a week','Daily'] },
      { q: 'How do you usually shop for groceries?', options: ['With a list, strictly','With a rough idea','Whatever looks good','Impulsively online'] },
      { q: 'How many cleaning products are under your kitchen sink?', options: ['1–2','3–4','5–6','I\'ve lost count'] },
      { q: 'What happens to leftovers in your home?', options: ['Always eaten','Usually eaten','Sometimes eaten','Usually binned'] },
      { q: 'How do you store food?', options: ['Reusable containers','Mix of both','Mostly plastic wrap/bags','Whatever\'s nearest'] },
    ],
    results: {
      low:  { title: 'Your kitchen is running lean.', body: 'You\'re making conscious choices. Most households use 4–5 cleaning products that could be replaced by 1–2 multi-purpose alternatives.', tips: ['Try one multi-surface cleaner instead of separate ones','Start a weekly fridge check before shopping','Batch cook once a week to reduce packaging waste'] },
      mid:  { title: 'Your kitchen has some quiet waste.', body: 'Food waste and product accumulation are the two biggest consumption drains in most kitchens.', tips: ['Write a shopping list before every shop, no exceptions','Designate one shelf for eat-first food near expiry','Replace 3 single-use cleaning products with one concentrate'] },
      high: { title: 'Your kitchen is your biggest consumption room.', body: 'Kitchens are where household consumption quietly compounds. Small daily defaults add up to significant waste.', tips: ['Start with one habit: shop with a list for one month','Do a single product audit — remove anything duplicating another','Try a use-what-you-have week before your next big shop'] },
    },
  },
  bathroom: {
    id: 'bathroom', name: 'Bathroom', icon: '🚿', label: 'Product accumulation zone',
    questions: [
      { q: 'How many products sit on your bathroom shelf or counter?', options: ['1–4','5–8','9–12','More than 12'] },
      { q: 'How long is your average shower?', options: ['Under 5 mins','5–8 mins','8–12 mins','12+ mins'] },
      { q: 'How do you dispose of empty bottles and packaging?', options: ['Always recycle','Usually recycle','Sometimes recycle','Straight in the bin'] },
      { q: 'How often do you buy new products before finishing existing ones?', options: ['Never','Occasionally','Fairly often','All the time'] },
      { q: 'How many bathroom products contain synthetic fragrances?', options: ['None','A couple','Most of them','Never checked'] },
    ],
    results: {
      low:  { title: 'Your bathroom is one of your cleaner rooms.', body: 'You are using products intentionally. Even low-product bathrooms often have hidden chemical exposure through fragrances.', tips: ['Check labels for fragrance — it masks dozens of unlisted chemicals','Consider a bar shampoo to eliminate one plastic bottle permanently','A 5-minute shower uses 50L less water than a 10-minute one'] },
      mid:  { title: 'Your bathroom has some accumulation.', body: 'Product accumulation is the defining pattern of modern bathrooms. You likely have products bought with good intentions that rarely get used.', tips: ['Shelf audit: anything unused in 3 months — gone','Finish what you have before buying anything new','Try replacing 3 single-use products with one multi-use alternative'] },
      high: { title: 'Your bathroom is quietly overcrowded.', body: 'High product count, long showers, and incomplete recycling are the three most common bathroom patterns.', tips: ['One rule: nothing new until something is finished','Time your next shower — awareness alone tends to shorten them','Put a recycling bin in the bathroom — proximity changes behaviour'] },
    },
  },
  bedroom: {
    id: 'bedroom', name: 'Bedroom', icon: '🛏️', label: 'Hidden energy & textile waste',
    questions: [
      { q: 'How often do you wash your bedsheets?', options: ['Weekly','Every 2 weeks','Monthly','When they feel dirty'] },
      { q: 'What temperature do you wash bedding and clothes at?', options: ['Cold (30°)','Warm (40°)','Hot (60°)','Whatever\'s default'] },
      { q: 'How do you handle clothes worn once but not dirty?', options: ['Hang them back up','Chair or floor','Back in wardrobe mixed','Wash them anyway'] },
      { q: 'How often do you replace pillows, bedding or mattress?', options: ['Only when truly needed','Every few years','When I feel like a change','Frequently for freshness'] },
      { q: 'What lighting do you use in the hour before sleep?', options: ['Dim warm light','Normal ceiling light','Screen only','Bright overhead always'] },
    ],
    results: {
      low:  { title: 'Your bedroom is running consciously.', body: 'Your habits show intention. Most bedding can be washed at 30° without any loss of cleanliness — saving significant energy.', tips: ['Switch non-heavily-soiled washes to 30° — uses 40% less energy','A pillow lasts 2 years, mattress 8–10 — replace only when needed','Dim lighting before sleep reduces the urge to over-replace bedding'] },
      mid:  { title: 'Your bedroom has some unconsidered defaults.', body: 'Wash temperature, textile replacement cycles, and lighting are rarely active choices in most bedrooms.', tips: ['Set a default wash temperature of 30° on your machine','The chair pile actually reduces unnecessary washing','Before replacing any textile, ask: worn out or just familiar?'] },
      high: { title: 'Your bedroom has room to improve.', body: 'High wash temperatures, frequent replacements, and unconsidered lighting add up to more resource consumption than most people realise.', tips: ['One change: lower your default wash temperature immediately','Create a rule for textile replacement — function over feeling','A warm bulb lamp transforms pre-sleep consumption patterns permanently'] },
    },
  },
  living: {
    id: 'living', name: 'Living Room', icon: '🛋️', label: 'Energy & impulse spending',
    questions: [
      { q: 'How many devices are left on standby overnight?', options: ['None — all switched off','1–2','3–4','Most of them'] },
      { q: 'When do you consider an item ready to replace?', options: ['Only when it stops working','When it needs repair','When something newer exists','When I feel like a change'] },
      { q: 'How do you heat your living space?', options: ['Deliberately and minimally','On a timer','Whenever it feels cold','It\'s usually always on'] },
      { q: 'What do you do with packaging when deliveries arrive?', options: ['Break down and recycle immediately','Recycle eventually','Leave it around','Straight in the bin'] },
      { q: 'How often do you buy non-essential items for this room?', options: ['Rarely or never','A few times a year','Monthly','Regularly without thinking'] },
    ],
    results: {
      low:  { title: 'Your living room is your most intentional space.', body: 'You make active decisions about energy and consumption. The main opportunity is delivery packaging — even conscious households underestimate how much they process weekly.', tips: ['Consolidate deliveries into one weekly order where possible','A standby power strip costs $10 and pays back in months','Before any non-essential purchase, apply a 48-hour rule'] },
      mid:  { title: 'Your living room has some energy and replacement drift.', body: 'Standby devices, reactive heating, and occasional impulse purchases are the default patterns of most living rooms.', tips: ['Standby devices use 10–15% of household electricity — one power strip changes this','Set heating to a timer rather than responding to feeling cold','Quarterly non-essential audit: what came in, was it needed?'] },
      high: { title: 'Your living room is your highest consumption space.', body: 'Energy, replacement cycles and non-essential purchasing are all running above conscious levels.', tips: ['Start with one switch: turn everything off at the wall tonight','Write down the last 5 non-essential things bought — were they worth it?','A programmable thermostat pays for itself in one winter'] },
    },
  },
  laundry: {
    id: 'laundry', name: 'Laundry', icon: '🫧', label: 'Water & detergent overuse',
    questions: [
      { q: 'How full is the machine when you run a wash?', options: ['Always full','Usually full','Half full often','Whatever needs washing'] },
      { q: 'How much detergent do you use per wash?', options: ['The recommended amount','A little more','Quite a bit more','I just pour until it seems right'] },
      { q: 'Do you use a dryer?', options: ['Never — always line/air dry','Only in winter','Often','Always'] },
      { q: 'How often do you wash clothes that are not actually dirty?', options: ['Never','Rarely','Sometimes','After every wear regardless'] },
      { q: 'What type of detergent do you use?', options: ['Concentrated eco formula','Standard liquid/powder','Pods or capsules','Whatever\'s cheapest'] },
    ],
    results: {
      low:  { title: 'Your laundry habits are already lean.', body: 'You are running efficient loads with considered products. Most people use 2–3x the detergent needed.', tips: ['Halve your detergent for one month — most people notice no difference','A full load uses the same water as a half load — wait for full','Line drying above 10° works — it just takes longer'] },
      mid:  { title: 'Your laundry has some quiet inefficiency.', body: 'Half-empty machines, excess detergent and occasional unnecessary washes are the three default patterns of modern laundry.', tips: ['One rule: machine only runs when full','Measure detergent once then remember that amount visually','The worn-once pile does not need washing — airing overnight removes most odour'] },
      high: { title: 'Laundry is your highest resource room.', body: 'Frequent washes, underfilled machines, excess detergent and dryer reliance compound into the single highest resource drain in most households.', tips: ['Machine fullness is the highest impact single change','Detergent pods contain 3–4x what most loads need','A drying rack costs $15 and eliminates dryer use for light loads'] },
    },
  },
}

// ── State ────────────────────────────────────────────────────────────────────
const hovered        = ref(null)
const activeRoom     = ref(null)
const panelOpen      = ref(false)
const panelMode      = ref('questions') // questions | results | summary
const completed      = ref(new Set())
const allResults     = ref({})
const selectedAnswers = ref([])
const currentAnswers = ref(null)

// ── Computed ─────────────────────────────────────────────────────────────────
const completedPct = computed(() => Math.round((completed.value.size / ROOM_ORDER.length) * 100))

const answeredCount = computed(() =>
  selectedAnswers.value.filter(a => a !== null).length
)

const scoreLevel = computed(() => {
  const a = currentAnswers.value
  if (!a || !a.length) return 'low'
  const t = a.reduce((s, v) => s + v, 0)
  const p = t / (a.length * 3)
  return p < 0.35 ? 'low' : p < 0.65 ? 'mid' : 'high'
})

const roomResult = computed(() =>
  activeRoom.value ? activeRoom.value.results[scoreLevel.value] : null
)

const scoreCfg = computed(() => SCORE_CFG[scoreLevel.value])

const summaryScores = computed(() =>
  Object.entries(allResults.value).map(([id, a]) => {
    const t = a.reduce((s, v) => s + v, 0)
    const p = t / (a.length * 3)
    return { id, icon: ROOMS[id].icon, name: ROOMS[id].name, level: p < 0.35 ? 'low' : p < 0.65 ? 'mid' : 'high' }
  })
)

const summaryMsg = computed(() => {
  const h = summaryScores.value.filter(s => s.level === 'high').length
  if (h >= 3) return 'Significant room to grow — but you now know exactly where.'
  if (h >= 1) return 'A few rooms need attention. The rest you are handling well.'
  return 'Your household is running more consciously than most.'
})

// ── Methods ──────────────────────────────────────────────────────────────────
function statusOf(id) {
  if (completed.value.has(id)) return 'done'
  if (activeRoom.value?.id === id && panelOpen.value) return 'active'
  if (hovered.value === id) return 'hovered'
  return 'idle'
}

function openRoom(id) {
  activeRoom.value = ROOMS[id]
  if (completed.value.has(id) && allResults.value[id]) {
    currentAnswers.value = allResults.value[id]
    panelMode.value = 'results'
  } else {
    selectedAnswers.value = new Array(ROOMS[id].questions.length).fill(null)
    panelMode.value = 'questions'
  }
  panelOpen.value = true
}

function selectAnswer(qi, oi) {
  const arr = [...selectedAnswers.value]
  arr[qi] = oi
  selectedAnswers.value = arr
}

function submitAnswers() {
  if (answeredCount.value < activeRoom.value.questions.length) return
  const answers = [...selectedAnswers.value]
  const nc = new Set([...completed.value, activeRoom.value.id])
  completed.value = nc
  allResults.value = { ...allResults.value, [activeRoom.value.id]: answers }
  currentAnswers.value = answers
  panelMode.value = 'results'
}

function handleBack() {
  if (completed.value.size === ROOM_ORDER.length) {
    panelMode.value = 'summary'
  } else {
    closePanel()
  }
}

function retakeRoom() {
  selectedAnswers.value = new Array(activeRoom.value.questions.length).fill(null)
  panelMode.value = 'questions'
}

function viewRoomResult(id) {
  activeRoom.value = ROOMS[id]
  currentAnswers.value = allResults.value[id]
  panelMode.value = 'results'
}

function closePanel() {
  panelOpen.value = false
  setTimeout(() => { activeRoom.value = null }, 380)
}

function reset() {
  activeRoom.value = null
  panelOpen.value = false
  completed.value = new Set()
  allResults.value = {}
  selectedAnswers.value = []
  currentAnswers.value = null
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
