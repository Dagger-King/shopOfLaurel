// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
// 使用插件
Vue.use(VueRouter);
// 引入路由
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";

//先把VueRoutere原型对象的push，先保存一份。
let originPush = VueRouter.prototype.push;
//重写push与replace
VueRouter.prototype.push = function(location,resolve,reject) {
    if(resolve && reject){
        //call||apply区别：相同点，都可以调用函数一次，都可以篡改函数的上下文一次。
        //不同点，call传递参数用逗号隔开，apply方法传递数组
        originPush.call(this,location,resolve,reject);
    } else {
        originPush.call(this,location,()=>{},()=>{});
    };
};


// 配置路由
export default new VueRouter({
    // 配置路由
    routes: [
        {
            path: '/home',
            component: Home,
            meta:{
                show:true
            }
        },
        {
            path: '/login',
            component: Login,
            meta:{
                show:false
            }
        },
        {
            path: '/register',
            component: Register,
            meta:{
                show:false
            }
        },
        {
            path: '/search/:keyword?',
            name:"Search",
            component: Search,
            meta:{
                show:true
            }
        },
        // 重定向，在访问/时立刻定向到首页。
        {
            path: '*',
            redirect: '/home'
        }
    ]
})