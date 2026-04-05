import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import FoodMainView from '@/views/FoodMainView.vue'
import LeftoverRecipeView from '@/views/LeftoverRecipeView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: DashboardView
    },
    {
        path: '/food',
        name: 'Food',
        component: FoodMainView
    },
    {
        path: '/food1',
        name: 'Leftover Recipe',
        component: LeftoverRecipeView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router