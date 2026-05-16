<template>
  <div style="height:calc(100vh - 3.75rem); display:flex; flex-direction:column; background:#f7f9f7; font-family:'Inter',sans-serif; overflow:hidden;">

    <!-- ══ PAGE HEADER ══ -->
    <header style="flex-shrink:0; background:#ffffff; border-bottom:1px solid #eef1ee; padding:1rem 1.75rem 0.875rem;">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:1rem;">
        <div>
          <p style="font-size:0.5rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#9ca3af; margin:0 0 0.2rem;">Home Audit</p>
          <h1 style="font-size:1.25rem; font-weight:800; color:#111827; margin:0 0 0.15rem; letter-spacing:-0.02em;">Waste Hotspot Audit</h1>
          <p style="font-size:0.75rem; color:#6b7280; margin:0; line-height:1.4;">Explore each room to discover your top waste hotspots and get personalised recommendations.</p>
        </div>
        <div style="display:flex; align-items:center; gap:0.5rem; flex-shrink:0;">
          <div style="display:flex; align-items:center; gap:0.35rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:9999px; padding:0.28rem 0.75rem;">
            <span style="font-size:0.75rem;">🌿</span>
            <span style="font-size:0.8125rem; font-weight:800; color:#15803d;">{{ sustainabilityScore }}</span>
            <span style="font-size:0.5625rem; color:#6b7280;">/100 eco score</span>
          </div>
          <div style="display:flex; align-items:center; gap:0.35rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:9999px; padding:0.28rem 0.75rem;">
            <span style="font-size:0.75rem;">🏠</span>
            <span style="font-size:0.8125rem; font-weight:800; color:#15803d;">{{ completedPct }}%</span>
            <span style="font-size:0.5625rem; color:#6b7280;">audited</span>
          </div>
          <button style="display:flex; align-items:center; gap:0.35rem; background:white; border:1px solid #e5e7eb; border-radius:9999px; padding:0.28rem 0.75rem; cursor:pointer; font-family:Inter,sans-serif; transition:border-color 0.15s;">
            <span style="font-size:0.75rem; color:#9ca3af;">ⓘ</span>
            <span style="font-size:0.8125rem; color:#374151; font-weight:500;">Need help?</span>
          </button>
        </div>
      </div>
    </header>

    <!-- ══ BODY: 3-column layout ══ -->
    <div style="flex:1; display:flex; overflow:hidden; min-height:0;">

      <!-- ── LEFT SIDEBAR ── -->
      <aside style="width:206px; flex-shrink:0; border-right:1px solid #eef1ee; background:#ffffff; display:flex; flex-direction:column; overflow:hidden;">

        <!-- How it works -->
        <div style="padding:1.125rem 1rem 0.875rem; border-bottom:1px solid #f3f4f6;">
          <p style="font-size:0.4375rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#9ca3af; margin:0 0 0.75rem;">How it works</p>
          <div style="display:flex; flex-direction:column; gap:0.7rem;">
            <div v-for="(step, i) in HOW_IT_WORKS" :key="i" style="display:flex; align-items:flex-start; gap:0.5625rem;">
              <div style="width:1.375rem; height:1.375rem; border-radius:50%; background:#f0fdf4; border:1.5px solid #bbf7d0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px;">
                <span style="font-size:0.5rem; font-weight:800; color:#15803d;">{{ i+1 }}</span>
              </div>
              <div style="padding-top:1px;">
                <p style="font-size:0.6875rem; font-weight:700; color:#374151; margin:0 0 1px;">{{ step.title }}</p>
                <p style="font-size:0.625rem; color:#9ca3af; margin:0; line-height:1.5;">{{ step.body }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Hotspot category legend -->
        <div style="padding:0.875rem 1rem; border-bottom:1px solid #f3f4f6;">
          <p style="font-size:0.4375rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#9ca3af; margin:0 0 0.5rem;">5 Hotspot Categories</p>
          <div style="display:flex; flex-direction:column; gap:0.3rem;">
            <div v-for="(cat, key) in HOTSPOT_CATEGORIES" :key="key" style="display:flex; align-items:center; gap:0.4rem;">
              <span style="font-size:0.75rem; flex-shrink:0;">{{ cat.icon }}</span>
              <span style="font-size:0.5625rem; color:#6b7280; line-height:1.4;">{{ cat.label }}</span>
            </div>
          </div>
        </div>

        <!-- Contextual tip — changes based on active room -->
        <div style="flex:1; padding:1rem; background:linear-gradient(160deg,#f0fdf4 0%,#dcfce7 100%); display:flex; flex-direction:column; justify-content:space-between; overflow:hidden;">
          <div>
            <p style="font-size:0.4375rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#15803d; margin:0 0 0.5rem;">
              {{ panelOpen && activeRoom ? activeRoom.name + ' tip' : 'Tip' }}
            </p>
            <p style="font-size:0.6875rem; color:#166534; line-height:1.65; margin:0;">{{ contextualTip.text }}</p>
          </div>
          <div style="font-size:2rem; margin-top:0.75rem; line-height:1;">{{ contextualTip.emoji }}</div>
        </div>

      </aside>

      <!-- ── CENTER: HOUSE ── always flex:1, takes all remaining space -->
      <div style="flex:1; position:relative; overflow:hidden; background:#ffffff; display:flex; align-items:center; justify-content:center; min-width:0;">
        <div style="position:relative; height:100%; aspect-ratio:4/3; max-width:100%;">

          <img :src="houseImg" alt="House" style="position:absolute; inset:0; width:100%; height:100%; object-fit:contain; mix-blend-mode:multiply;"/>

          <!-- SVG: invisible hit areas only (no visual rendering) -->
          <svg style="position:absolute;inset:0;width:100%;height:100%;z-index:5;" viewBox="0 0 100 75" preserveAspectRatio="none">
            <template v-if="DEBUG_ROOM_MASKS">
              <g v-for="id in ROOM_ORDER" :key="id">
                <path :d="ROOM_PATHS[id]" :fill="DEBUG_ROOM_COLORS[id]" fill-opacity="0.34" :stroke="DEBUG_ROOM_STROKES[id]" stroke-width="0.9" stroke-linejoin="round" class="room-debug-mask"/>
                <g v-for="(pt,pi) in ROOM_POINTS[id]" :key="`${id}-pt-${pi}`">
                  <circle :cx="pt[0]" :cy="pt[1]" r="0.86" fill="#fff" :stroke="DEBUG_ROOM_STROKES[id]" stroke-width="0.45" style="pointer-events:none;"/>
                  <text :x="pt[0]+0.9" :y="pt[1]-0.9" font-size="1.65" font-family="Inter,sans-serif" font-weight="800" :fill="DEBUG_ROOM_STROKES[id]" style="paint-order:stroke;stroke:#fff;stroke-width:0.45;pointer-events:none;">{{ pi+1 }}</text>
                </g>
              </g>
            </template>
            <path v-for="id in ROOM_ORDER" :key="id" :d="ROOM_PATHS[id]"
              class="room-hit-area" @click="openRoom(id)" @mouseenter="hovered=id" @mouseleave="hovered=null"/>
          </svg>

          <!-- Room label pills — glow lives here -->
          <div v-for="id in ROOM_ORDER" :key="'p-'+id"
            :style="{
              position:'absolute', left:CALLOUTS[id].lx+'%', top:CALLOUTS[id].ly+'%',
              transform:`translate(-50%,-50%) scale(${statusOf(id)==='active'?1.08:statusOf(id)==='hovered'?1.04:1})`,
              background: statusOf(id)==='active'
                ? 'rgba(10,15,20,0.92)'
                : statusOf(id)==='done'
                  ? 'rgba(6,40,26,0.88)'
                  : statusOf(id)==='hovered'
                    ? 'rgba(10,15,20,0.82)'
                    : 'rgba(255,255,255,0.82)',
              backdropFilter:'blur(16px)', WebkitBackdropFilter:'blur(16px)',
              border:'none',
              borderRadius:'20px', padding:'4px 10px', cursor:'pointer',
              boxShadow: statusOf(id)==='active'
                ? '0 0 8px rgba(52,211,153,0.9), 0 0 22px rgba(52,211,153,0.55), 0 0 48px rgba(16,185,129,0.28), 0 0 80px rgba(16,185,129,0.1)'
                : statusOf(id)==='hovered'
                  ? '0 0 6px rgba(52,211,153,0.65), 0 0 16px rgba(52,211,153,0.38), 0 0 36px rgba(16,185,129,0.18)'
                  : statusOf(id)==='done'
                    ? '0 0 5px rgba(52,211,153,0.5), 0 0 14px rgba(52,211,153,0.28), 0 0 28px rgba(16,185,129,0.12)'
                    : '0 1px 6px rgba(0,0,0,0.08)',
              transition:'all 0.25s cubic-bezier(0.4,0,0.2,1)', zIndex:10,
              display:'flex', alignItems:'center', gap:'4px', whiteSpace:'nowrap',
            }"
            @click="openRoom(id)" @mouseenter="hovered=id" @mouseleave="hovered=null">
            <span style="font-size:8.5px;line-height:1;">{{ statusOf(id)==='done'?'✓':ROOMS[id].icon }}</span>
            <span :style="{ fontSize:'9.5px', fontWeight:700, letterSpacing:'0.01em', fontFamily:'Inter,sans-serif', color:(statusOf(id)==='done'||statusOf(id)==='active'||statusOf(id)==='hovered')?'#fff':'#1f2937' }">{{ ROOMS[id].name }}</span>
            <span v-if="statusOf(id)==='active'" style="font-size:7.5px; color:rgba(110,231,183,0.9); font-weight:600; letter-spacing:0.02em;">●</span>
          </div>

        </div>
      </div>

      <!-- ── RIGHT PANEL ── fixed widths per mode -->
      <aside :style="{
        flex: '0 0 ' + (panelOpen && panelMode==='questions' ? '480px' : panelOpen ? '380px' : '296px'),
        flexShrink: 0,
        borderLeft: '1px solid #eef1ee', background: '#ffffff',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        transition: 'flex 0.38s cubic-bezier(0.4,0,0.2,1)'
      }">

        <!-- ─ OVERVIEW (default: no panel open) ─ -->
        <template v-if="!panelOpen">

          <!-- Eco Score ring -->
          <div style="padding:1.125rem 1.125rem 1rem; border-bottom:1px solid #f3f4f6;">
            <p style="font-size:0.4375rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#9ca3af; margin:0 0 0.75rem;">Household Eco Score</p>
            <div style="display:flex; align-items:center; gap:0.875rem;">
              <div style="position:relative; width:68px; height:68px; flex-shrink:0;">
                <svg width="68" height="68" viewBox="0 0 68 68">
                  <circle cx="34" cy="34" r="27" fill="none" stroke="#f0f9f4" stroke-width="5.5"/>
                  <circle cx="34" cy="34" r="27" fill="none" stroke="#16a34a" stroke-width="5.5"
                    stroke-linecap="round"
                    :stroke-dasharray="170"
                    :stroke-dashoffset="170*(1-sustainabilityScore/100)"
                    transform="rotate(-90 34 34)"
                    style="transition:stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1);"/>
                </svg>
                <div style="position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;">
                  <span style="font-size:1.125rem;font-weight:800;color:#111827;line-height:1;">{{ sustainabilityScore }}</span>
                  <span style="font-size:0.4375rem;color:#9ca3af;font-weight:600;">/100</span>
                </div>
              </div>
              <div style="flex:1;min-width:0;">
                <p style="font-size:0.75rem;font-weight:600;color:#111827;margin:0 0 0.375rem;line-height:1.45;">{{ scoreMessage }}</p>
                <div style="display:flex;align-items:center;gap:0.375rem;">
                  <div style="flex:1;height:3px;background:#f0f9f4;border-radius:9999px;overflow:hidden;">
                    <div :style="{ width:completedPct+'%', height:'100%', background:'linear-gradient(90deg,#4ade80,#16a34a)', borderRadius:'9999px', transition:'width 0.7s ease' }"/>
                  </div>
                  <span style="font-size:0.5rem;font-weight:700;color:#15803d;white-space:nowrap;">{{ completed.size }}/6 rooms</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Room Status list -->
          <div style="padding:0.875rem 1.125rem; border-bottom:1px solid #f3f4f6;">
            <p style="font-size:0.4375rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#9ca3af; margin:0 0 0.5rem;">Room Status</p>
            <div style="display:flex; flex-direction:column; gap:0.2rem;">
              <div v-for="id in ROOM_ORDER" :key="'rs-'+id"
                :style="{
                  display:'flex', alignItems:'center', gap:'0.5625rem',
                  padding:'0.4375rem 0.5625rem', borderRadius:'10px', cursor:'pointer',
                  background: completed.has(id) ? '#f0fdf4' : 'transparent',
                  border:`1px solid ${completed.has(id)?'#bbf7d0':'transparent'}`,
                  transition:'all 0.15s'
                }"
                @click="openRoom(id)" @mouseenter="hovered=id" @mouseleave="hovered=null">
                <div :style="{ width:'1.625rem', height:'1.625rem', borderRadius:'7px', background:completed.has(id)?'#dcfce7':'#f3f4f6', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'12px', flexShrink:0 }">
                  {{ completed.has(id) ? '✓' : ROOMS[id].icon }}
                </div>
                <span style="flex:1;font-size:0.8125rem;font-weight:600;color:#111827;">{{ ROOMS[id].name }}</span>
                <span :style="{
                  fontSize:'0.5rem', fontWeight:700, padding:'2px 7px', borderRadius:'9999px',
                  background: completed.has(id)?'#dcfce7':'#f3f4f6',
                  color: completed.has(id)?'#15803d':'#9ca3af'
                }">{{ completed.has(id)?'Complete':'Not started' }}</span>
              </div>
            </div>
          </div>

          <!-- Impact Preview -->
          <div style="padding:0.875rem 1.125rem; flex:1; overflow-y:auto;">
            <p style="font-size:0.4375rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#9ca3af; margin:0 0 0.2rem;">Your Impact Preview</p>
            <p style="font-size:0.625rem; color:#9ca3af; margin:0 0 0.75rem; line-height:1.5;">{{ completed.size>0 ? 'Estimated based on your audit so far.' : 'Complete your audit to unlock your potential impact.' }}</p>
            <div :style="{ filter:completed.size===0?'blur(5px)':'none', transition:'filter 0.7s ease', userSelect:completed.size===0?'none':'auto' }">
              <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:0.4rem; margin-bottom:0.625rem;">
                <div v-for="m in METRICS" :key="m.label" style="background:#f8faf8; border:1px solid #f0f0f0; border-radius:10px; padding:0.5625rem 0.375rem; text-align:center;">
                  <div style="font-size:1.125rem; margin-bottom:0.2rem;">{{ m.icon }}</div>
                  <div style="font-size:0.875rem; font-weight:800; color:#111827; line-height:1;">{{ m.value }}</div>
                  <div style="font-size:0.4375rem; color:#9ca3af; margin-top:2px; line-height:1.4;">{{ m.label }}</div>
                </div>
              </div>
            </div>
            <p v-if="completed.size===0" style="font-size:0.625rem; color:#9ca3af; text-align:center; margin:0.5rem 0 0.75rem; line-height:1.55;">Small changes in your home can create a big impact on our planet.</p>
            <div style="display:flex; align-items:center; justify-content:space-between; padding:0.5625rem 0.75rem; background:#f8faf8; border:1px solid #eef1ee; border-radius:9px; cursor:pointer;">
              <span style="font-size:0.625rem; color:#374151; font-weight:500;">ⓘ How is this calculated?</span>
              <span style="color:#9ca3af; font-size:0.875rem;">›</span>
            </div>
          </div>

        </template>

        <!-- ─ QUESTIONNAIRE: 2-column card grid ─ -->
        <template v-else-if="panelMode==='questions' && activeRoom">
          <div style="display:flex;flex-direction:column;height:100%;">

            <!-- Header -->
            <div style="padding:0.875rem 1.25rem 0.75rem; border-bottom:1px solid #f0f0f0; flex-shrink:0;">
              <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.875rem;">
                <div style="display:flex;align-items:center;gap:0.625rem;">
                  <button @click="closePanel" style="width:1.75rem;height:1.75rem;border-radius:50%;border:1.5px solid #e5e7eb;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.6875rem;color:#6b7280;font-family:Inter,sans-serif;flex-shrink:0;">←</button>
                  <div style="width:2.25rem;height:2.25rem;border-radius:10px;background:#f0fdf4;border:1px solid #dcfce7;display:flex;align-items:center;justify-content:center;font-size:1.125rem;flex-shrink:0;">{{ activeRoom.icon }}</div>
                  <div>
                    <p style="font-size:1rem;font-weight:800;color:#111827;margin:0;line-height:1.2;letter-spacing:-0.01em;">{{ activeRoom.name }}</p>
                    <p style="font-size:0.625rem;color:#9ca3af;margin:0;">{{ activeRoom.label }}</p>
                  </div>
                </div>
                <div style="display:flex;align-items:center;gap:0.5rem;">
                  <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:9999px;padding:3px 10px;">
                    <span style="font-size:0.6875rem;font-weight:700;color:#15803d;">{{ answeredCount }}/{{ activeRoom.questions.length }}</span>
                  </div>
                  <button @click="closePanel" style="width:1.75rem;height:1.75rem;border-radius:50%;border:1.5px solid #e5e7eb;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.6875rem;color:#6b7280;font-family:Inter,sans-serif;">✕</button>
                </div>
              </div>
              <!-- Progress segments -->
              <div style="display:flex;gap:4px;">
                <div v-for="(_,i) in activeRoom.questions" :key="i"
                  :style="{ flex:1, height:'4px', borderRadius:'9999px', transition:'background 0.35s',
                    background: selectedAnswers[i]!==null&&selectedAnswers[i]!==undefined ? '#16a34a' : '#eef1ee' }"/>
              </div>
            </div>

            <!-- 2-column question grid -->
            <div style="flex:1;overflow-y:auto;padding:0.875rem 1.25rem 0.75rem;">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.625rem;align-items:start;">

                <div v-for="(q, qi) in activeRoom.questions" :key="qi"
                  :style="{
                    gridColumn: qi === activeRoom.questions.length - 1 && activeRoom.questions.length % 2 !== 0 ? 'span 2' : 'span 1',
                    background: selectedAnswers[qi]!==null&&selectedAnswers[qi]!==undefined ? '#f0fdf4' : '#fafafa',
                    border: `1.5px solid ${selectedAnswers[qi]!==null&&selectedAnswers[qi]!==undefined?'#bbf7d0':'#f0f0f0'}`,
                    borderRadius:'12px', padding:'0.75rem 0.75rem 0.625rem',
                    display:'flex', flexDirection:'column', gap:'0.625rem',
                    transition:'border-color 0.2s, background 0.2s',
                    boxShadow: selectedAnswers[qi]!==null&&selectedAnswers[qi]!==undefined ? '0 0 0 3px rgba(134,239,172,0.1)' : 'none'
                  }">

                  <!-- Card header: number badge + hotspot label -->
                  <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;">
                    <div :style="{
                      width:'1.375rem', height:'1.375rem', borderRadius:'50%', flexShrink:0,
                      background: selectedAnswers[qi]!==null&&selectedAnswers[qi]!==undefined ? '#16a34a' : '#e5e7eb',
                      display:'flex', alignItems:'center', justifyContent:'center',
                      transition:'background 0.2s'
                    }">
                      <span style="font-size:0.5rem;font-weight:800;color:white;">{{ qi+1 }}</span>
                    </div>
                    <div style="display:flex;align-items:center;gap:0.25rem;flex:1;min-width:0;">
                      <span style="font-size:0.625rem;line-height:1;flex-shrink:0;">{{ HOTSPOT_CATEGORIES[q.hotspot].icon }}</span>
                      <span style="font-size:0.4375rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{ HOTSPOT_CATEGORIES[q.hotspot].label }}</span>
                    </div>
                  </div>

                  <!-- Question text -->
                  <p style="font-size:0.75rem;font-weight:600;color:#111827;margin:0;line-height:1.55;">{{ q.q }}</p>

                  <!-- Options -->
                  <div style="display:flex;flex-direction:column;gap:0.25rem;">
                    <button v-for="(opt,oi) in q.options" :key="oi"
                      @click="selectAnswer(qi,oi)"
                      :style="{
                        display:'flex', alignItems:'center', gap:'0.5rem',
                        padding:'0.4375rem 0.625rem', borderRadius:'8px', textAlign:'left', width:'100%',
                        background: selectedAnswers[qi]===oi ? '#16a34a' : 'white',
                        border: `1.5px solid ${selectedAnswers[qi]===oi?'#16a34a':'#ebebeb'}`,
                        cursor:'pointer', transition:'all 0.15s', fontFamily:'Inter,sans-serif',
                      }">
                      <div :style="{
                        width:'12px', height:'12px', borderRadius:'50%', flexShrink:0,
                        border:`2px solid ${selectedAnswers[qi]===oi?'rgba(255,255,255,0.7)':'#d1d5db'}`,
                        background: selectedAnswers[qi]===oi ? 'rgba(255,255,255,0.25)' : 'white',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        transition:'all 0.15s'
                      }">
                        <div v-if="selectedAnswers[qi]===oi" style="width:4px;height:4px;border-radius:50%;background:white;"/>
                      </div>
                      <span :style="{ fontSize:'0.6875rem', color:selectedAnswers[qi]===oi?'white':'#374151', fontWeight:selectedAnswers[qi]===oi?600:400, lineHeight:'1.4', flex:1 }">{{ opt }}</span>
                    </button>
                  </div>

                </div>
              </div>
            </div>

            <!-- Submit bar -->
            <div style="padding:0.75rem 1.25rem;border-top:1px solid #f0f0f0;flex-shrink:0;display:flex;align-items:center;gap:0.75rem;">
              <div style="flex:1;">
                <p style="font-size:0.625rem;color:#9ca3af;margin:0;line-height:1.4;">
                  {{ answeredCount === activeRoom.questions.length ? 'All questions answered — ready to submit.' : `${activeRoom.questions.length - answeredCount} question${activeRoom.questions.length-answeredCount>1?'s':''} left` }}
                </p>
              </div>
              <button @click="submitAnswers" :disabled="answeredCount<activeRoom.questions.length"
                :style="{
                  border:'none', borderRadius:'11px', padding:'10px 20px', whiteSpace:'nowrap',
                  fontSize:'0.875rem', fontWeight:800, fontFamily:'Inter,sans-serif',
                  cursor: answeredCount===activeRoom.questions.length?'pointer':'not-allowed',
                  background: answeredCount===activeRoom.questions.length ? 'linear-gradient(135deg,#16a34a,#166534)' : '#f3f4f6',
                  color: answeredCount===activeRoom.questions.length ? 'white' : '#9ca3af',
                  boxShadow: answeredCount===activeRoom.questions.length ? '0 4px 14px rgba(22,163,74,0.28)' : 'none',
                  transition:'all 0.2s', flexShrink:0
                }">
                Submit →
              </button>
            </div>

          </div>
        </template>

        <!-- ─ SUBMITTED: choice screen ─ -->
        <template v-else-if="panelMode==='submitted' && activeRoom">
          <div style="display:flex;flex-direction:column;height:100%;">

            <!-- Header -->
            <div style="padding:0.875rem 1.125rem;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;gap:0.5625rem;flex-shrink:0;">
              <div style="width:1.875rem;height:1.875rem;border-radius:8px;background:#f0fdf4;display:flex;align-items:center;justify-content:center;font-size:0.9375rem;flex-shrink:0;">{{ activeRoom.icon }}</div>
              <div style="flex:1;min-width:0;">
                <p style="font-size:0.875rem;font-weight:800;color:#111827;margin:0;line-height:1.2;">{{ activeRoom.name }} complete</p>
                <p style="font-size:0.5625rem;color:#9ca3af;margin:0;">{{ completed.size }} of {{ ROOM_ORDER.length }} rooms audited</p>
              </div>
              <button @click="closePanel" style="width:1.625rem;height:1.625rem;border-radius:50%;border:1.5px solid #e5e7eb;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.625rem;color:#6b7280;font-family:Inter,sans-serif;flex-shrink:0;">✕</button>
            </div>

            <!-- Central success visual -->
            <div style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.25rem 1.25rem 0.75rem;gap:1rem;">

              <!-- Animated checkmark -->
              <div style="position:relative;width:72px;height:72px;">
                <div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#dcfce7,#bbf7d0);border:2px solid #86efac;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 8px rgba(134,239,172,0.12),0 4px 24px rgba(74,222,128,0.2);">
                  <span style="font-size:2rem;line-height:1;">✓</span>
                </div>
              </div>

              <!-- Message -->
              <div style="text-align:center;">
                <p style="font-size:1rem;font-weight:800;color:#111827;margin:0 0 0.375rem;letter-spacing:-0.01em;">
                  {{ completed.size === ROOM_ORDER.length ? 'All rooms complete!' : 'Room audited!' }}
                </p>
                <p style="font-size:0.75rem;color:#6b7280;line-height:1.55;margin:0;max-width:220px;">
                  {{ completed.size === ROOM_ORDER.length
                    ? 'Your full waste hotspot profile is ready to view.'
                    : `${ROOM_ORDER.length - completed.size} room${ROOM_ORDER.length - completed.size > 1 ? 's' : ''} left — or see this room\'s results first.` }}
                </p>
              </div>

              <!-- Room progress strip -->
              <div style="display:flex;align-items:center;gap:0.3rem;margin-top:0.25rem;">
                <template v-for="(id, i) in ROOM_ORDER" :key="'sp-'+id">
                  <div :style="{
                    width: completed.has(id) ? '1.5rem' : '0.35rem',
                    height:'0.35rem', borderRadius:'9999px', transition:'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                    background: completed.has(id) ? '#16a34a' : '#e5e7eb'
                  }"/>
                  <div v-if="i < ROOM_ORDER.length - 1" :style="{ width:'0.625rem', height:'1.5px', borderRadius:'9999px', background: completed.has(id) ? '#4ade80' : '#e5e7eb', transition:'background 0.4s' }"/>
                </template>
              </div>

              <!-- Next room preview (if not last) -->
              <div v-if="completed.size < ROOM_ORDER.length"
                style="display:flex;align-items:center;gap:0.5rem;background:#f8faf8;border:1px solid #eef1ee;border-radius:10px;padding:0.5625rem 0.75rem;width:100%;box-sizing:border-box;">
                <span style="font-size:1.125rem;flex-shrink:0;">{{ ROOMS[nextRoom].icon }}</span>
                <div style="flex:1;min-width:0;">
                  <p style="font-size:0.4375rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;margin:0 0 2px;">Up next</p>
                  <p style="font-size:0.8125rem;font-weight:700;color:#111827;margin:0;">{{ ROOMS[nextRoom].name }}</p>
                </div>
                <span style="font-size:0.5625rem;color:#9ca3af;background:#f0f0f0;border-radius:9999px;padding:2px 7px;font-weight:600;">{{ ROOMS[nextRoom].questions.length }} questions</span>
              </div>

            </div>

            <!-- Two action buttons -->
            <div style="padding:0.875rem 1.125rem;border-top:1px solid #f3f4f6;flex-shrink:0;display:flex;flex-direction:column;gap:0.4375rem;">

              <!-- Primary: continue -->
              <button @click="continueFromSubmitted"
                style="width:100%;border:none;border-radius:11px;padding:12px;font-size:0.875rem;font-weight:800;color:white;cursor:pointer;font-family:Inter,sans-serif;background:linear-gradient(135deg,#16a34a,#166534);box-shadow:0 4px 14px rgba(22,163,74,0.28);transition:opacity 0.15s;display:flex;align-items:center;justify-content:center;gap:0.375rem;">
                <span>{{ completed.size === ROOM_ORDER.length ? 'See Full Hotspot Profile' : `Next: ${ROOMS[nextRoom].name}` }}</span>
                <span style="opacity:0.85;">→</span>
              </button>

              <!-- Secondary: see this room's result -->
              <button @click="panelMode = 'results'"
                style="width:100%;background:white;border:1.5px solid #e5e7eb;border-radius:11px;padding:10px;font-size:0.8125rem;font-weight:600;color:#374151;cursor:pointer;font-family:Inter,sans-serif;transition:border-color 0.15s;display:flex;align-items:center;justify-content:center;gap:0.375rem;">
                <span>See {{ activeRoom.name }} results</span>
                <span style="font-size:0.75rem;color:#9ca3af;">›</span>
              </button>

            </div>
          </div>
        </template>

        <!-- ─ RESULTS (per room) ─ -->
        <template v-else-if="panelMode==='results' && activeRoom">
          <div style="display:flex; flex-direction:column; height:100%;">

            <!-- Room result header -->
            <div style="padding:0.875rem 1.125rem; border-bottom:1px solid #f3f4f6; display:flex; align-items:center; gap:0.5625rem; flex-shrink:0;">
              <div style="width:1.875rem;height:1.875rem;border-radius:8px;background:#f0fdf4;display:flex;align-items:center;justify-content:center;font-size:0.9375rem;flex-shrink:0;">{{ activeRoom.icon }}</div>
              <p style="flex:1;font-size:0.875rem;font-weight:800;color:#111827;margin:0;">{{ activeRoom.name }} Results</p>
              <div :style="{ background:SCORE_CFG[scoreLevel].bg, border:`1px solid ${SCORE_CFG[scoreLevel].color}44`, borderRadius:'9999px', padding:'3px 9px', flexShrink:0 }">
                <span :style="{ fontSize:'0.5rem', fontWeight:700, color:SCORE_CFG[scoreLevel].color }">{{ SCORE_CFG[scoreLevel].label }}</span>
              </div>
              <button @click="closePanel" style="width:1.625rem;height:1.625rem;border-radius:50%;border:1.5px solid #e5e7eb;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.625rem;color:#6b7280;font-family:Inter,sans-serif;flex-shrink:0;">✕</button>
            </div>

            <div style="flex:1;overflow-y:auto;padding:0.875rem 1.125rem;">

              <!-- Top hotspot badge for this room -->
              <div v-if="topRoomHotspot" style="display:flex;align-items:center;gap:0.625rem;background:#f8faf8;border:1px solid #eef1ee;border-radius:10px;padding:0.625rem 0.75rem;margin-bottom:0.75rem;">
                <span style="font-size:1.375rem;flex-shrink:0;">{{ topRoomHotspot.icon }}</span>
                <div>
                  <p style="font-size:0.4375rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;margin:0 0 2px;">Room hotspot detected</p>
                  <p style="font-size:0.8125rem;font-weight:800;color:#111827;margin:0;">{{ topRoomHotspot.label }}</p>
                </div>
              </div>

              <!-- Result summary card -->
              <div style="background:#f8faf8;border:1px solid #eef1ee;border-radius:12px;padding:0.875rem;margin-bottom:0.625rem;">
                <h4 style="font-size:0.875rem;font-weight:800;color:#111827;margin:0 0 0.3rem;">{{ roomResult.title }}</h4>
                <p style="font-size:0.75rem;color:#4b5563;line-height:1.65;margin:0;">{{ roomResult.body }}</p>
              </div>

              <!-- What to try -->
              <div style="background:#f8faf8;border:1px solid #eef1ee;border-radius:12px;padding:0.875rem;">
                <p style="font-size:0.4375rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9ca3af;margin:0 0 0.625rem;">What to try</p>
                <div v-for="(tip,i) in roomResult.tips" :key="i" :style="{ display:'flex', gap:'0.5625rem', marginBottom:i<roomResult.tips.length-1?'0.625rem':0 }">
                  <div style="width:1.25rem;height:1.25rem;border-radius:50%;background:#f0fdf4;border:1px solid #bbf7d0;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
                    <span style="font-size:0.4375rem;font-weight:800;color:#15803d;">{{ i+1 }}</span>
                  </div>
                  <p style="font-size:0.75rem;color:#374151;line-height:1.6;margin:0;">{{ tip }}</p>
                </div>
              </div>

              <!-- Hotspot progress teaser (when not all rooms done) -->
              <div v-if="completed.size < ROOM_ORDER.length" style="margin-top:0.625rem;padding:0.625rem 0.75rem;background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:1px solid #bbf7d0;border-radius:10px;">
                <p style="font-size:0.625rem;color:#166534;font-weight:600;margin:0 0 2px;">{{ ROOM_ORDER.length - completed.size }} room{{ ROOM_ORDER.length-completed.size>1?'s':'' }} remaining</p>
                <p style="font-size:0.5625rem;color:#15803d;margin:0;line-height:1.5;">Complete all rooms to unlock your full waste hotspot profile and ranked category results.</p>
              </div>

            </div>

            <div style="padding:0.75rem 1.125rem;border-top:1px solid #f3f4f6;flex-shrink:0;display:flex;flex-direction:column;gap:0.3rem;">
              <button @click="handleBack" style="width:100%;background:linear-gradient(135deg,#16a34a,#166534);border:none;border-radius:11px;padding:11px;font-size:0.875rem;font-weight:800;color:#fff;cursor:pointer;font-family:Inter,sans-serif;box-shadow:0 4px 14px rgba(22,163,74,0.28);">
                {{ completed.size<ROOM_ORDER.length ? '← Back to House' : 'See Hotspot Profile →' }}
              </button>
              <button @click="retakeRoom" style="width:100%;background:transparent;border:1.5px solid #e5e7eb;border-radius:11px;padding:9px;font-size:0.75rem;font-weight:600;color:#6b7280;cursor:pointer;font-family:Inter,sans-serif;">Redo this room</button>
            </div>
          </div>
        </template>

        <!-- ─ SUMMARY / HOTSPOT PROFILE ─ -->
        <template v-else-if="panelMode==='summary'">
          <div style="display:flex;flex-direction:column;height:100%;">

            <!-- Header -->
            <div style="padding:1rem 1.125rem;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
              <div>
                <h3 style="font-size:0.9375rem;font-weight:800;color:#111827;margin:0 0 2px;">Your Waste Profile</h3>
                <p style="font-size:0.5625rem;color:#9ca3af;margin:0;">Hotspots ranked by severity</p>
              </div>
              <button @click="closePanel" style="width:1.625rem;height:1.625rem;border-radius:50%;border:1.5px solid #e5e7eb;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.625rem;color:#6b7280;font-family:Inter,sans-serif;">✕</button>
            </div>

            <p style="font-size:0.75rem;color:#6b7280;margin:0.75rem 1.125rem 0.5rem;line-height:1.5;flex-shrink:0;">{{ summaryMsg }}</p>

            <!-- Scrollable content -->
            <div style="flex:1;overflow-y:auto;padding:0 1.125rem 0.75rem;">

              <!-- PRIMARY HOTSPOT -->
              <div v-if="hotspotRanking[0]"
                style="background:#fff1f1;border:1.5px solid #fecaca;border-radius:14px;padding:1rem;margin-bottom:0.5rem;">
                <div style="display:flex;align-items:flex-start;gap:0.625rem;margin-bottom:0.5rem;">
                  <span style="font-size:1.5rem;flex-shrink:0;line-height:1;margin-top:2px;">{{ hotspotRanking[0].icon }}</span>
                  <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:center;gap:0.375rem;margin-bottom:2px;">
                      <span style="font-size:0.4375rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#dc2626;background:#fee2e2;padding:2px 6px;border-radius:4px;">Primary hotspot</span>
                    </div>
                    <p style="font-size:0.875rem;font-weight:800;color:#111827;margin:0;line-height:1.3;">{{ hotspotRanking[0].band.title }}</p>
                  </div>
                  <div style="background:white;border:1px solid #fecaca;border-radius:9999px;padding:3px 8px;flex-shrink:0;">
                    <span style="font-size:0.5625rem;font-weight:800;color:#dc2626;">{{ hotspotRanking[0].score }}<span style="color:#fca5a5;">/{{ hotspotRanking[0].maxScore }}</span></span>
                  </div>
                </div>
                <p style="font-size:0.6875rem;color:#374151;line-height:1.65;margin:0 0 0.625rem;">{{ hotspotRanking[0].band.body }}</p>
                <div style="display:flex;flex-direction:column;gap:0.35rem;">
                  <div v-for="(tip,i) in hotspotRanking[0].band.tips" :key="i" style="display:flex;gap:0.5rem;align-items:flex-start;">
                    <div style="width:4px;height:4px;border-radius:50%;background:#dc2626;margin-top:7px;flex-shrink:0;"/>
                    <p style="font-size:0.6875rem;color:#374151;line-height:1.55;margin:0;">{{ tip }}</p>
                  </div>
                </div>
              </div>

              <!-- SECONDARY HOTSPOT -->
              <div v-if="hotspotRanking[1]"
                style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:14px;padding:0.875rem;margin-bottom:0.625rem;">
                <div style="display:flex;align-items:flex-start;gap:0.5rem;margin-bottom:0.375rem;">
                  <span style="font-size:1.125rem;flex-shrink:0;line-height:1;margin-top:2px;">{{ hotspotRanking[1].icon }}</span>
                  <div style="flex:1;min-width:0;">
                    <div style="margin-bottom:2px;">
                      <span style="font-size:0.4375rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#d97706;background:#fef3c7;padding:2px 6px;border-radius:4px;">Secondary hotspot</span>
                    </div>
                    <p style="font-size:0.8125rem;font-weight:800;color:#111827;margin:0;line-height:1.3;">{{ hotspotRanking[1].band.title }}</p>
                  </div>
                  <div style="background:white;border:1px solid #fde68a;border-radius:9999px;padding:3px 8px;flex-shrink:0;">
                    <span style="font-size:0.5625rem;font-weight:800;color:#d97706;">{{ hotspotRanking[1].score }}<span style="color:#fbbf24;">/{{ hotspotRanking[1].maxScore }}</span></span>
                  </div>
                </div>
                <p style="font-size:0.6875rem;color:#374151;line-height:1.6;margin:0 0 0.5rem;">{{ hotspotRanking[1].band.body }}</p>
                <div style="display:flex;flex-direction:column;gap:0.3rem;">
                  <div v-for="(tip,i) in hotspotRanking[1].band.tips.slice(0,2)" :key="i" style="display:flex;gap:0.5rem;align-items:flex-start;">
                    <div style="width:4px;height:4px;border-radius:50%;background:#d97706;margin-top:7px;flex-shrink:0;"/>
                    <p style="font-size:0.625rem;color:#374151;line-height:1.55;margin:0;">{{ tip }}</p>
                  </div>
                </div>
              </div>

              <!-- All 5 categories ranked -->
              <p style="font-size:0.4375rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#9ca3af;margin:0.5rem 0 0.375rem;">All categories ranked</p>
              <div v-for="(cat, i) in hotspotRanking" :key="cat.key"
                style="display:flex;align-items:center;gap:0.5rem;background:#f8faf8;border:1px solid #eef1ee;border-radius:9px;padding:0.4375rem 0.625rem;margin-bottom:0.25rem;">
                <span style="font-size:0.5rem;font-weight:800;color:#9ca3af;width:14px;text-align:center;flex-shrink:0;">#{{ i+1 }}</span>
                <span style="font-size:0.875rem;flex-shrink:0;">{{ cat.icon }}</span>
                <span style="font-size:0.75rem;font-weight:600;color:#111827;flex:1;min-width:0;line-height:1.3;">{{ cat.label }}</span>
                <div :style="{ background:SCORE_CFG[cat.level].bg, border:`1px solid ${SCORE_CFG[cat.level].color}44`, borderRadius:'9999px', padding:'2px 8px', flexShrink:0 }">
                  <span :style="{ fontSize:'0.4375rem', fontWeight:700, color:SCORE_CFG[cat.level].color }">{{ cat.score }}/{{ cat.maxScore }}</span>
                </div>
              </div>

            </div>

            <!-- Footer -->
            <div style="padding:0.75rem 1.125rem;border-top:1px solid #f3f4f6;flex-shrink:0;">
              <button @click="reset" style="width:100%;background:transparent;border:1.5px solid #e5e7eb;border-radius:11px;padding:10px;font-size:0.8125rem;font-weight:700;color:#6b7280;cursor:pointer;font-family:Inter,sans-serif;">Start Over →</button>
            </div>
          </div>
        </template>

      </aside>
    </div>

    <!-- ══ BOTTOM CTA BAR ══ -->
    <div style="flex-shrink:0; background:#ffffff; border-top:1px solid #eef1ee; padding:0.75rem 1.75rem; display:flex; align-items:center; justify-content:space-between; gap:1rem;">
      <div style="display:flex; align-items:center; gap:0.75rem;">
        <div style="width:2.25rem;height:2.25rem;border-radius:50%;background:#f0fdf4;border:2px solid #bbf7d0;display:flex;align-items:center;justify-content:center;flex-shrink:0;">
          <span style="font-size:1.125rem;">🌿</span>
        </div>
        <div>
          <p style="font-size:0.875rem;font-weight:800;color:#111827;margin:0 0 1px;">{{ bottomCTA.title }}</p>
          <p style="font-size:0.6875rem;color:#6b7280;margin:0;line-height:1.4;">{{ bottomCTA.subtitle }}</p>
        </div>
      </div>

      <!-- Room progress dots -->
      <div style="display:flex; align-items:center; gap:0.375rem; flex:1; justify-content:center;">
        <template v-for="(id,i) in ROOM_ORDER" :key="'dot-'+id">
          <div @click="openRoom(id)"
            :style="{
              width: completed.has(id)?'1.625rem':'0.375rem', height:'0.375rem', borderRadius:'9999px', cursor:'pointer',
              background: completed.has(id)?'#16a34a':(activeRoom?.id===id&&panelOpen)?'#4ade80':'#e5e7eb',
              transition:'all 0.35s cubic-bezier(0.4,0,0.2,1)'
            }"/>
          <div v-if="i<ROOM_ORDER.length-1"
            :style="{ width:'0.875rem', height:'1.5px', background:completed.has(id)?'#4ade80':'#e5e7eb', borderRadius:'9999px', transition:'background 0.4s' }"/>
        </template>
      </div>

      <button @click="completed.size===ROOM_ORDER.length ? openSummary() : openRoom(nextRoom)"
        style="background:linear-gradient(135deg,#16a34a,#166534); border:none; border-radius:11px; padding:0.625rem 1.375rem; font-size:0.875rem; font-weight:800; color:white; cursor:pointer; font-family:Inter,sans-serif; box-shadow:0 4px 16px rgba(22,163,74,0.28); white-space:nowrap; transition:opacity 0.15s; flex-shrink:0;">
        {{ completed.size===ROOM_ORDER.length ? 'See Hotspot Profile →' : completed.size===0 ? 'Start your first room →' : 'Continue audit →' }}
      </button>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import houseImg from '/house-isometric.png'

