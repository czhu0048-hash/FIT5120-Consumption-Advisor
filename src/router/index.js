import { createRouter, createWebHistory } from 'vue-router'
import FoodMainView from '@/views/FoodMainView.vue'
import FoodDisposalView from '@/views/FoodDisposalView.vue'
import LeftoverRecipeViewAltTwo from '@/views/LeftoverRecipeViewAltTwo.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import ClothingMainView from '@/views/ClothingMainView.vue'


const routes = [
    {
        path: '/',
        name: 'Home',
        component: WelcomeView
    },
    {
        path: '/food',
        name: 'Food',
        component: FoodMainView
    },
    {
        path: '/food1',
        name: 'Leftover Recipe',
        component: LeftoverRecipeViewAltTwo
    },
    {
        path: '/food2',
        name: 'Leftover Disposal',
        component: FoodDisposalView
    },
    {
        path: '/clothing',
        name: 'Clothing',
        component: ClothingMainView
    }
]

const router = createRouter({
    history: createWebHistory('/FIT5120-Consumption-Advisor/'),
    routes
})

export default router