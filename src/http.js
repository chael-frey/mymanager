import axios from "axios"
// 抽取网络请求
const request ={
    sayHi(){
        console.log("傻逼胡涛");
    }
}

export default{
    install(Vue){
        Vue.prototype.$request=request;
    }
}