// ── Debug ─────────────────────────────────────────────────────────────────────
const DEBUG_ROOM_MASKS = false  // set true to visualise & tune room polygons

// ── Static content ────────────────────────────────────────────────────────────
const HOW_IT_WORKS = [
  { title: 'Click on any room',      body: 'Select a room on the house to start your audit.' },
  { title: 'Answer 5 questions',     body: 'Honest answers work best — no right or wrong.' },
  { title: 'See your hotspots',      body: 'Discover your top waste patterns with personalised insights.' },
]

const ROOM_TIPS = {
  kitchen:  { emoji: '🍳', text: 'Kitchens are one of the top sources of household waste — from food and packaging to unplanned grocery purchases.' },
  bathroom: { emoji: '🚿', text: 'The average person owns 9+ bathroom products. Most go unused. Fewer products = less plastic, less spend.' },
  laundry:  { emoji: '🫧', text: 'Only running full loads saves up to 50% water and energy. Most people also use 2–3× the detergent needed.' },
  bedroom:  { emoji: '🛏️', text: 'Bedrooms generate quiet waste through unfinished items, early replacements and single-use storage materials.' },
  living:   { emoji: '🛋️', text: 'Living rooms see the most impulse purchasing — décor, accessories and entertainment items that quickly go unused.' },
  outdoor:  { emoji: '🌱', text: 'Outdoor spaces see high seasonal purchasing and single-use entertaining habits that add up quietly over time.' },
}

