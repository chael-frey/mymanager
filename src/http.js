import axios from "axios"
import Vue from "vue"
import router from "./router"
axios.defaults.baseURL="http://localhost:8888/api/private/v1/"
// 拦截器修改header代入token
axios.interceptors.request.use(function (config) {
    config.headers.Authorization=window.sessionStorage.getItem("token");
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
// 响应拦截器 响应回来之后 执行
axios.interceptors.response.use(
    function(response) {
      // Do something with response data
      // console.log('响应回来啦啦！！')
      if (response.data.meta.status == 200) {
        // this.$message.success(response.data.meta.msg)
        // 原型使用
        // if(response.data.meta.msg==="获取管理员列表成功") return
        Vue.prototype.$message.success(response.data.meta.msg)
        // 实例化Vue
        // new Vue().$message.success(response.data.meta.msg)
      }else if(response.data.meta.status == 400){
        Vue.prototype.$message.error("小逼崽子你想干嘛")
        router.push("/login")
        window.sessionStorage.clear()
      }
      return response
    },
    function(error) {
      return Promise.reject(error)
    }
  )
// 抽取网络请求
const request ={
    //登录 
    login(params){
        return axios.post("login",params)
    },
    // 获取用户
    getUser(params){
        return axios.get("users",{params})
    },
    // 修改用户状态
    stateChange(params){
        return axios.put(`users/${params.id}/state/${params.mg_state}`,params)
    },
    // 删除用户
    delUser(params){
        return axios.delete(`users/${params.id}`,params)
    },
    // 新增用户
    addUser(params){
      return axios.post("users",params)
    },
    // 根据id获取用户信息
    getUserById(id){
      return axios.get(`users/${id}`)
    },
    // 修改用户信息
    updateUser(params){
      return axios.put(`users/${params.id}`,params)
    },
    // 分配用户角色
    updateUserRole(params) {
      return axios.put(`users/${params.id}/role`, {
        rid: params.rid
      })
    },
    // 获取角色
    getRoles(){
      return axios.get("roles")
    },
    // 新增角色
    addRoles(params){
      return axios.post("roles",params)
    },
    // 删除角色
    delRoles(params){
      return axios.delete(`roles/${params.id}`,params)
    },
    // 修改角色
    updateRolesById(params){
      return axios.put(`roles/${params.id}`,params)
    },
    // 获取权限列表
    getRights(){
      return axios.get("rights/list")
    },
    // 获取树形权限列表
    getTreeRights(){
      return axios.get("rights/tree")
    },
    // 删除权限
    delRights(params){
      return axios.delete(`roles/${params.roleId}/rights/${params.rightId}`)
    },
    // 获取订单列表
    getOrderList(params){
      return axios.get("orders",{params})
    },
    // 获取折线图数据
    getReports(){
      return axios.get("reports/type/1")
    } ,
    // 为角色授权
    // roleId角色id
    // rids  id,id,id,权限id列表
    setRoleRights(params){
      return axios.post(`roles/${params.roleId}/rights`,{
        rids:params.rids
      })
    },
    // 获取左侧导航
    getMenu(){
      return axios.get('menus')
    },
    getGoods(params){
      return axios.get("goods",{params})
    },
    // 获取商品分类
    getCategories(){
      return axios.get("categories?type=3")
    },
    // 获取该商品静态参数
    getStatic(params){
      return axios.get(`categories/${params.id}/attributes?sel=${params.type}`)
    }
}

export default{
    install(Vue){
        Vue.prototype.$axios=request;
    }
}