<template>
    <h1 class="text-center display-5 fw-normal">
        <span class="font-inter"><b>{{ inter }}</b></span>
        <span class="font-grace"> {{ grace }}</span>
        <span class="font-inter"><b>{{ interTwo }}</b></span>
    </h1>
</template>

<script setup>
defineProps({
    inter: {
        type: String,
        default: () => ("")
    },
    grace: {
        type: String,
        default: () => ("")
    },
    interTwo: {
        type: String,
        default: () => ("")
    },
})
</script>