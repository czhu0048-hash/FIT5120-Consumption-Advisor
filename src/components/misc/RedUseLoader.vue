<template>
    <i v-if="loading" class="pi pi-spin pi-spinner font-main"
        :class="imbeded ? 'text-start text-white m-2' : 'text-center'"
        :style="imbeded ? 'font-size: 1em; vertical-align: middle;' : 'font-size: 2rem; display: block;'"></i>
</template>

<script setup>
defineProps({
    loading: { type: Boolean, required: true },
    imbeded: { type: Boolean, default: false },
})
</script>