import axios from "axios"
import Vue from "vue"
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
      }
      return response
    },
    function(error) {
      return Promise.reject(error)
    }
  )
// 抽取网络请求
const request ={
    login(params){
        return axios.post("login",params)
    },
    getUser(params){
        return axios.get("users",{params})
    },
    stateChange(params){
        return axios.put(`users/${params.id}/state/${params.mg_state}`,params)
    },
    delUser(params){
        return axios.delete(`users/${params.id}`,params)
    },
    addUser(params){
      return axios.post("users",params)
    }
}

export default{
    install(Vue){
        Vue.prototype.$axios=request;
    }
}