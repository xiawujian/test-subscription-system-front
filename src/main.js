import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import elTableInfiniteScroll from "el-table-infinite-scroll";
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {faUser} from "@fortawesome/free-solid-svg-icons";

library.add(faUser)

Vue.config.productionTip = false
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.use(ElementUI);
Vue.use(elTableInfiniteScroll)
new Vue({
  data: {
    loginStatus: {  // Vue全局变量维护登录状态
      login: null,
      userId: null,
      username: null,
      role: null
    }
  },
  router,
  render: h => h(App),
}).$mount('#app')

