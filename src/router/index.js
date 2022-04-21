import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";
import HomeView from "@/views/HomeView";
import UserProfileView from "@/views/UserProfileView";
import ShoppingCartView from "@/views/ShoppingCartView";
import TextbookShowView from "@/views/TextbookShowView";
import UserHomeView from "@/views/UserHomeView";

Vue.use(VueRouter)
export default new VueRouter({
    routes: [
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
})