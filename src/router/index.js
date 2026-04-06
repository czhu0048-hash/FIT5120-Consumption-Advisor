import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'
import FoodMainView from '@/views/FoodMainView.vue'
import LeftoverRecipeView from '@/views/LeftoverRecipeView.vue'
import FoodDisposalView from '@/views/FoodDisposalView.vue'

const base = "/FIT5120-Consumption-Advisor";

const routes = [
    {
        path: base + '/',
        name: 'Home',
        component: DashboardView
    },
    {
        path: base + '/food',
        name: 'Food',
        component: FoodMainView
    },
    {
        path: base + '/food1',
        name: 'Leftover Recipe',
        component: LeftoverRecipeView
    },
    {
        path: base + '/food2',
        name: 'Leftover Disposal',
        component: FoodDisposalView
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router