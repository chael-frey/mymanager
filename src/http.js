// 引入axios
import axios from "axios"
// 导入vue
import Vue from 'vue'
// 设置基地址
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1';

// 拦截器-请求部分
axios.interceptors.request.use(function (config) {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

// 拦截器-响应部分
axios.interceptors.response.use(function (response) {
    Vue.prototype.$message.success(response.data.meta.msg)
    return response;
  }, function (error) {
    // Do something with response error
    return Promise.reject(error);
  });

// 抽取网络请求
const request={
    // 登录
    login(params){
      return  axios.post("login",params);
    },
    // 获取左侧菜单
    getMenu(){
      return axios.get("menus")
    }
} 
// 暴露出去 包含install方法的对象
export default{
    install(Vue){
        Vue.prototype.$axios=request
    }
}
