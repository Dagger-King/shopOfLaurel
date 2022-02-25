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