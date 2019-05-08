import axios from "axios"
axios.defaults.baseURL="http://localhost:8888/api/private/v1/"
// 抽取网络请求
const request ={
    login(params){
        return axios.post("login",params)
    }
}

export default{
    install(Vue){
        Vue.prototype.$axios=request;
    }
}