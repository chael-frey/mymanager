// 导入vue
import Vue from "vue"
// 导入vue-router
import VueRouter from "vue-router"   
Vue.use(VueRouter)

// 导入组件
import login from "./components/login.vue";
import index from "./components/index.vue";
import user from "./components/user.vue";
import roles from "./components/roles.vue";
import rights from "./components/rights.vue";
import shopList from "./components/shopList.vue";
import params from "./components/params.vue";
import categories from "./components/categories.vue";
import orders from "./components/orders.vue";
import reports from "./components/reports.vue";
// 路由规则
const routes=[
    {path:"/login",component:login},
    {path:"/",name:"home",component:index,
      children:[
        {path:"user",component:user},
        {path:"roles",component:roles},
        {path:"rights",component:rights},
        {path:"shopList",component:shopList},
        {path:"params",component:params},
        {path:"categories",component:categories},
        {path:"orders",component:orders},
        {path:"reports",component:reports}
      ],
    }
]

// 实例化路由对象
const router =new VueRouter({
    routes
})

// 暴露出去
export default router;