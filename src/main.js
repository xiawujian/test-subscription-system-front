import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import elTableInfiniteScroll from "el-table-infinite-scroll";
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(elTableInfiniteScroll)
new Vue({
  data: {
    loginStatus: {  // Vue全局变量维护登录状态
      login: null,
      userid: null,
      username: null,
      role: null
    }
  },
  router,
  render: h => h(App),
}).$mount('#app')

