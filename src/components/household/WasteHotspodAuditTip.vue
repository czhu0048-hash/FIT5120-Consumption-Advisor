<template>
    <div
        style="flex:1; padding:1rem; background:linear-gradient(160deg,#f0fdf4 0%,#dcfce7 100%); display:flex; flex-direction:column; justify-content:space-between; overflow:hidden;">
        <div>
            <p
                style="font-size:0.4375rem; font-weight:700; letter-spacing:0.16em; text-transform:uppercase; color:#15803d; margin:0 0 0.5rem;">
                {{ panelOpen && activeRoom ? activeRoom.name + ' tip' : 'Tip' }}
            </p>
            <p style="font-size:0.6875rem; color:#166534; line-height:1.65; margin:0;">{{ contextualTip.text }}</p>
        </div>
        <div style="font-size:2rem; margin-top:0.75rem; line-height:1;">{{ contextualTip.emoji }}</div>
    </div>
</template>

<script setup>
defineProps({
    panelOpen: { type: Boolean },
    activeRoom: { type: Object },
    contextualTip: { type: Object }
})
</script>