// ── Hotspot Categories (from doc) ─────────────────────────────────────────────
const HOTSPOT_CATEGORIES = {
  singleUse: {
    label: 'Single-use reliance',
    icon: '🗑️',
    bands: {
      low:  {
        title: 'Low single-use reliance',
        body: 'You\'ve significantly reduced your dependence on disposable items across your home.',
        tips: ['Carry a reusable bag, bottle and wrap as your daily baseline', 'Swap the last remaining disposable item in your highest-use room', 'Share the habit — it spreads quickly in households']
      },
      mid:  {
        title: 'Moderate single-use reliance',
        body: 'You\'re reducing single-use in some rooms but defaulting to disposables in others.',
        tips: ['Identify which room has the most single-use defaults', 'One conscious swap per room, one month at a time', 'Reusable wraps, cloths and containers solve most kitchen single-use habits']
      },
      high: {
        title: 'High single-use reliance',
        body: 'Single-use items are your primary waste hotspot across multiple rooms.',
        tips: ['Start with one high-frequency swap: paper towels to cloth', 'A starter reusable kit costs less than one month of disposables', 'Keep reusable items visible — if put away, they\'re forgotten']
      },
    }
  },
  refillReuse: {
    label: 'Missed refill & reuse',
    icon: '♻️',
    bands: {
      low:  {
        title: 'Strong reuse & refill habits',
        body: 'You\'re actively choosing reusable and refillable alternatives across most of your home.',
        tips: ['Note what you refill — the compound effect is larger than it feels', 'Look for refill options in any rooms not yet covered', 'Share your best swap with someone in your household']
      },
      mid:  {
        title: 'Some reuse & refill missed',
        body: 'You\'re reusing in some rooms but missing easy refill opportunities in others.',
        tips: ['Find the one room where you most often buy new instead of refilling', 'Bulk and concentrate options are now available for most products', 'Bathroom and laundry have the most improved reusable options available']
      },
      high: {
        title: 'Low reuse & refill engagement',
        body: 'Refillable and reusable alternatives exist for almost everything you\'re currently replacing.',
        tips: ['Start with the product you replace most often — find its refill version', 'Refill stations and bulk sections exist in most major supermarkets', 'Replacing one item per month compounds into permanent change within a year']
      },
    }
  },
  productWaste: {
    label: 'Product waste',
    icon: '📦',
    bands: {
      low:  {
        title: 'Low product waste',
        body: 'You tend to finish products before replacing them — one of the most impactful low-waste habits.',
        tips: ['A use-it-up week every few months clears hidden partial items', 'Visible storage makes finishing products easier across all rooms', 'Expiry awareness applies equally to food, bathroom and cleaning products']
      },
      mid:  {
        title: 'Moderate product waste',
        body: 'Some products are going unused or replaced before finishing across a few rooms.',
        tips: ['Designate a "use first" shelf in your kitchen and bathroom', 'Before buying anything new, check what\'s already at home', 'A monthly audit of unfinished products takes under 10 minutes']
      },
      high: {
        title: 'High product waste',
        body: 'Products going unfinished or unused is a significant pattern across multiple rooms.',
        tips: ['Start a use-what-you-have challenge — one room, one week', 'Unfinished products are already paid for: finishing them is pure saving', 'Smaller containers reduce the chance of items expiring before use']
      },
    }
  },
  disposal: {
    label: 'Disposal confusion',
    icon: '❓',
    bands: {
      low:  {
        title: 'Clear on disposal',
        body: 'You know how to dispose of most household waste correctly — a genuinely underrated sustainability skill.',
        tips: ['Share your recycling knowledge — most households don\'t have it', 'Check your council\'s site for any recent collection rule changes', 'Soft plastics and e-waste are the two most commonly misdisposed items']
      },
      mid:  {
        title: 'Some disposal gaps',
        body: 'You\'re confident about some waste streams but uncertain about others.',
        tips: ['Save your council\'s waste guide to your phone — it covers 90% of questions', 'Soft plastics, e-waste and garden chemicals all have specific drop-off points', 'One resolved disposal question per week removes confusion permanently']
      },
      high: {
        title: 'High disposal confusion',
        body: 'Uncertainty about correct disposal is leading to waste in the wrong stream across multiple rooms.',
        tips: ['Bookmark your council\'s recycling guide — it answers 90% of questions', 'REDcycle, TerraCycle and council drop-offs cover most hard-to-recycle items', 'A recycling cheat sheet on your bin takes an hour to make and lasts years']
      },
    }
  },
  overconsume: {
    label: 'Overconsumption',
    icon: '🛒',
    bands: {
      low:  {
        title: 'Intentional purchasing',
        body: 'You make considered purchasing decisions and rarely end up with unnecessary items.',
        tips: ['A 48-hour pause before non-essential purchases is the most effective consumption habit', 'Tracking what you don\'t buy is as useful as tracking what you do', 'Your intentionality tends to spread to other household members over time']
      },
      mid:  {
        title: 'Moderate unplanned purchasing',
        body: 'Occasional impulse purchases and unplanned buys are adding up across some rooms.',
        tips: ['Apply a 48-hour rule before any unplanned purchase', 'Write down the last 5 non-essential things bought — were they still worth it?', 'Unsubscribing from promotional emails reduces unplanned purchasing by 20–30%']
      },
      high: {
        title: 'High unnecessary purchasing',
        body: 'Unplanned and unnecessary purchasing is your primary waste and consumption driver.',
        tips: ['One rule for 30 days: nothing new unless something is broken or finished', 'Every unplanned item bought is a future disposal problem', 'Wish lists and waiting periods are the simplest tools for this pattern']
      },
    }
  },
}

