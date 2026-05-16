<template>
    <div style="display:flex;flex-direction:column;height:100%;">
        <!-- Header -->
        <div style="padding:0.875rem 1.25rem 0.75rem; border-bottom:1px solid #f0f0f0; flex-shrink:0;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:0.875rem;">
                <div style="display:flex;align-items:center;gap:0.625rem;">
                    <button @click="closePanel"
                        style="width:1.75rem;height:1.75rem;border-radius:50%;border:1.5px solid #e5e7eb;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.6875rem;color:#6b7280;font-family:Inter,sans-serif;flex-shrink:0;">←</button>
                    <div
                        style="width:2.25rem;height:2.25rem;border-radius:10px;background:#f0fdf4;border:1px solid #dcfce7;display:flex;align-items:center;justify-content:center;font-size:1.125rem;flex-shrink:0;">
                        {{ activeRoom.icon }}</div>
                    <div>
                        <p
                            style="font-size:1rem;font-weight:800;color:#111827;margin:0;line-height:1.2;letter-spacing:-0.01em;">
                            {{ activeRoom.name }}</p>
                        <p style="font-size:0.625rem;color:#9ca3af;margin:0;">{{ activeRoom.label }}</p>
                    </div>
                </div>
                <div style="display:flex;align-items:center;gap:0.5rem;">
                    <div style="background:#f0fdf4;border:1px solid #bbf7d0;border-radius:9999px;padding:3px 10px;">
                        <span style="font-size:0.6875rem;font-weight:700;color:#15803d;">{{ answeredCount }}/{{
                            activeRoom.questions.length }}</span>
                    </div>
                    <button @click="$emit('closePanel')"
                        style="width:1.75rem;height:1.75rem;border-radius:50%;border:1.5px solid #e5e7eb;background:white;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:0.6875rem;color:#6b7280;font-family:Inter,sans-serif;">✕</button>
                </div>
            </div>
            <!-- Progress segments -->
            <div style="display:flex;gap:4px;">
                <div v-for="(_, i) in activeRoom.questions" :key="i" :style="{
                    flex: 1, height: '4px', borderRadius: '9999px', transition: 'background 0.35s',
                    background: selectedAnswers[i] !== null && selectedAnswers[i] !== undefined ? '#16a34a' : '#eef1ee'
                }" />
            </div>
        </div>

        <!-- 2-column question grid -->
        <div style="flex:1;overflow-y:auto;padding:0.875rem 1.25rem 0.75rem;">
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:0.625rem;align-items:start;">

                <div v-for="(q, qi) in activeRoom.questions" :key="qi" :style="{
                    gridColumn: qi === activeRoom.questions.length - 1 && activeRoom.questions.length % 2 !== 0 ? 'span 2' : 'span 1',
                    background: selectedAnswers[qi] !== null && selectedAnswers[qi] !== undefined ? '#f0fdf4' : '#fafafa',
                    border: `1.5px solid ${selectedAnswers[qi] !== null && selectedAnswers[qi] !== undefined ? '#bbf7d0' : '#f0f0f0'}`,
                    borderRadius: '12px', padding: '0.75rem 0.75rem 0.625rem',
                    display: 'flex', flexDirection: 'column', gap: '0.625rem',
                    transition: 'border-color 0.2s, background 0.2s',
                    boxShadow: selectedAnswers[qi] !== null && selectedAnswers[qi] !== undefined ? '0 0 0 3px rgba(134,239,172,0.1)' : 'none'
                }">

                    <!-- Card header: number badge + hotspot label -->
                    <div style="display:flex;align-items:center;justify-content:space-between;gap:0.5rem;">
                        <div :style="{
                            width: '1.375rem', height: '1.375rem', borderRadius: '50%', flexShrink: 0,
                            background: selectedAnswers[qi] !== null && selectedAnswers[qi] !== undefined ? '#16a34a' : '#e5e7eb',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'background 0.2s'
                        }">
                            <span style="font-size:0.5rem;font-weight:800;color:white;">{{ qi + 1 }}</span>
                        </div>
                        <div style="display:flex;align-items:center;gap:0.25rem;flex:1;min-width:0;">
                            <span style="font-size:0.625rem;line-height:1;flex-shrink:0;">{{
                                HOTSPOT_CATEGORIES[q.hotspot].icon }}</span>
                            <span
                                style="font-size:0.4375rem;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#9ca3af;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">{{
                                    HOTSPOT_CATEGORIES[q.hotspot].label }}</span>
                        </div>
                    </div>

                    <!-- Question text -->
                    <p style="font-size:0.75rem;font-weight:600;color:#111827;margin:0;line-height:1.55;">{{ q.q }}</p>

                    <!-- Options -->
                    <div style="display:flex;flex-direction:column;gap:0.25rem;">
                        <button v-for="(opt, oi) in q.options" :key="oi" @click="$emit('selectAnswer', qi, oi)" :style="{
                            display: 'flex', alignItems: 'center', gap: '0.5rem',
                            padding: '0.4375rem 0.625rem', borderRadius: '8px', textAlign: 'left', width: '100%',
                            background: selectedAnswers[qi] === oi ? '#16a34a' : 'white',
                            border: `1.5px solid ${selectedAnswers[qi] === oi ? '#16a34a' : '#ebebeb'}`,
                            cursor: 'pointer', transition: 'all 0.15s', fontFamily: 'Inter,sans-serif',
                        }">
                            <div :style="{
                                width: '12px', height: '12px', borderRadius: '50%', flexShrink: 0,
                                border: `2px solid ${selectedAnswers[qi] === oi ? 'rgba(255,255,255,0.7)' : '#d1d5db'}`,
                                background: selectedAnswers[qi] === oi ? 'rgba(255,255,255,0.25)' : 'white',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.15s'
                            }">
                                <div v-if="selectedAnswers[qi] === oi"
                                    style="width:4px;height:4px;border-radius:50%;background:white;" />
                            </div>
                            <span
                                :style="{ fontSize: '0.6875rem', color: selectedAnswers[qi] === oi ? 'white' : '#374151', fontWeight: selectedAnswers[qi] === oi ? 600 : 400, lineHeight: '1.4', flex: 1 }">{{
                                    opt }}</span>
                        </button>
                    </div>

                </div>
            </div>
        </div>

        <!-- Submit bar -->
        <div
            style="padding:0.75rem 1.25rem;border-top:1px solid #f0f0f0;flex-shrink:0;display:flex;align-items:center;gap:0.75rem;">
            <div style="flex:1;">
                <p style="font-size:0.625rem;color:#9ca3af;margin:0;line-height:1.4;">
                    {{ answeredCount === activeRoom.questions.length ? 'All questions answered — ready to submit.' :
                        `${activeRoom.questions.length - answeredCount}
                    question${activeRoom.questions.length - answeredCount > 1 ? 's' : ''} left` }}
                </p>
            </div>
            <button @click="$emit('submitAnswers')" :disabled="answeredCount < activeRoom.questions.length" :style="{
                border: 'none', borderRadius: '11px', padding: '10px 20px', whiteSpace: 'nowrap',
                fontSize: '0.875rem', fontWeight: 800, fontFamily: 'Inter,sans-serif',
                cursor: answeredCount === activeRoom.questions.length ? 'pointer' : 'not-allowed',
                background: answeredCount === activeRoom.questions.length ? 'linear-gradient(135deg,#16a34a,#166534)' : '#f3f4f6',
                color: answeredCount === activeRoom.questions.length ? 'white' : '#9ca3af',
                boxShadow: answeredCount === activeRoom.questions.length ? '0 4px 14px rgba(22,163,74,0.28)' : 'none',
                transition: 'all 0.2s', flexShrink: 0
            }">
                Submit →
            </button>
        </div>

    </div>
</template>

<script setup>
import { HOTSPOT_CATEGORIES } from '@/utils/householdHotspotStaticData';

defineProps({
    activeRoom: {
        type: Object,
        required: true
    },
    answeredCount: {
        type: Number,
        required: true
    },
    selectedAnswers: {
        type: Array,
        required: true
    }
});
</script>