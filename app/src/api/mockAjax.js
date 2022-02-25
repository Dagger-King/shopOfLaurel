//对于axios进行二次封装
import axios from "axios"
import nprogress from "nprogress";
import "nprogress/nprogress.css"
// import { config } from "vue/types/umd";
// console.log(nprogress)
//1.利用axios对象的方法create，去创建一个axios实例。
// 2.request就是axios,只不过稍微配置一下。
const requests = axios.create({ 
    // 配置对象
    // 基础路径，发请求的时候，路径会出现api
    baseURL:'/mock',
    // 代表请求超时的时间。
    timeout:5000
})
// 请求拦截器：在发请求之前，请求拦截器可以拦截到。

requests.interceptors.request.use((config)=>{
    // config:配置对象，对象里面有一个属性很重要，headers请求头
    // 进度条开始
    nprogress.start();
    return config;
});

requests.interceptors.response.use((res)=>{
    // 成功的回调函数，富趣味i响应的数据回来以后，
    nprogress.done();
    return res.data;
},(err)=>{
    return Promise.reject(new Error('fail'))
})


//对外暴露
export default requests