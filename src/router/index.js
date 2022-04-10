import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from "@/views/LoginView";
import RegisterView from "@/views/RegisterView";

Vue.use(VueRouter)
export  default  new VueRouter({
    routes:[
        {
            path:'/',
            name:'login',
            component:LoginView
        },
        {
            path:'/register',
            name:'register',
            component:RegisterView
        }
    ]
})