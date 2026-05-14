<template>
    <div class="capture-option col-12 col-md-3" @click="$emit('cardFuntion')">
        <!-- <span class="material-symbols-outlined icon-md">{{ icon }}</span> -->
        <i class="icon-md" :class="iconName"></i>
        <span class="text-sm font-medium">{{ featureName }}</span>
    </div>

</template>

<script setup>
defineProps({
    featureName: {
        type: String,
        default: () => ("")
    },
    iconName: {
        type: String,
        default: () => ("")
    }
})
</script>