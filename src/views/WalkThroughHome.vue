<template>
  <RedUseHeader inter="Waste Hotspot " grace="Audit" paragraph="Explore each room to discover your top
    waste hotspots and get personalised recommendations."></RedUseHeader>
  <div
    style="height:calc(100vh - 3.75rem); display:flex; flex-direction:column; background:#f7f9f7; font-family:'Inter',sans-serif; overflow:hidden;">
    <!-- ══ PAGE HEADER ══ -->
    <header style="flex-shrink:0; background:#ffffff; border-bottom:1px solid #eef1ee; padding:1rem 1.75rem 0.875rem;">
      <div style="display:flex; align-items:center; justify-content:space-between; gap:1rem;">
        <div>
        </div>
        <div style="display:flex; align-items:center; gap:0.5rem; flex-shrink:0;">
          <div
            style="display:flex; align-items:center; gap:0.35rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:9999px; padding:0.28rem 0.75rem;">
            <span style="font-size:0.75rem;">🌿</span>
            <span style="font-size:0.8125rem; font-weight:800; color:#15803d;">{{ sustainabilityScore }}</span>
            <span style="font-size:0.5625rem; color:#6b7280;">/100 eco score</span>
          </div>
          <div
            style="display:flex; align-items:center; gap:0.35rem; background:#f0fdf4; border:1px solid #bbf7d0; border-radius:9999px; padding:0.28rem 0.75rem;">
            <span style="font-size:0.75rem;">🏠</span>
            <span style="font-size:0.8125rem; font-weight:800; color:#15803d;">{{ completedPct }}%</span>
            <span style="font-size:0.5625rem; color:#6b7280;">audited</span>
          </div>
          <button
            style="display:flex; align-items:center; gap:0.35rem; background:white; border:1px solid #e5e7eb; border-radius:9999px; padding:0.28rem 0.75rem; cursor:pointer; font-family:Inter,sans-serif; transition:border-color 0.15s;">
            <span style="font-size:0.75rem; color:#9ca3af;">ⓘ</span>
            <span style="font-size:0.8125rem; color:#374151; font-weight:500;">Need help?</span>
          </button>
        </div>
      </div>
    </header>

    <!-- ══ BODY: 3-column layout ══ -->
    <div style="flex:1; display:flex; overflow:hidden; min-height:0;">

      <!-- ── LEFT SIDEBAR ── -->
      <aside
        style="width:206px; flex-shrink:0; border-right:1px solid #eef1ee; background:#ffffff; display:flex; flex-direction:column; overflow:hidden;">

        <!-- How it works -->
        <WasteHotspodAuditInstruction></WasteHotspodAuditInstruction>
        <!-- Hotspot category legend -->
        <WasteHotspodAuditCategoryLegend></WasteHotspodAuditCategoryLegend>

        <!-- Contextual tip — changes based on active room -->
        <WasteHotspodAuditTip :panelOpen="panelOpen" :activeRoom="activeRoom" :contextualTip="contextualTip">
        </WasteHotspodAuditTip>

      </aside>

      <!-- ── CENTER: HOUSE ── always flex:1, takes all remaining space -->
      <div
        style="flex:1; position:relative; overflow:hidden; background:#ffffff; display:flex; align-items:center; justify-content:center; min-width:0;">
        <div style="position:relative; height:100%; aspect-ratio:4/3; max-width:100%;">

          <img :src="houseImg" alt="House"
            style="position:absolute; inset:0; width:100%; height:100%; object-fit:contain; mix-blend-mode:multiply;" />

          <!-- SVG: invisible hit areas only (no visual rendering) -->
          <svg style="position:absolute;inset:0;width:100%;height:100%;z-index:5;" viewBox="0 0 100 75"
            preserveAspectRatio="none">
            <template v-if="DEBUG_ROOM_MASKS">
              <g v-for="id in ROOM_ORDER" :key="id">
                <path :d="ROOM_PATHS[id]" :fill="DEBUG_ROOM_COLORS[id]" fill-opacity="0.34"
                  :stroke="DEBUG_ROOM_STROKES[id]" stroke-width="0.9" stroke-linejoin="round" class="room-debug-mask" />
                <g v-for="(pt, pi) in ROOM_POINTS[id]" :key="`${id}-pt-${pi}`">
                  <circle :cx="pt[0]" :cy="pt[1]" r="0.86" fill="#fff" :stroke="DEBUG_ROOM_STROKES[id]"
                    stroke-width="0.45" style="pointer-events:none;" />
                  <text :x="pt[0] + 0.9" :y="pt[1] - 0.9" font-size="1.65" font-family="Inter,sans-serif"
                    font-weight="800" :fill="DEBUG_ROOM_STROKES[id]"
                    style="paint-order:stroke;stroke:#fff;stroke-width:0.45;pointer-events:none;">{{ pi + 1 }}</text>
                </g>
              </g>
            </template>
            <path v-for="id in ROOM_ORDER" :key="id" :d="ROOM_PATHS[id]" class="room-hit-area" @click="openRoom(id)"
              @mouseenter="hovered = id" @mouseleave="hovered = null" />
          </svg>

          <!-- Room label pills — glow lives here -->
          <div v-for="id in ROOM_ORDER" :key="'p-' + id" :style="{
            position: 'absolute', left: CALLOUTS[id].lx + '%', top: CALLOUTS[id].ly + '%',
            transform: `translate(-50%,-50%) scale(${statusOf(id) === 'active' ? 1.08 : statusOf(id) === 'hovered' ? 1.04 : 1})`,
            background: statusOf(id) === 'active'
              ? 'rgba(10,15,20,0.92)'
              : statusOf(id) === 'done'
                ? 'rgba(6,40,26,0.88)'
                : statusOf(id) === 'hovered'
                  ? 'rgba(10,15,20,0.82)'
                  : 'rgba(255,255,255,0.82)',
            backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
            border: 'none',
            borderRadius: '20px', padding: '4px 10px', cursor: 'pointer',
            boxShadow: statusOf(id) === 'active'
              ? '0 0 8px rgba(52,211,153,0.9), 0 0 22px rgba(52,211,153,0.55), 0 0 48px rgba(16,185,129,0.28), 0 0 80px rgba(16,185,129,0.1)'
              : statusOf(id) === 'hovered'
                ? '0 0 6px rgba(52,211,153,0.65), 0 0 16px rgba(52,211,153,0.38), 0 0 36px rgba(16,185,129,0.18)'
                : statusOf(id) === 'done'
                  ? '0 0 5px rgba(52,211,153,0.5), 0 0 14px rgba(52,211,153,0.28), 0 0 28px rgba(16,185,129,0.12)'
                  : '0 1px 6px rgba(0,0,0,0.08)',
            transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)', zIndex: 10,
            display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap',
          }" @click="openRoom(id)" @mouseenter="hovered = id" @mouseleave="hovered = null">
            <span style="font-size:8.5px;line-height:1;">{{ statusOf(id) === 'done' ? '✓' : ROOMS[id].icon }}</span>
            <span
              :style="{ fontSize: '9.5px', fontWeight: 700, letterSpacing: '0.01em', fontFamily: 'Inter,sans-serif', color: (statusOf(id) === 'done' || statusOf(id) === 'active' || statusOf(id) === 'hovered') ? '#fff' : '#1f2937' }">{{
                ROOMS[id].name }}</span>
            <span v-if="statusOf(id) === 'active'"
              style="font-size:7.5px; color:rgba(110,231,183,0.9); font-weight:600; letter-spacing:0.02em;">●</span>
          </div>

        </div>
      </div>

      <!-- ── RIGHT PANEL ── fixed widths per mode -->
      <aside :style="{
        flex: '0 0 ' + (panelOpen && panelMode === 'questions' ? '480px' : panelOpen ? '380px' : '296px'),
        flexShrink: 0,
        borderLeft: '1px solid #eef1ee', background: '#ffffff',
        display: 'flex', flexDirection: 'column', overflow: 'hidden',
        transition: 'flex 0.38s cubic-bezier(0.4,0,0.2,1)'
      }">

        <!-- ─ OVERVIEW (default: no panel open) ─ -->
        <template v-if="!panelOpen">

          <!-- Eco Score ring -->
          <WasteHotspodAuditRing :sustainabilityScore="sustainabilityScore" :scoreMessage="scoreMessage"
            :completedPct="completedPct" :completed="completed"></WasteHotspodAuditRing>
          <!-- Room Status list -->
          <WasteHotspodAuditStatus :completed="completed" @open-room="openRoom"></WasteHotspodAuditStatus>
          <!-- Impact Preview -->
          <div style="padding:0.875rem 1.125rem; flex:1; overflow-y:auto;">
            <p
              style="font-size:0.4375rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#9ca3af; margin:0 0 0.2rem;">
              Your Impact Preview</p>
            <p style="font-size:0.625rem; color:#9ca3af; margin:0 0 0.75rem; line-height:1.5;">{{ completed.size > 0 ?
              'Estimated based on your audit so far.' : 'Complete your audit to unlock your potential impact.' }}</p>
          </div>

        </template>

        <!-- ─ QUESTIONNAIRE: 2-column card grid ─ -->
        <template v-else-if="panelMode === 'questions' && activeRoom">
          <WasteHotspodAuditQuestionnaire @closePanel="closePanel" @selectAnswer="(qi, oi) => selectAnswer(qi, oi)"
            @submitAnswers="submitAnswers" :activeRoom="activeRoom" :answeredCount="answeredCount"
            :selectedAnswers="selectedAnswers"></WasteHotspodAuditQuestionnaire>
        </template>

        <!-- ─ SUBMITTED: choice screen ─ -->
        <template v-else-if="panelMode === 'submitted' && activeRoom">
          <div style="display:flex;flex-direction:column;height:100%;">

            <!-- Header -->
            <div
              style="padding:0.875rem 1.125rem;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;gap:0.5625rem;flex-shrink:0;">
              <div
                style="width:1.875rem;height:1.875rem;border-radius:8px;background:#f0fdf4;display:flex;align-items:center;justify-content:center;font-size:0.9375rem;flex-shrink:0;">
                {{ activeRoom.icon }}</div>
              <div style="flex:1;min-width:0;">
                <p style="font-size:0.875rem;font-weight:800;color:#111827;margin:0;line-height:1.2;">{{ activeRoom.name
                }} complete</p>
                <p style="font-size:0.5625rem;color:#9ca3af;margin:0;">{{ completed.size }} of {{ ROOM_ORDER.length }}
                  rooms audited</p>
              </div>
              <button @click="closePanel"
                style="width:1.625rem;height:1.625rem;border-radius:50%;border:1.5px solid #e5e7eb;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.625rem;color:#6b7280;font-family:Inter,sans-serif;flex-shrink:0;">✕</button>
            </div>

            <!-- Central success visual -->
            <div
              style="flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:1.25rem 1.25rem 0.75rem;gap:1rem;">

              <!-- Animated checkmark -->
              <div style="position:relative;width:72px;height:72px;">
                <div
                  style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,#dcfce7,#bbf7d0);border:2px solid #86efac;display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 8px rgba(134,239,172,0.12),0 4px 24px rgba(74,222,128,0.2);">
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
                    : `${ROOM_ORDER.length - completed.size} room${ROOM_ORDER.length - completed.size > 1 ? 's' : ''} left
                  — or see this room\'s results first.` }}
                </p>
              </div>

              <!-- Room progress strip -->
              <div style="display:flex;align-items:center;gap:0.3rem;margin-top:0.25rem;">
                <template v-for="(id, i) in ROOM_ORDER" :key="'sp-' + id">
                  <div :style="{
                    width: completed.has(id) ? '1.5rem' : '0.35rem',
                    height: '0.35rem', borderRadius: '9999px', transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
                    background: completed.has(id) ? '#16a34a' : '#e5e7eb'
                  }" />
                  <div v-if="i < ROOM_ORDER.length - 1"
                    :style="{ width: '0.625rem', height: '1.5px', borderRadius: '9999px', background: completed.has(id) ? '#4ade80' : '#e5e7eb', transition: 'background 0.4s' }" />
                </template>
              </div>

              <!-- Next room preview (if not last) -->
              <div v-if="completed.size < ROOM_ORDER.length"
                style="display:flex;align-items:center;gap:0.5rem;background:#f8faf8;border:1px solid #eef1ee;border-radius:10px;padding:0.5625rem 0.75rem;width:100%;box-sizing:border-box;">
                <span style="font-size:1.125rem;flex-shrink:0;">{{ ROOMS[nextRoom].icon }}</span>
                <div style="flex:1;min-width:0;">
                  <p
                    style="font-size:0.4375rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;margin:0 0 2px;">
                    Up next</p>
                  <p style="font-size:0.8125rem;font-weight:700;color:#111827;margin:0;">{{ ROOMS[nextRoom].name }}</p>
                </div>
                <span
                  style="font-size:0.5625rem;color:#9ca3af;background:#f0f0f0;border-radius:9999px;padding:2px 7px;font-weight:600;">{{
                    ROOMS[nextRoom].questions.length }} questions</span>
              </div>

            </div>

            <!-- Two action buttons -->
            <div
              style="padding:0.875rem 1.125rem;border-top:1px solid #f3f4f6;flex-shrink:0;display:flex;flex-direction:column;gap:0.4375rem;">

              <!-- Primary: continue -->
              <button @click="continueFromSubmitted"
                style="width:100%;border:none;border-radius:11px;padding:12px;font-size:0.875rem;font-weight:800;color:white;cursor:pointer;font-family:Inter,sans-serif;background:linear-gradient(135deg,#16a34a,#166534);box-shadow:0 4px 14px rgba(22,163,74,0.28);transition:opacity 0.15s;display:flex;align-items:center;justify-content:center;gap:0.375rem;">
                <span>{{ completed.size === ROOM_ORDER.length ? 'See Full Hotspot Profile' : `Next:
                  ${ROOMS[nextRoom].name}`
                }}</span>
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
        <template v-else-if="panelMode === 'results' && activeRoom">
          <div style="display:flex; flex-direction:column; height:100%;">

            <!-- Room result header -->
            <div
              style="padding:0.875rem 1.125rem; border-bottom:1px solid #f3f4f6; display:flex; align-items:center; gap:0.5625rem; flex-shrink:0;">
              <div
                style="width:1.875rem;height:1.875rem;border-radius:8px;background:#f0fdf4;display:flex;align-items:center;justify-content:center;font-size:0.9375rem;flex-shrink:0;">
                {{ activeRoom.icon }}</div>
              <p style="flex:1;font-size:0.875rem;font-weight:800;color:#111827;margin:0;">{{ activeRoom.name }} Results
              </p>
              <div
                :style="{ background: SCORE_CFG[scoreLevel].bg, border: `1px solid ${SCORE_CFG[scoreLevel].color}44`, borderRadius: '9999px', padding: '3px 9px', flexShrink: 0 }">
                <span :style="{ fontSize: '0.5rem', fontWeight: 700, color: SCORE_CFG[scoreLevel].color }">{{
                  SCORE_CFG[scoreLevel].label }}</span>
              </div>
              <button @click="closePanel"
                style="width:1.625rem;height:1.625rem;border-radius:50%;border:1.5px solid #e5e7eb;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.625rem;color:#6b7280;font-family:Inter,sans-serif;flex-shrink:0;">✕</button>
            </div>

            <div style="flex:1;overflow-y:auto;padding:0.875rem 1.125rem;">

              <!-- Top hotspot badge for this room -->
              <div v-if="topRoomHotspot"
                style="display:flex;align-items:center;gap:0.625rem;background:#f8faf8;border:1px solid #eef1ee;border-radius:10px;padding:0.625rem 0.75rem;margin-bottom:0.75rem;">
                <span style="font-size:1.375rem;flex-shrink:0;">{{ topRoomHotspot.icon }}</span>
                <div>
                  <p
                    style="font-size:0.4375rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#9ca3af;margin:0 0 2px;">
                    Room hotspot detected</p>
                  <p style="font-size:0.8125rem;font-weight:800;color:#111827;margin:0;">{{ topRoomHotspot.label }}</p>
                </div>
              </div>

              <!-- Result summary card -->
              <div
                style="background:#f8faf8;border:1px solid #eef1ee;border-radius:12px;padding:0.875rem;margin-bottom:0.625rem;">
                <h4 style="font-size:0.875rem;font-weight:800;color:#111827;margin:0 0 0.3rem;">{{ roomResult.title }}
                </h4>
                <p style="font-size:0.75rem;color:#4b5563;line-height:1.65;margin:0;">{{ roomResult.body }}</p>
              </div>

              <!-- What to try -->
              <div style="background:#f8faf8;border:1px solid #eef1ee;border-radius:12px;padding:0.875rem;">
                <p
                  style="font-size:0.4375rem;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#9ca3af;margin:0 0 0.625rem;">
                  What to try</p>
                <div v-for="(tip, i) in roomResult.tips" :key="i"
                  :style="{ display: 'flex', gap: '0.5625rem', marginBottom: i < roomResult.tips.length - 1 ? '0.625rem' : 0 }">
                  <div
                    style="width:1.25rem;height:1.25rem;border-radius:50%;background:#f0fdf4;border:1px solid #bbf7d0;display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px;">
                    <span style="font-size:0.4375rem;font-weight:800;color:#15803d;">{{ i + 1 }}</span>
                  </div>
                  <p style="font-size:0.75rem;color:#374151;line-height:1.6;margin:0;">{{ tip }}</p>
                </div>
              </div>

              <!-- Hotspot progress teaser (when not all rooms done) -->
              <div v-if="completed.size < ROOM_ORDER.length"
                style="margin-top:0.625rem;padding:0.625rem 0.75rem;background:linear-gradient(135deg,#f0fdf4,#dcfce7);border:1px solid #bbf7d0;border-radius:10px;">
                <p style="font-size:0.625rem;color:#166534;font-weight:600;margin:0 0 2px;">{{ ROOM_ORDER.length -
                  completed.size }} room{{ ROOM_ORDER.length - completed.size > 1 ? 's' : '' }} remaining</p>
                <p style="font-size:0.5625rem;color:#15803d;margin:0;line-height:1.5;">Complete all rooms to unlock your
                  full waste hotspot profile and ranked category results.</p>
              </div>

            </div>

            <div
              style="padding:0.75rem 1.125rem;border-top:1px solid #f3f4f6;flex-shrink:0;display:flex;flex-direction:column;gap:0.3rem;">
              <button @click="handleBack"
                style="width:100%;background:linear-gradient(135deg,#16a34a,#166534);border:none;border-radius:11px;padding:11px;font-size:0.875rem;font-weight:800;color:#fff;cursor:pointer;font-family:Inter,sans-serif;box-shadow:0 4px 14px rgba(22,163,74,0.28);">
                {{ completed.size < ROOM_ORDER.length ? '← Back to House' : 'See Hotspot Profile →' }} </button>
                  <button @click="retakeRoom"
                    style="width:100%;background:transparent;border:1.5px solid #e5e7eb;border-radius:11px;padding:9px;font-size:0.75rem;font-weight:600;color:#6b7280;cursor:pointer;font-family:Inter,sans-serif;">Redo
                    this room</button>
            </div>
          </div>
        </template>

        <!-- ─ SUMMARY / HOTSPOT PROFILE ─ -->
        <template v-else-if="panelMode === 'summary'">
          <div style="display:flex;flex-direction:column;height:100%;">

            <!-- Header -->
            <div
              style="padding:1rem 1.125rem;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;">
              <div>
                <h3 style="font-size:0.9375rem;font-weight:800;color:#111827;margin:0 0 2px;">Your Waste Profile</h3>
              </div>
              <button @click="closePanel"
                style="width:1.625rem;height:1.625rem;border-radius:50%;border:1.5px solid #e5e7eb;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.625rem;color:#6b7280;font-family:Inter,sans-serif;">✕</button>
            </div>

            <p style="font-size:0.75rem;color:#6b7280;margin:0.75rem 1.125rem 0.5rem;line-height:1.5;flex-shrink:0;">{{
              summaryMsg }}</p>

            <!-- Scrollable content -->
            <div style="flex:1;overflow-y:auto;padding:0 1.125rem 0.75rem;">

              <!-- PRIMARY HOTSPOT -->
              <div v-if="hotspotRanking[0]"
                style="background:#fff1f1;border:1.5px solid #fecaca;border-radius:14px;padding:1rem;margin-bottom:0.5rem;">
                <div style="display:flex;align-items:flex-start;gap:0.625rem;margin-bottom:0.5rem;">
                  <span style="font-size:1.5rem;flex-shrink:0;line-height:1;margin-top:2px;">{{ hotspotRanking[0].icon
                  }}</span>
                  <div style="flex:1;min-width:0;">
                    <div style="display:flex;align-items:center;gap:0.375rem;margin-bottom:2px;">
                      <span
                        style="font-size:0.4375rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#dc2626;background:#fee2e2;padding:2px 6px;border-radius:4px;">Primary
                        hotspot</span>
                    </div>
                    <p style="font-size:0.875rem;font-weight:800;color:#111827;margin:0;line-height:1.3;">{{
                      hotspotRanking[0].band.title }}</p>
                  </div>
                  <div
                    style="background:white;border:1px solid #fecaca;border-radius:9999px;padding:3px 8px;flex-shrink:0;">
                    <span style="font-size:0.5625rem;font-weight:800;color:#dc2626;">{{ hotspotRanking[0].score }}<span
                        style="color:#fca5a5;">/{{ hotspotRanking[0].maxScore }}</span></span>
                  </div>
                </div>
                <p style="font-size:0.6875rem;color:#374151;line-height:1.65;margin:0 0 0.625rem;">{{
                  hotspotRanking[0].band.body }}</p>
                <div style="display:flex;flex-direction:column;gap:0.35rem;">
                  <div v-for="(tip, i) in hotspotRanking[0].band.tips" :key="i"
                    style="display:flex;gap:0.5rem;align-items:flex-start;">
                    <div
                      style="width:4px;height:4px;border-radius:50%;background:#dc2626;margin-top:7px;flex-shrink:0;" />
                    <p style="font-size:0.6875rem;color:#374151;line-height:1.55;margin:0;">{{ tip }}</p>
                  </div>
                </div>
              </div>

              <!-- SECONDARY HOTSPOT -->
              <div v-if="hotspotRanking[1]"
                style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:14px;padding:0.875rem;margin-bottom:0.625rem;">
                <div style="display:flex;align-items:flex-start;gap:0.5rem;margin-bottom:0.375rem;">
                  <span style="font-size:1.125rem;flex-shrink:0;line-height:1;margin-top:2px;">{{ hotspotRanking[1].icon
                  }}</span>
                  <div style="flex:1;min-width:0;">
                    <div style="margin-bottom:2px;">
                      <span
                        style="font-size:0.4375rem;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:#d97706;background:#fef3c7;padding:2px 6px;border-radius:4px;">Secondary
                        hotspot</span>
                    </div>
                    <p style="font-size:0.8125rem;font-weight:800;color:#111827;margin:0;line-height:1.3;">{{
                      hotspotRanking[1].band.title }}</p>
                  </div>
                  <div
                    style="background:white;border:1px solid #fde68a;border-radius:9999px;padding:3px 8px;flex-shrink:0;">
                    <span style="font-size:0.5625rem;font-weight:800;color:#d97706;">{{ hotspotRanking[1].score }}<span
                        style="color:#fbbf24;">/{{ hotspotRanking[1].maxScore }}</span></span>
                  </div>
                </div>
                <p style="font-size:0.6875rem;color:#374151;line-height:1.6;margin:0 0 0.5rem;">{{
                  hotspotRanking[1].band.body }}</p>
                <div style="display:flex;flex-direction:column;gap:0.3rem;">
                  <div v-for="(tip, i) in hotspotRanking[1].band.tips.slice(0, 2)" :key="i"
                    style="display:flex;gap:0.5rem;align-items:flex-start;">
                    <div
                      style="width:4px;height:4px;border-radius:50%;background:#d97706;margin-top:7px;flex-shrink:0;" />
                    <p style="font-size:0.625rem;color:#374151;line-height:1.55;margin:0;">{{ tip }}</p>
                  </div>
                </div>
              </div>

              <!-- All 5 categories ranked -->
              <p
                style="font-size:0.4375rem;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:#9ca3af;margin:0.5rem 0 0.375rem;">
                All categories ranked</p>
              <div v-for="(cat, i) in hotspotRanking" :key="cat.key"
                style="display:flex;align-items:center;gap:0.5rem;background:#f8faf8;border:1px solid #eef1ee;border-radius:9px;padding:0.4375rem 0.625rem;margin-bottom:0.25rem;">
                <span
                  style="font-size:0.5rem;font-weight:800;color:#9ca3af;width:14px;text-align:center;flex-shrink:0;">#{{
                    i + 1 }}</span>
                <span style="font-size:0.875rem;flex-shrink:0;">{{ cat.icon }}</span>
                <span style="font-size:0.75rem;font-weight:600;color:#111827;flex:1;min-width:0;line-height:1.3;">{{
                  cat.label }}</span>
                <div
                  :style="{ background: SCORE_CFG[cat.level].bg, border: `1px solid ${SCORE_CFG[cat.level].color}44`, borderRadius: '9999px', padding: '2px 8px', flexShrink: 0 }">
                  <span :style="{ fontSize: '0.4375rem', fontWeight: 700, color: SCORE_CFG[cat.level].color }">{{
                    cat.score
                    }}/{{ cat.maxScore }}</span>
                </div>
              </div>

            </div>

            <!-- Footer -->
            <div style="padding:0.75rem 1.125rem;border-top:1px solid #f3f4f6;flex-shrink:0;">
              <button @click="reset"
                style="width:100%;background:transparent;border:1.5px solid #e5e7eb;border-radius:11px;padding:10px;font-size:0.8125rem;font-weight:700;color:#6b7280;cursor:pointer;font-family:Inter,sans-serif;">Start
                Over →</button>
            </div>
          </div>
        </template>

      </aside>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import houseImg from '/house-isometric.png'
