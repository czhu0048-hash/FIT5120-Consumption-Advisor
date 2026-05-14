<template>
    <div class="card h-100 clickable" v-if="method.source_link" @click="openLink(method.source_link)">
        <div class="d-flex justify-content-between align-items-start gap-2">
            <span>{{ method.label }}</span>
        </div>
        <div class="card-body d-flex flex-column gap-2">
            <div>
                <span class="text-success">{{ method.stream }}</span>
            </div>
            <b class="small mb-0">{{ method.steps }}</b>
            <label v-if="method.notes" class="small text-muted fst-italic mb-0">~ {{ method.notes }}</label>
        </div>
    </div>
</template>

<script setup>
defineProps({
    method: {
        type: Object,
        required: true,
    }
})

const openLink = (link) => {
    if (link) {
        window.open(link, '_blank');
    }
}
</script>

<style scoped>
span {
    color: black;
    font-family: 'Nunito', sans-serif;
}

.clickable {
    cursor: pointer !important;
    transition: 0.5ms;
}

.clickable:hover {
    background-color: #eee;
}
</style>