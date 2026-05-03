import { createRouter, createWebHistory } from 'vue-router'
import FoodDisposalView from '@/views/FoodDisposalView.vue'
import LeftoverRecipeViewAltTwo from '@/views/LeftoverRecipeViewAltTwo.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import ClothingAwarenessView from '@/views/ClothingAwarenessView.vue'
import ClothingQuestionaireView from '@/views/ClothingQuestionaireView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: WelcomeView
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
        path: '/clothing/awareness',
        name: 'Clothing Awareness',
        component: ClothingAwarenessView
    },
    {
        path: '/clothing/questionaire',
        name: 'Clothing Questionaire',
        component: ClothingQuestionaireView
    }
]

const router = createRouter({
    history: createWebHistory('/FIT5120-Consumption-Advisor/'),
    routes
})

export default router