import { ROOMS } from '@/utils/householdQuestionnaireStaticData'
import { ROOM_ORDER } from '@/utils/householdRoomVisualizationStaticData'
import { HOTSPOT_CATEGORIES, HOTSPOT_ORDER, SCORE_CFG } from '@/utils/householdHotspotStaticData'
import { ROOM_TIPS, ROOM_PATHS, CALLOUTS } from '@/utils/householdRoomVisualizationStaticData'
import WasteHotspodAuditRing from '@/components/household/WasteHotspodAuditRing.vue'
import WasteHotspodAuditInstruction from '@/components/household/WasteHotspodAuditInstruction.vue'
import WasteHotspodAuditCategoryLegend from '@/components/household/WasteHotspodAuditCategoryLegend.vue'
import WasteHotspodAuditTip from '@/components/household/WasteHotspodAuditTip.vue'
import WasteHotspodAuditStatus from '@/components/household/WasteHotspodAuditStatus.vue'
import WasteHotspodAuditQuestionnaire from '@/components/household/WasteHotspodAuditQuestionnaire.vue'
import RedUseHeader from '@/components/misc/RedUseHeader.vue'

// ── Debug ─────────────────────────────────────────────────────────────────────
const DEBUG_ROOM_MASKS = false  // set true to visualise & tune room polygons


// ── State ─────────────────────────────────────────────────────────────────────
const hovered = ref(null)
const activeRoom = ref(null)
const panelOpen = ref(false)
const panelMode = ref('questions')
const completed = ref(new Set())
const allResults = ref({})         // roomId → answer index array
const selectedAnswers = ref([])
const currentAnswers = ref(null)

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
  const cats = { singleUse: 0, refillReuse: 0, productWaste: 0, disposal: 0, overconsume: 0 }
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
      icon: HOTSPOT_CATEGORIES[key].icon,
      level,
      band: HOTSPOT_CATEGORIES[key].bands[level],
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
  return { emoji: '💡', text: 'Start with the room you use most frequently — honest answers lead to the best insights.' }
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
  allResults.value = { ...allResults.value, [activeRoom.value.id]: answers }
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

.room-hit-area {
  fill: transparent;
  stroke: none;
  cursor: pointer;
  pointer-events: all;
}

.room-debug-mask {
  pointer-events: none;
  mix-blend-mode: multiply;
}
</style>
