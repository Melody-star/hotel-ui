import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: '/',
        redirect: '/home/showRoom'
    },
    {
        path: "/login",
        name: "Login",
        component: () => import('../views/login.vue')
    },
    {
        path: "/register",
        name: "Register",
        component: () => import('../views/register.vue')
    },
    {
        path: '/home',
        name: "Home",
        redirect: '/home/showRoom',
        component: () => import('../views/home.vue'),
        children: [
            {
                path: 'showRoom',
                name: 'ShowRoom',
                component: () => import('../views/room/showRoom.vue')
            },
            {
                path: 'addRoom',
                name: 'AddRoom',
                component: () => import('../views/room/addRoom.vue')
            },
            {
                path: 'findRoom',
                name: 'FindRoom',
                component: () => import('../views/room/findRoom.vue')
            },
            {
                path: 'bookRoom',
                name: 'BookRoom',
                component: () => import('../views/room/bookRoom.vue')
            },
            {
                path: 'showFood',
                name: 'ShowFood',
                component: () => import('../views/food/showFood.vue')
            },
            {
                path: 'addFood',
                name: 'AddFood',
                component: () => import('../views/food/addFood.vue')
            },
            {
                path: 'findFood',
                name: 'FindFood',
                component: () => import('../views/food/findFood.vue')
            },
            {
                path: 'foodCount',
                name: 'FoodCount',
                component: () => import('../views/food/foodCount.vue')
            }
        ]
    }
]

export const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})

export default router