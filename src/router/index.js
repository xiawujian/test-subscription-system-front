import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import HomeView from "@/views/HomeView";
import UserProfileView from "@/views/UserProfileView";
import ShoppingCartView from "@/views/ShoppingCartView";
import TextbookShowView from "@/views/TextbookShowView";
import UserHomeView from "@/views/UserHomeView";
import axios from "axios";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'register',
        component: RegisterView
    },
    {
        path: '/home',
        component: HomeView,
        children: [
            {
                path: '',
                name: 'user',
                component: UserHomeView
            },
            {
                path: 'cart',
                name: 'cart',
                component: ShoppingCartView
            },
            {
                path: 'textbook',
                name: 'textbook',
                component: TextbookShowView
            },
            {
                path: 'profile',
                name: 'profile',
                component: UserProfileView
            }
        ]
    }
]
const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
// todo 做各页面的路由前鉴权
router.beforeEach((to, from, next) => {
    axios.get("/account/loginStatus")
        .then((response) => {
            router.app.$root.loginStatus = response.data  // router.app对应Vue实例的this
            if (router.app.$root.loginStatus.login) {
                next()
            } else {
                if (to.path === "/" || to.path === "/login" || to.path === "/register" || to.path === "/home") {
                    next();
                }
            }
        })
        .catch((error) => {
            router.app.$message.error(error.response.data)
            next(false)
        })
})

export default router
