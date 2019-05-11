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
import error from "./components/error.vue"
// 路由规则
const routes=[
    {path:"/login",component:login},
    {path:"/error",component:error},
    {path:"/",component:index,
      children:[
        {path:"",redirect:"user"},
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
    mode: 'history',
    routes
})

// 设置路由前置守卫
router.beforeEach((to, from, next) => {
  if(to.matched.length==0){
    next("error")
  }else{
    next()
  }
})

// 暴露出去
export default router;