// Hotspot key order matches question order (Q1–Q5 in every room)
const HOTSPOT_ORDER = ['singleUse', 'refillReuse', 'productWaste', 'disposal', 'overconsume']

// ── Room polygon points (viewBox 0 0 100 75) ──────────────────────────────────
const ROOM_POINTS = {
  kitchen:  [[8,23],[20,15],[33,9],[45,6],[52,10],[52,22],[44,29],[32,38],[18,44],[8,37]],
  bathroom: [[52,10],[62,4],[70,8],[72,16],[70,27],[62,33],[52,28],[52,20]],
  bedroom:  [[68,10],[80,4],[90,8],[90,22],[88,36],[86,48],[78,56],[66,50],[64,36],[66,20]],
  living:   [[8,42],[22,44],[36,40],[40,49],[38,59],[28,63],[10,61],[6,55],[6,48]],
  laundry:  [[40,43],[52,37],[62,43],[65,51],[63,61],[52,65],[40,61],[38,53]],
  outdoor:  [[65,52],[80,46],[91,52],[93,61],[90,69],[79,73],[65,68],[62,60]],
}

function pointsToPath(points) {
  return points.map(([x,y],i) => `${i===0?'M':'L'}${x} ${y}`).join(' ') + ' Z'
}

const ROOM_PATHS = Object.fromEntries(
  Object.entries(ROOM_POINTS).map(([id, pts]) => [id, pointsToPath(pts)])
)

