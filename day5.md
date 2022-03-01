1.开发floor组件
    state的数据格式取决于服务器返回的数据
    1.1getfloor这个action在哪里触发：在home里触发。
    1.2v-for也可以用在自定义标签。
    1.3组件通信的方式。
        props：用于父子传递。
        @on @emit可以实现子给父通信
        全局事件总线：$bus 全能
        pubsub-js:vue几乎不用，react用的多
        插槽
        vuex


2.把首页当中的轮播图拆分为一个公用的组件。
immediate:true代表立即监听。
以后在开发项目的时候，如果看到某一个组件在很多地方都使用，把他变成全局组件。
注册一次，可以在任意地方使用，公用的组件，非路由组件放在components文件夹中。



3.search模块的开发
    3.1写静态页面
    3.2把静态组件进行拆分
    3.3发请求
    3.4写仓库
    3.5组件获取仓库数据
    3.6动态展示数据。

    项目当中getteres主要的作用是简化仓库中的数据。

    mounted只调用一次，挂载组件时
    封装起来就可以调用很多次,因为search请求数据需要传递参数，是个对象，这个对象可以放在search的data中，再在beforemount里面将query和params传递给data，然后再method中床罩一个请求数据的方法。
        Object.assign(1,2)可以把2以后的参数传给1，o要大写。