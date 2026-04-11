<template>

    <!-- Recipe portal -->
    <div class="col-6 offset-3 mb-5" style="text-align: center;">
        <label class="col-12 font_sub" style="font-size: 150%;">Leftover Recipes</label>
        <div style="position: relative; display: inline-block;">
            <img src="../assets/FoodMainOne.png" alt="image" class="img-fluid food_main_bg" style="display: block;">
            <button class="btn btn-primary button_main" style="position: absolute;
                 top: 50%;
                  left: 50%;
                   transform: translate(-50%, -50%);
                    z-index: 1;
                    border-color: black;
                    background-color: black;" @click="toFoodOne">
                Explore
            </button>
        </div>
    </div>

    <!-- Disposal portal -->
    <div class="col-6 offset-3" style="text-align: center;">
        <label class="col-12 font_sub" style="font-size: 150%;">Food Disposal</label>
        <div style="position: relative; display: inline-block;">
            <img src="../assets/FoodMainTwo.png" alt="image" class="img-fluid food_main_bg" style="display: block;">
            <button class="btn btn-primary button_main" style="position: absolute;
                 top: 50%;
                  left: 50%;
                   transform: translate(-50%, -50%);
                    z-index: 1;
                    border-color: black;
                    background-color: black;" @click="toFoodTwo">
                Explore
            </button>
        </div>
    </div>
</template>

<script setup>
import { routerPushWithBase } from '@/utils/routerManipulation';
import { useRouter } from 'vue-router';

const router = useRouter();

const toFoodOne = () => {
    router.push(routerPushWithBase("/food1"))
}

const toFoodTwo = () => {
    router.push(routerPushWithBase("/food2"))
}
</script>

<style>
.food_main_bg {
    width: 20rem;
    height: 20rem;
    /* transform: translate(50%, 0%); */
}
</style>