const DEBUG_ROOM_COLORS  = { kitchen:'#40c974', bathroom:'#3b82f6', bedroom:'#a855f7', living:'#f59e0b', laundry:'#14b8a6', outdoor:'#ef4444' }
const DEBUG_ROOM_STROKES = { kitchen:'#16a34a', bathroom:'#2563eb', bedroom:'#7c3aed', living:'#d97706', laundry:'#0f766e', outdoor:'#b91c1c' }

const CALLOUTS = {
  kitchen:  { lx:22, ly:24, ax:26, ay:27 },
  bathroom: { lx:62, ly:13, ax:61, ay:20 },
  bedroom:  { lx:80, ly:32, ax:78, ay:34 },
  living:   { lx:16, ly:58, ax:20, ay:52 },
  laundry:  { lx:50, ly:62, ax:50, ay:53 },
  outdoor:  { lx:80, ly:67, ax:79, ay:61 },
}

const ROOM_ORDER = ['kitchen','bathroom','laundry','bedroom','living','outdoor']

const METRICS = [
  { icon:'🌿', label:'CO₂ Saved',       value:'12 kg' },
  { icon:'💧', label:'Water Optimised', value:'24 L'  },
  { icon:'⚡', label:'Energy Saved',    value:'8%'    },
]

const SCORE_CFG = {
  low:  { label: 'Low hotspot',   color:'#15803d', bg:'#f0fdf4' },
  mid:  { label: 'Moderate',      color:'#92400e', bg:'#fef3c7' },
  high: { label: 'High hotspot',  color:'#991b1b', bg:'#fee2e2' },
}

