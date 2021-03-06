import Vue from 'vue'
import App from './App.vue'

// 导入elmUI
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// 导入路由
import router from "./router";
// 导入vuex
import store from "./store"
// 导入axios
import http from "./http"
Vue.use(http)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
