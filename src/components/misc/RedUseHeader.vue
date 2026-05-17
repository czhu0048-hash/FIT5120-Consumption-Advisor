<template>
    <div class="collapsable" style="min-height: 5vh; 
     text-align: center;">
        <h1 v-show="!collapsed" class="text-center display-5 fw-normal" style="padding-top: 3rem;">
            <span class="font-inter"><b>{{ inter }}</b></span>
            <span class="font-grace"> {{ grace }}</span>
            <span class="font-inter"><b>{{ interTwo }}</b></span>
        </h1>
        <p v-show="!collapsed">
            {{ paragraph }}
        </p>

        <div class="mt-5" v-show="!collapsed">
            <slot></slot>
        </div>

        <i v-if="collapsed" class="pi pi-angle-down"></i>
    </div>
</template>

<script setup>
import { ref } from 'vue';

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
    paragraph: {
        type: String,
        default: () => ("")
    }
})

const collapsed = ref(false)

// const toggleCollapse = () => {
//     collapsed.value = !collapsed.value;
// }
</script>

<style scoped>
.collapsable {
    transition-duration: 1ms;
}

/* .collapsable:hover {
    background-color: rgba(255, 255, 255, 0.598);
} */
</style>