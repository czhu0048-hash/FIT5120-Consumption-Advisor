import { createRouter, createWebHistory } from 'vue-router'
import FoodDisposalView from '@/views/FoodDisposalView.vue'
import LeftoverRecipeViewAltTwo from '@/views/LeftoverRecipeViewAltTwo.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import ClothingAwarenessView from '@/views/ClothingAwarenessView.vue'
import ClothingQuestionaireView from '@/views/ClothingQuestionaireView.vue'
import ClothingImpactDashboard from '@/views/ClothingImpactDashboard.vue'

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
    },
    {
        path: '/clothing/calculator',
        name: 'Clothing Calculator',
        component: ClothingImpactDashboard
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

export default router