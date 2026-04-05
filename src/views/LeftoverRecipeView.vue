<template>
    <div class="row mt-5">
        <label style="text-align: center; font-size: 150%;">What do you have?</label>
        <div class="d-flex flex-wrap justify-content-center" style="align-items: center;">
            <ul v-for="(leftover, index) in leftoverList" :key="index">
                <input type="text">
            </ul>
        </div>
        <button class="col-4 offset-4 btn btn-primary" @click="addToleftover">Add</button>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';

const leftoverList = ref([]);

const addToleftover = (item) => {
    leftoverList.value.push(item)
}

onMounted(() => {
    addToleftover("")
});
</script>