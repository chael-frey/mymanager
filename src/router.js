// 导入vue
import Vue from "vue"
// 导入vue-router
import VueRouter from "vue-router"
Vue.use(VueRouter)

// 导入组件
import login from "./components/login.vue"
// 路由规则
const routes=[
    {
        path: '/login',
        component: login
    }
];

// 实例化路由对象
const router =new VueRouter({
    routes
})

// 暴露出去
export default router;