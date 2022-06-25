// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes"
// 使用插件
Vue.use(VueRouter);
// 引入路由


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
    routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
      },
})