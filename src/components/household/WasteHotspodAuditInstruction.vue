<template>
    <div style="padding:1.125rem 1rem 0.875rem; border-bottom:1px solid #f3f4f6;">
        <p
            style="font-size:0.4375rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#9ca3af; margin:0 0 0.75rem;">
            How it works</p>
        <div style="display:flex; flex-direction:column; gap:0.7rem;">
            <div v-for="(step, i) in HOW_IT_WORKS" :key="i"
                style="display:flex; align-items:flex-start; gap:0.5625rem;">
                <div
                    style="width:1.375rem; height:1.375rem; border-radius:50%; background:#f0fdf4; border:1.5px solid #bbf7d0; display:flex; align-items:center; justify-content:center; flex-shrink:0; margin-top:1px;">
                    <span style="font-size:0.5rem; font-weight:800; color:#15803d;">{{ i + 1 }}</span>
                </div>
                <div style="padding-top:1px;">
                    <p style="font-size:0.6875rem; font-weight:700; color:#374151; margin:0 0 1px;">{{ step.title }}</p>
                    <p style="font-size:0.625rem; color:#9ca3af; margin:0; line-height:1.5;">{{ step.body }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { HOW_IT_WORKS } from '@/utils/householdRoomVisualizationStaticData';
</script>