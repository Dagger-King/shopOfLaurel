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