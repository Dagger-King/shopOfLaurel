1:vue-cli脚手架初始化项目。
node+webpack+taobao镜像
目录详解：
    node_modules:项目依赖的东西
    piblic：一般放置静态资源，webpack会打包到dist，原封不动
    src：源代码文件夹。
        assets：防止静态资源，多个组件共用的静态资源，在webpack打包时会把静态资源当作模块打包到js里。
        componets：防止非路由组件。
        App.vue：唯一根组件。
            template：html
            script：js
            style：css
        main.js:程序入口
    Babel.config.js：配置文件。
    package.json：认为时项目身份证。项目怎么运行
    package-lock.json：缓存性文件。
    README.md：说明性文件
2：项目的其他配置
2.1：项目运行起来时浏览器自动打开。
    在package.json中的scripts对象中的serve中添加--open，因为npm run serve就是调用的它。
2.2：eslint校验功能关闭。（eslint太严格了，笑哭）
    创建一个vue.config.js
    在俩面module.exports一个lintOnSave:false
2.3：src文件夹简写方法，配置别名。@
    因为src用的比较频繁。
jsconfig.json配置别名@提示
{
    "comilerOptions":{
        "baseUrl":"./",
        "paths":{
            "@/*":["src/*"]
        }
    },
    "exclude":["node_modules","dist"]
}
    设置报错的话，在vscode中的设置搜索check，把js的checkjs选中，就好了

3.项目路由的分析
vue-router
前端所谓路由就是kv键值对
key:URL（地址栏中的路径）
value：相应的路由组件
项目结构：上中下

路由组件：home，search，login，register
非路由组件：header，footer（login，register没有）

4.完成非路由组件header，footer
项目：
    先写静态页面
    拆分组件
    获取服务器的数据动态展示
    完成相应的动态业务逻辑
注意1：创建组件的时候，组件结构，样式，图片资源
注意2：项目采用less样式，浏览器不识别，通过less，less-loader进行处理。5版本
注意3：如果想让组件识别less样式，需要在style标签上田间lang="less"

4.1使用组件的步骤（非路由组件）
创建或者定义
引入
注册
使用

5.路由组件的搭建
安装vuerouter，这里要注意一下，因为默认的router版本不匹配2.0，所以要装低版本router
-components文件夹：经常放置的非路由组件（共同全局组件）
-pages|views文件夹：经常放置路由组件

5.1配置路由
项目当中配置的路由一般放置在router文件夹中

5.2总结
路由组件与非路由组件的区别：
    1.放置位置不同
    2.路由组件一般需要在router文件夹中进行注册，使用的即为组件的名字，非路由组件一般都是以标签的形式使用。

    $route：一般获取路由信息，路径，query，params
    $router：一般进行编程式导航进行路由跳转push，replace

    3.注册完路由，不管时路由组件还是非路由组件，都有$router,$router属性。

5.3路由的跳转
路由的跳转有两种形式：声明式导航router-link，可以进行路由的跳转
编程式导航push|replace,可以进行路由跳转

声明式导航能做的编程式都能做
但是编程式导航可以进行其他的业务逻辑

6Footer组件的显示和隐藏

v-if操作dom废性能，v-show更好一些。

6.1我们可以根据组件身上的$route.path来获取当前路由的信息，通过路由路径判断Footer显示和隐藏
6.2配置路由的时候，可以给路由添加路由元信息meta，路由需要配置对象，它的key是固定的。


8路由传参

8.1路由的跳转
声明式导航：router-link,要有to
编程式导航：利用组件$router.push

8.2路由的传参，参数的写法
params：属于路径当中的一部分，需要占位
query：不属于路径，类似于ajax的queryString，不需要占位。