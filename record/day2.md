1:编程式路由跳转到当前路由（参数不表），多次执行会抛出NavigationDuplicated的警告错误。
    路由跳转两种形式，声明式，编程式。
    声明式导航没有这类问题。vue-router已经处理好了
1.1为什么编程式导航进行路由跳转的时候，就有这种警告错误。
"vue-router":"^3.5.3":最新的vue-router引入promise

function push(){
    return new Promise((resolve,regject))
}

1.2怎么解决
通过给push方法传递相应成功，失败的回调函数，能够捕获当前的错误。

1.3通过底部的代码，可以实现解决错误
this.$router.push({name:"search",params:{keyword:this.keyword},query:{k:this.keyword.toUpperCase()}},()=>{},()=>{})

指标不治本，将来在其他组件中调用push或者replace都会有相应的错误。

1.4
this：当前组件实例
this.$router：当前的这个属性，属性值VueRouter类的一个实例，当在入口文件注册路由的时候，给组件实例添加$router|$route属性。
push：VueRouter类的一个实例。
function VueRouter(){

}

//原型对象的方法
VueRouter.prototype.push = function(){
    //函数的上下文为VueRouter类的一个实例
}

let $router = new VueRouter();

$router.push(xxx);

this.$router.push();

所以要重写push，必须要到带有VueRouter的地方。，也就是路由那里

2：Home模块组件拆分
    先把静态页面完成
    拆分出静态组件
    获取服务器的数据进行展示
    动态业务

3：三级联动组件完成
    由于三级联动，在Home、Search、Detail，把三级联动注册为全局组件。
    好处：只需要注册一次，就可以在项目中任意地方使用。

4：完成其余静态组件
    HTML+CSS+图片资源。
    Home的子组件ListContainer
    在Home中引入ListContainer

5：POSTMAN测试接口
    如果服务器返回的数据code字段200，代表服务器返回数据成功。
    整个项目，接口前缀都有/api字样。
    老师的服务器测试39.98.123.211/api/product/getBaseCategoryList

6：axios二次封装
    XMLHttpRequese、fetch、JQ、axios
6.1为什么血药进行二次封装axios？
请求拦截器、响应拦截器
请求拦截器可以在发请求之前处理一些业务
响应拦截器可以在服务器数据返回以后，可以处理一些事情。

6.2在项目当中经常api文件夹管理axios
接口当中：路径都带有/api
baseURL:"/api"

6.3参考git，npm上关于axios的文档。

下载安装npm install --save axios
写一个request.js,引入axios，利用axios对象的方法create去创建一个实例。baseURL和timeout
请求拦截器：
    requests.interceptors.request.use(config > config)
响应拦截器：
    requests.interceptors.request.use(res > res.data ,err > Promise.reject(New Error('fail)))


7：接口统一管理

项目很小：完全可以在组件的声明周期发请求
项目大：axios.get('xxx')

7.1跨域问题
跨域：如果出现类协议，域名，端口号不同的请求，称之为跨域。

JSONP,CROS,代理

在api新建一个index.js
    引入requests
    暴露一个函数reqCategoryList
    利用webpack跨域，devserver、proxy、第二个

8：nprogress进度条的使用
    下载安装npm install --save nprogress
    在响应组件中，引入nprogress
    在请求拦截器中使用start方法
    在响应拦截器中使用done方法
    引入样式nprogress/nprogress.css


9：vuex状态管理库

9.1vuex
    是官方提供的一个插件，是一个状态管理库。集中式管理项目中组件公用的数据。
    切记，并不是全部项目都需要vuex，如果项目很小，完全不需要vuex，如果项目很大，组件很多，数据很多，数据维护很费劲，vuex
    npm install --save vuex

9.2vuex的使用。
    在src中新建仓库store
    在index.js中引入vue，vuex
    vue使用vuex
    对外暴露store的一个实例
        state仓库存储数据的地方
        mutations修改state的唯一手段
        actions处理action，可以书写自己的业务逻辑，也可以处理异步
        getters理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便。
        以上都是对象。
    去入口注册仓库
        引入store
        注册store，组件实例的身上会多一个$store属性。

9.3vuex实现模块式开发
    项目太大，组件太多，接口也太多，state数据太多，可以使用vuex进行模块化开发，把一个大仓库拆分成若干小仓库
        在store中新建文件夹，然后在index.js中写入四个变量，并且暴露这四个变量
    在store里面引入小仓库
        使用modules来替换前面提到的四个变量，同时在modules里面注册小仓库。

10：完成三级联动TypeNav展示数据业务
    axios与vuex式前提
    把全局组件放在components里面。

    组件挂载完毕，就向服务器发请求。
        mounted(){}
        通知Vuex发请求，获取数据，存储于仓库中
            this.$store.dispatch()
                起个名字，叫'categoryList'
                去store的home模块
                    引入reqCategoryList
                    书写actions，通过api里面的接口函数调用，向服务器发请求。
                        在categoryList方法中调用reqCategoryList
                        let result = reqCategoryList()
                        写await和async，两者必须同时存在
                        如果result.code是200，提交commit("CATEGORYLIST",result.data)
                    在mutations中
                        CATEGORYLIST(state,categoryList){
                            state.categoryList=categoryList
                        }
                    在state中categoryList要有起始值，起始值是一个数组。
                        state中数据默认初始值不能瞎写。
        引入{mapState}从vuex
        在computed写入...mapState()
            这个mapstate，里面categorylist要把大仓库的数据返回模块化的数据
    在结构里面，使用v-for
        v-for="(c1) in __" :key=c1.__
        {{c1.__}}

    注意事项，在做这个项目的时候犯了很多错误。
        1.mouted是方法，所以是(){},coputed是对象：{}
        2.在action中使用commit，一定要在方法中传参，不然not found

