1.完成一级分类动态添加背景颜色
    第一种解决方案，直接改样式，:hover
    第二种解决方案，通过js完成。
        在data设置一个curIndex，默认-1
        添加事件@mouseenter，传参，把index传给curIndex。
        添加事件鼠标离开，curIndex改为-1
        改样式，添加一个curIndex==index时的样式。

2.通过js控制二三级商品分类显示与隐藏
    第一种方案，直接:hover
    第二种方案，display:curIndex==index?block:none

3.演示卡顿现象
    正常:事件触发非常频繁，而且每一次的触发，回调函数都要去执行（如果时间很短，而且回调函数内部有计算，浏览器很有可能卡顿）
    节流:在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发。
    防抖:前面的所有的触发都被取消，最后一次执行在规定的时间之后才会触发，也就是说如果连续快速的触发，只会执行一次。

4.lodash
    里面封装了防抖与节流的业务，前置知识点：闭包，延迟期

5.完成三级联动的节流操作
    在typenav中引入lodash import _ from 'lodash'
    这种引入方式是把lodash全部功能函数引入
    按需引入 import throttle from 'lodash/throttle'          throttle是默认暴露的。不用加括号

    es6写法没法搞._，所以采用es5的写法
    changeIndex:_.throttle(function(index){},50)
    按需引入后可以改成
    changeIndex:throttle(function(index){},50)


6.三级联动组件的路由跳转与传递参数
三级联动用户可以点击的：
方法1，声明式导航，把换成router-link，href换成to，缺点：可能出现卡顿，组件太多，占用内存。
方法2，进行路由跳转@click=gosearch,这种也不是最优秀的，回调函数太多。
方法3，事件委派给最上级，问题，点击的确定。

7.完成三级联动的路由跳转与传递参数。
    问题1：事件委派是把所有的子节点委派给父节点，但是只有a标签跳转。
    问题2：就算确定了点的是a标签，如何确认点击的是哪个级别。

    添加自定义属性，data=categoryName用来判断是不是a标签，再用data=category1id，2id，3id来分辨级别

    整理路由跳转的参数。


注意：search的路由记得加？ 