// ── Room definitions with new questionnaire (from DOCX) ───────────────────────
const ROOMS = {
  kitchen: {
    id:'kitchen', name:'Kitchen', icon:'🍳', label:'Food, packaging & pantry waste',
    questions: [
      {
        hotspot: 'singleUse',
        q: 'How often do you use disposable kitchen items like paper towels, cling wrap, or takeaway packaging?',
        options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
      {
        hotspot: 'refillReuse',
        q: 'How often do you refill or reuse containers for kitchen or pantry essentials?',
        options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [1, 2, 3, 4],
      },
      {
        hotspot: 'productWaste',
        q: 'How often does food go unused or expire before you finish it?',
        options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
      {
        hotspot: 'disposal',
        q: 'How often are you unsure how to dispose of food scraps, soft plastics, or takeaway containers?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often'],
        scores:  [1, 2, 3, 4],
      },
      {
        hotspot: 'overconsume',
        q: 'How often do you buy kitchen or pantry items that were not planned or turn out to be unnecessary?',
        options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
    ],
    results: {
      low:  { title:'Your kitchen is running lean.', body:'You rarely use single-use items, refill consistently, and keep food waste low. These habits matter more than most people realise.', tips:['Keep one reusable wrap visible — it prevents reaching for cling film', 'Shop with a list: it\'s the single highest-impact kitchen habit', 'Check your council\'s guide on soft plastic and food scraps disposal'] },
      mid:  { title:'Your kitchen has some quiet waste.', body:'Food expiry, single-use packaging and unplanned purchases are the three key areas showing up in your audit.', tips:['One swap: a reusable wrap instead of cling film', 'Do a fridge check before every shop — not after', 'Research soft plastic drop-off points in your area'] },
      high: { title:'Your kitchen is your primary waste room.', body:'Single-use reliance and unplanned purchasing are compounding daily. Even one targeted change creates visible results.', tips:['Start with paper towels → cloth. It\'s the highest-frequency kitchen swap', 'Write a shopping list before every shop, no exceptions', 'Add a recycling guide to your fridge for disposal confusion'] },
    },
  },
  bathroom: {
    id:'bathroom', name:'Bathroom', icon:'🚿', label:'Product accumulation & disposal',
    questions: [
      {
        hotspot: 'singleUse',
        q: 'How often do you buy disposable bathroom items like wipes, cotton pads, or razors?',
        options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
      {
        hotspot: 'refillReuse',
        q: 'How often do you choose refill packs, reusable alternatives, or low-waste formats for bathroom products?',
        options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [1, 2, 3, 4],
      },
      {
        hotspot: 'productWaste',
        q: 'How often are bathroom products thrown away before they are fully used?',
        options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
      {
        hotspot: 'disposal',
        q: 'How often are you unsure whether bathroom product containers can be recycled correctly?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often'],
        scores:  [1, 2, 3, 4],
      },
      {
        hotspot: 'overconsume',
        q: 'How often do you buy extra bathroom products before finishing the ones already at home?',
        options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
    ],
    results: {
      low:  { title:'Your bathroom shows real intentionality.', body:'Low single-use items, refill habits and product completion are all working together here.', tips:['Check one label a week for recycling instructions — small knowledge compounds', 'Consider a bar shampoo to permanently cut one plastic bottle', 'Finish what\'s already there before any new purchase'] },
      mid:  { title:'Your bathroom has some accumulation.', body:'Unfinished products, new purchases before finishing existing ones, and disposal uncertainty are the key patterns.', tips:['Shelf audit: anything untouched in 3 months — reassess it', 'Look for one refill option for your most-used product', 'A small recycling bin in the bathroom changes disposal behaviour'] },
      high: { title:'Your bathroom is quietly overcrowded.', body:'High single-use reliance, unfinished products and pre-purchase of extras are all active habits here.', tips:['One rule: nothing new until something is fully finished', 'Replace wipes with a reusable cloth — cost difference reverses within a month', 'Check one packaging label per day for recyclability'] },
    },
  },
  laundry: {
    id:'laundry', name:'Laundry', icon:'🫧', label:'Water, detergent & product habits',
    questions: [
      {
        hotspot: 'singleUse',
        q: 'How often do you use single-use laundry items such as dryer sheets, stain wipes, or disposable cleaning pads?',
        options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
      {
        hotspot: 'refillReuse',
        q: 'How often do you choose refill, bulk-buy, or reusable laundry options?',
        options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [1, 2, 3, 4],
      },
      {
        hotspot: 'productWaste',
        q: 'How often do laundry products sit unused or get replaced before they are finished?',
        options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
      {
        hotspot: 'disposal',
        q: 'How often are you unsure how to dispose of detergent bottles, boxes, or specialty packaging?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often'],
        scores:  [1, 2, 3, 4],
      },
      {
        hotspot: 'overconsume',
        q: 'How often do you buy new laundry products before finishing the ones you already have at home?',
        options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
    ],
    results: {
      low:  { title:'Your laundry habits are already lean.', body:'You\'re choosing considered products, avoiding unnecessary single-use items, and finishing what you have.', tips:['Try a concentrated eco refill for your current detergent', 'Air worn-once items before washing — most odour releases without water', 'Line drying works above 10°C — it just takes a little longer'] },
      mid:  { title:'Your laundry has some quiet inefficiency.', body:'Product replacement habits, disposal questions, and occasional pre-purchasing are the key areas.', tips:['Full loads only — the single highest-impact laundry change', 'Measure detergent once, then remember that visual amount', 'Check what detergent packaging is accepted at your local recycling point'] },
      high: { title:'Laundry is a high-resource room for you.', body:'Single-use laundry items, product pre-purchasing and disposal confusion are compounding regularly.', tips:['Machine runs only when full — start this rule today', 'Dryer sheets are easily replaceable with one reusable wool ball alternative', 'Check your council\'s guide for detergent and specialty packaging disposal'] },
    },
  },
  bedroom: {
    id:'bedroom', name:'Bedroom', icon:'🛏️', label:'Textiles, items & replacement habits',
    questions: [
      {
        hotspot: 'singleUse',
        q: 'How often do you use single-use items in this space, such as disposable storage liners, packaging, or short-life accessories?',
        options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
      {
        hotspot: 'refillReuse',
        q: 'How often do you repair, reuse, or repurpose items before replacing them?',
        options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [1, 2, 3, 4],
      },
      {
        hotspot: 'productWaste',
        q: 'How often do usable items in this space stay unused, unfinished, or get discarded early?',
        options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
      {
        hotspot: 'disposal',
        q: 'How often are you unsure how to dispose of unwanted textiles, accessories, or small household items from this space?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often'],
        scores:  [1, 2, 3, 4],
      },
      {
        hotspot: 'overconsume',
        q: 'How often do purchases for this space result in duplicate or unnecessary items?',
        options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
    ],
    results: {
      low:  { title:'Your bedroom is running consciously.', body:'You repair and reuse rather than replace, and make considered purchases. Textile habits are particularly strong.', tips:['Donate rather than bin unwanted textiles — most councils have textile streams', 'Check your council\'s guide for disposing of old bedding and small accessories', 'The chair pile is fine — airing worn items reduces unnecessary washing'] },
      mid:  { title:'Your bedroom has some unconsidered habits.', body:'Replacement timing, single-use storage items and disposal questions are the areas to focus on.', tips:['Before replacing anything: is it broken, or just familiar?', 'Check how to recycle textiles locally — more options exist than most people think', 'Repair one item this month instead of replacing it'] },
      high: { title:'Your bedroom has significant room to improve.', body:'Single-use items, early replacements and disposal uncertainty are all active across this space.', tips:['Apply a 30-day rule before replacing any non-broken item', 'Textile swap shops and clothing libraries are free alternatives to buying new', 'Your council\'s website has specific guidance on small item and textile disposal'] },
    },
  },
  living: {
    id:'living', name:'Living Room', icon:'🛋️', label:'Impulse purchasing & energy habits',
    questions: [
      {
        hotspot: 'singleUse',
        q: 'How often do you use disposable items in this space, such as tissues, single-use décor, or short-life accessories?',
        options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
      {
        hotspot: 'refillReuse',
        q: 'How often do you reuse, repair, or repurpose living room items before replacing them?',
        options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [1, 2, 3, 4],
      },
      {
        hotspot: 'productWaste',
        q: 'How often do decorative, entertainment, or household items in this space go unused or get replaced early?',
        options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
      {
        hotspot: 'disposal',
        q: 'How often are you unsure how to dispose of décor, broken small electronics, candles, or packaging from this space?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often'],
        scores:  [1, 2, 3, 4],
      },
      {
        hotspot: 'overconsume',
        q: 'How often do you buy living room items that were not planned or turn out to be unnecessary?',
        options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
    ],
    results: {
      low:  { title:'Your living room is your most intentional space.', body:'Deliberate purchasing, reuse habits and disposal awareness are working well together here.', tips:['A 48-hour pause before any non-essential purchase is the most effective habit', 'Check what small electronics and packaging can be recycled near you', 'Reusable alternatives for candles and décor now exist across most categories'] },
      mid:  { title:'Your living room has some drift.', body:'Occasional impulse purchases, early replacement of items and some disposal gaps are showing up.', tips:['Wait 48 hours before buying any non-essential item for this room', 'Look for one item to repair or repurpose this month', 'Most councils offer free bulky item or e-waste pickup — check yours'] },
      high: { title:'Your living room is your highest consumption space.', body:'Unplanned purchasing and unclear disposal are the two dominant patterns here.', tips:['Track non-essential purchases for this room for one month', 'Write down the last 5 things bought here — were they genuinely needed?', 'Your council almost certainly has an e-waste and décor drop-off point'] },
    },
  },
  outdoor: {
    id:'outdoor', name:'Outdoor', icon:'🌱', label:'Garden, entertaining & seasonal waste',
    questions: [
      {
        hotspot: 'singleUse',
        q: 'How often do you use disposable items for outdoor meals, gardening, or gatherings?',
        options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
      {
        hotspot: 'refillReuse',
        q: 'How often do you reuse pots, tools, containers, or outdoor materials?',
        options: ['Always', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [1, 2, 3, 4],
      },
      {
        hotspot: 'productWaste',
        q: 'How often do outdoor or garden items go unused, unfinished, or get discarded before their useful life is over?',
        options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
      {
        hotspot: 'disposal',
        q: 'How often are you unsure how to dispose of plant pots, soil bags, garden chemicals, or outdoor packaging?',
        options: ['Never', 'Rarely', 'Sometimes', 'Often'],
        scores:  [1, 2, 3, 4],
      },
      {
        hotspot: 'overconsume',
        q: 'How often do you buy outdoor or garden items that turn out to be unnecessary or unused?',
        options: ['Very often', 'Often', 'Sometimes', 'Rarely or Never'],
        scores:  [4, 3, 2, 1],
      },
    ],
    results: {
      low:  { title:'Your outdoor space shows sustainable habits.', body:'You reuse garden items, keep single-use entertaining low, and make considered outdoor purchases.', tips:['Compost organic outdoor scraps — it\'s the highest-impact outdoor habit', 'Share garden tools with neighbours to prevent unnecessary purchasing', 'Check council drop-off points for soil bags and plant pots'] },
      mid:  { title:'Your outdoor space has some areas to address.', body:'Single-use entertaining items, early product replacement and disposal questions are showing up.', tips:['Swap disposable outdoor plates and cups for one reusable set', 'Before buying any garden item, check if something at home can substitute', 'Most councils accept soil bags and plant pots at specific collection points'] },
      high: { title:'Your outdoor space has significant waste habits.', body:'Single-use purchasing, unused garden items and disposal confusion are all active patterns here.', tips:['One swap: reusable plates and cups for all outdoor meals', 'Check council guidelines specifically for garden chemicals and packaging', 'A tool library or community swap eliminates most unnecessary garden purchases'] },
    },
  },
}

// ── State ─────────────────────────────────────────────────────────────────────
const hovered         = ref(null)
const activeRoom      = ref(null)
const panelOpen       = ref(false)
const panelMode       = ref('questions')
const completed       = ref(new Set())
const allResults      = ref({})         // roomId → answer index array
const selectedAnswers = ref([])
const currentAnswers  = ref(null)

// ── Computed ──────────────────────────────────────────────────────────────────
const completedPct = computed(() => Math.round((completed.value.size / ROOM_ORDER.length) * 100))
const answeredCount = computed(() => selectedAnswers.value.filter(a => a !== null && a !== undefined).length)

// Eco score: higher = better (uses actual score mapping, not raw index)
const sustainabilityScore = computed(() => {
  const n = completed.value.size
  if (!n) return 0
  let total = 0
  Object.entries(allResults.value).forEach(([roomId, answers]) => {
    const room = ROOMS[roomId]
    answers.forEach((ansIdx, qi) => {
      if (ansIdx !== null && ansIdx !== undefined) {
        total += room.questions[qi].scores[ansIdx]
      }
    })
  })
  // Range per completed room: 5 (all 1s) to 20 (all 4s)
  const min = n * 5, max = n * 20
  return Math.round((1 - (total - min) / (max - min)) * 100)
})

const scoreMessage = computed(() => {
  if (!completed.value.size) return 'Begin your home audit to discover your eco score.'
  if (completed.value.size < ROOM_ORDER.length) return 'Good progress — keep going to reveal your full waste profile.'
  return 'Audit complete — your hotspot profile is ready.'
})

const nextRoom = computed(() => ROOM_ORDER.find(id => !completed.value.has(id)) ?? ROOM_ORDER[0])

// Per-room score (used in results panel) — uses score mapping
const roomScore = computed(() => {
  if (!currentAnswers.value?.length || !activeRoom.value) return 0
  return currentAnswers.value.reduce((sum, ansIdx, qi) => {
    if (ansIdx === null || ansIdx === undefined) return sum
    return sum + activeRoom.value.questions[qi].scores[ansIdx]
  }, 0)
})

// Room score level: 5-11 = low, 12-16 = mid, 17-20 = high
const scoreLevel = computed(() => {
  const s = roomScore.value
  if (s <= 11) return 'low'
  if (s <= 16) return 'mid'
  return 'high'
})

const roomResult = computed(() => activeRoom.value ? activeRoom.value.results[scoreLevel.value] : null)

// Which hotspot scored highest in the current room (for results badge)
const topRoomHotspot = computed(() => {
  if (!currentAnswers.value?.length || !activeRoom.value) return null
  let maxScore = -1, topKey = null
  currentAnswers.value.forEach((ansIdx, qi) => {
    if (ansIdx !== null && ansIdx !== undefined) {
      const score = activeRoom.value.questions[qi].scores[ansIdx]
      if (score > maxScore) { maxScore = score; topKey = HOTSPOT_ORDER[qi] }
    }
  })
  return topKey ? { key: topKey, ...HOTSPOT_CATEGORIES[topKey] } : null
})

// Total score per hotspot category across all completed rooms
const hotspotScores = computed(() => {
  const cats = { singleUse:0, refillReuse:0, productWaste:0, disposal:0, overconsume:0 }
  Object.entries(allResults.value).forEach(([roomId, answers]) => {
    const room = ROOMS[roomId]
    answers.forEach((ansIdx, qi) => {
      if (ansIdx !== null && ansIdx !== undefined) {
        cats[HOTSPOT_ORDER[qi]] += room.questions[qi].scores[ansIdx]
      }
    })
  })
  return cats
})

// Hotspot categories ranked highest → lowest
const hotspotRanking = computed(() => {
  const scores = hotspotScores.value
  const n = completed.value.size
  return HOTSPOT_ORDER.map(key => {
    const score = scores[key]
    const maxScore = n * 4  // each room contributes 1 question (max score 4) per category
    // Use doc bands when all rooms done (score range 6–24), else percentage-based
    let level
    if (n === ROOM_ORDER.length) {
      level = score <= 11 ? 'low' : score <= 17 ? 'mid' : 'high'
    } else {
      const pct = maxScore > 0 ? score / maxScore : 0
      level = pct < 0.4 ? 'low' : pct < 0.65 ? 'mid' : 'high'
    }
    return {
      key,
      score,
      maxScore,
      label: HOTSPOT_CATEGORIES[key].label,
      icon:  HOTSPOT_CATEGORIES[key].icon,
      level,
      band:  HOTSPOT_CATEGORIES[key].bands[level],
    }
  }).sort((a, b) => b.score - a.score)
})

const summaryMsg = computed(() => {
  if (!hotspotRanking.value.length) return ''
  const primary = hotspotRanking.value[0]
  if (primary.level === 'high') return `Your biggest waste hotspot is ${primary.label.toLowerCase()}. Here's where to focus first.`
  if (primary.level === 'mid') return 'Your home is moderately sustainable. A few targeted changes will have a big impact.'
  return 'Your home is running more consciously than most. Keep building on it.'
})

const contextualTip = computed(() => {
  if (panelOpen.value && activeRoom.value && ROOM_TIPS[activeRoom.value.id]) {
    return ROOM_TIPS[activeRoom.value.id]
  }
  return { emoji:'💡', text:'Start with the room you use most frequently — honest answers lead to the best insights.' }
})

const bottomCTA = computed(() => {
  if (completed.value.size === ROOM_ORDER.length) return { title:'Your waste profile is ready.', subtitle:'See your ranked hotspot results and top recommendations.' }
  if (completed.value.size > 0) return { title:`${ROOM_ORDER.length - completed.value.size} room${ROOM_ORDER.length-completed.value.size>1?'s':''} remaining.`, subtitle:'Keep going — each room adds to your hotspot profile.' }
  return { title:'Your home, your impact.', subtitle:'Small changes across 6 rooms create lasting sustainable habits.' }
})

// ── Methods ───────────────────────────────────────────────────────────────────
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

function openSummary() {
  panelMode.value = 'summary'
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
  completed.value = new Set([...completed.value, activeRoom.value.id])
  allResults.value  = { ...allResults.value, [activeRoom.value.id]: answers }
  currentAnswers.value = answers
  panelMode.value = 'submitted'  // show choice: skip result or view it
}

function continueFromSubmitted() {
  if (completed.value.size === ROOM_ORDER.length) { openSummary() }
  else { openRoom(nextRoom.value) }
}

function handleBack() {
  if (completed.value.size === ROOM_ORDER.length) { openSummary() }
  else { panelMode.value = 'submitted' }  // back to choice screen, not close
}

function retakeRoom() {
  // Remove from completed so the room can be re-answered
  const next = new Set(completed.value)
  next.delete(activeRoom.value.id)
  completed.value = next
  const updated = { ...allResults.value }
  delete updated[activeRoom.value.id]
  allResults.value = updated
  currentAnswers.value = null
  selectedAnswers.value = new Array(activeRoom.value.questions.length).fill(null)
  panelMode.value = 'questions'
}

function closePanel() {
  panelOpen.value = false
  setTimeout(() => { activeRoom.value = null }, 300)
}

function reset() {
  activeRoom.value = null; panelOpen.value = false
  completed.value = new Set(); allResults.value = {}
  selectedAnswers.value = []; currentAnswers.value = null
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

.room-hit-area { fill:transparent; stroke:none; cursor:pointer; pointer-events:all; }
.room-debug-mask { pointer-events:none; mix-blend-mode:multiply; }
</style>
