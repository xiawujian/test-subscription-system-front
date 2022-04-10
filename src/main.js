import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(ElementUI);

new Vue({
  data: {
    loginStatus: {  // Vue全局变量维护登录状态
      login: null,
      userid: null,
      username: null
    }
  },
  router,
  render: h => h(App),
}).$mount('#app')

