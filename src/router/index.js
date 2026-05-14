import { createRouter, createWebHistory } from 'vue-router'
import FoodDisposalView from '@/views/FoodDisposalView.vue'
import LeftoverRecipeViewAltTwo from '@/views/LeftoverRecipeViewAltTwo.vue'
import WelcomeView from '@/views/WelcomeView.vue'
import ClothingAwarenessView from '@/views/ClothingAwarenessView.vue'
import ClothingQuestionaireView from '@/views/ClothingQuestionaireView.vue'
import ClothingImpactDashboard from '@/views/ClothingImpactDashboard.vue'
import ClothingDecode from '@/views/ClothingDecode.vue'
import WasteAuditView from '@/views/WasteAuditView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: WelcomeView
    },
    {
        path: '/food/recipes',
        name: 'Leftover Recipe',
        component: LeftoverRecipeViewAltTwo
    },
    {
        path: '/food/disposal',
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
    },
    {
        path: '/clothing/textiledecode',
        name: 'Clothing Decode',
        component: ClothingDecode
    },
    {
        path: '/household/audit',
        name: 'Household Waste Audit',
        component: WasteAuditView
    }
]

const router = createRouter({
    history: createWebHistory('/'),
    routes
})

export default router