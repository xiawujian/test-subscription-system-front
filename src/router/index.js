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
import ShoppingOrderView from "@/views/ShoppingOrderView";
import TeacherHomeView from "@/views/TeacherHomeView";
import AdminHomeView from "@/views/AdminHomeView";
import TextbookEditView from "@/views/TextbookEditView";
import TextbookDetailView from "@/views/TextbookDetailView";
import TeacherTextbookView from "@/views/TeacherTextbookView";
import AccountManageView from "@/views/AccountManageView";
import TextbookManageView from "@/views/TextbookManageView";
import OrderManageView from "@/views/OrderManageView";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: 'login'
    },
    {
        path: '/login',
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
                path: 'student',
                name: 'user',
                component: UserHomeView,
            },
            {
                path: 'student/cart',
                name: 'cart',
                component: ShoppingCartView
            },
            {
                path: 'student/textbook',
                name: 'textbook',
                component: TextbookShowView
            },
            {
                path: 'student/order',
                name: 'order',
                component: ShoppingOrderView
            },
            {
                path: 'student/profile',
                name: 'profile',
                component: UserProfileView
            },

            {
                path: 'teacher',
                name: 'teacher',
                component: TeacherHomeView,
            },
            // {
            //     path: '',
            //     component: TeacherHomeView,
            // },
            {
                path: 'teacher/search',
                component: TextbookShowView
            },
            {
                path: 'teacher/edit',
                component: TextbookEditView
            },
            {
                path: 'teacher/my',
                component: TeacherTextbookView
            },
            {
                path: 'admin',
                name: 'admin',
                component: AdminHomeView,
            },
            {
                path: 'admin/account',
                component: AccountManageView,
            },
            {
                path: 'admin/textbook',
                component: TextbookManageView,
            },
            {
                path: 'admin/order',
                component: OrderManageView,
            },
            {
                path:'detail/:textbookId',
                component: TextbookDetailView
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
                } else {
                    router.app.$message.error("请先登录后查看")
                    next(false)
                }
            }
        })
        .catch((error) => {
            router.app.$message.error(error.response.data)
            next(false)
        })
})

export default router
