0.复习
    1.获取服务器数据，解决跨域问题
    2.防抖，节流。
    3.路由跳转，声明式导航、编程式导航。

1.开发Search模块中的TypeNav商品分类菜单，过度动画。
    首先，因为typenav在全局中注册，所以可以直接在search中使用typenav
    然后，为typenav设置show属性，来判断是否展示商品分类菜单，v-show=show
    利用mouted来改变加载时的show
    再利用@mouseenter和@mouseleave来确定鼠标移动时的show属性
    最后利用transition加动画。

2.现在咱们的商品分类三级列表可以进行优化。
    过去只有home使用typenav，所以tyoenav访问服务器获取数据没关系，但是现在search也会访问，导致访问服务器次数过多，可以优化

    派发一个action获取一个三级列表数据，这个请求从typenav移到app，因为app组件最先执行，并且只运行一次。
    不能放在main里面，因为this代表的是对应的组件。所以只能app.vue

3.合并参数params和query参数。
    三级列表过去到search时，只有query，没有params
    同理从header的检索过去，只有params，没有query

    所以要在header中的gosearch进行query判断，把query继承进去
    要在typenav中进行params判断，把params集成进去，注意不是keyword

4.mockjs模拟，开发home首页的listcontainer组件与floor组件。
    //推荐一个网站，印记中文docschina.org
    使用步骤：
        在src中创建一个mock文件夹，提供假数据的。
        准备json数据（在mock文件夹中创建相应的json文件）
            json的数据格式必须格式化。
        把mock数据需要的图片放置到public文件夹中，public文件夹在打包的时候会原封不动放到dist中。
        开始mock（虚拟），通过mockjs模块实现。
            创建mock Server.js，通过mockjs插件来实现模拟数据。
            webpack默认对外暴露的模块有图片，json
        mockServer.js文件在入口文件中引入。
            不用import只要在入口执行一次就行
            import '@/mock/mockServe'
        向真实的服务器发请求是/api，这次向mock发，所以要在api新建一个mockAjax，用来向mock发请求。
        在index里面引入新的ajax,书写新的url
        去listContainer，让其在加载时就请求数据，去mounted派发action：通知vuex发起ajax请求，将数据存储在仓库中
        存库vuex就是表准三件套，action，mutation，state，和之前的一模一样。
        最后去组件当中使用map引入组件。


5.复习swiper ListContainer组件开发重点
    安装Swiper插件，npm install --save swiper@5
    样式的引用在入口，直接import就行。
        swiper必须在有结构以后再new，所以放在mounted中，但是要加定时器延迟等结构加载完以后再new spider
            mounted加载大部分结构（dom），但是来自ajax的数据不能加载完毕。
        解决方案，watch监听。
            watch两种写法，一种时对象的写法，一种是函数的写法。
            监听banner由空数组变为有内容的过程。
            使用对象的写法，必须有handler（newValue,oldValue){}
            这种方法只能保证banner数据有了，不能保证v-for遍历完成。
        watch+nextTick
            $nextTick在下次dom更新，循环结束之后，执行延迟回调。在修改数据之后，立即使用这个方法，获取更新后的dom
