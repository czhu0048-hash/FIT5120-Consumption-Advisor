<template>
    <div style="padding:0.875rem 1.125rem; border-bottom:1px solid #f3f4f6;">
        <p
            style="font-size:0.4375rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#9ca3af; margin:0 0 0.5rem;">
            Room Status</p>
        <div style="display:flex; flex-direction:column; gap:0.2rem;">
            <div v-for="id in ROOM_ORDER" :key="'rs-' + id" :style="{
                display: 'flex', alignItems: 'center', gap: '0.5625rem',
                padding: '0.4375rem 0.5625rem', borderRadius: '10px', cursor: 'pointer',
                background: completed.has(id) ? '#f0fdf4' : 'transparent',
                border: `1px solid ${completed.has(id) ? '#bbf7d0' : 'transparent'}`,
                transition: 'all 0.15s'
            }" @click="$emit('open-room', id)" @mouseenter="hovered = id" @mouseleave="hovered = null">
                <div
                    :style="{ width: '1.625rem', height: '1.625rem', borderRadius: '7px', background: completed.has(id) ? '#dcfce7' : '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', flexShrink: 0 }">
                    {{ completed.has(id) ? '✓' : ROOMS[id].icon }}
                </div>
                <span style="flex:1;font-size:0.8125rem;font-weight:600;color:#111827;">{{ ROOMS[id].name }}</span>
                <span :style="{
                    fontSize: '0.5rem', fontWeight: 700, padding: '2px 7px', borderRadius: '9999px',
                    background: completed.has(id) ? '#dcfce7' : '#f3f4f6',
                    color: completed.has(id) ? '#15803d' : '#9ca3af'
                }">{{ completed.has(id) ? 'Complete' : 'Not started' }}</span>
            </div>
        </div>
    </div>

</template>


<script setup>
import { ref } from 'vue';
import { ROOM_ORDER } from '@/utils/householdRoomVisualizationStaticData';
import { ROOMS } from '@/utils/householdQuestionnaireStaticData'

defineProps({
    completed: { type: Set }
});

const hovered = ref(null);
</script>
<!-- openRoom(id) -->
<!-- completed -->
<!-- hovered -->