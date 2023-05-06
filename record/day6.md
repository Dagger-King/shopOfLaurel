1.我们想要让search的请求多发几次，于是监视search的route属性，route属性每发生一次变化，发送一次请求。
小技巧：在watch中写，参数（old value，newvalue）{console。log（111）}如果打印了，就监听成功了


2.关于面包屑，一方面通过searchparams来提供面包屑，再对x进行点击methods，一方面就是把searchparams进行清空，这里注意，因为提交服务器的参数是任意的，所以可以清空可以使用undefined来进行优化。另一方面就是直接使用路由进行跳转，跳转到自己的页面，同时因为监听的存在会重新请求数据。
    不过对于keyword还需要考虑一点就是把header的关键字删掉，这里用全局变量$bus，在入口中写入，然后在beforecreate写Vue.prototype.$bus = this;
    点击事件写this.$bus.$emit("clear");
    在headers的mounted里面写 this.$bus.$on("clear",()=>{      this.keyword="";    }

    面包屑处理品牌信息：
        1.点选trademark时，因为trademark是search子节点的，所以要先传回search
            使用@click，在methods中添加方法，注意要传参。
            this.$emit('trademarkInfo',trademark)
        2.在search中的标签添加事件，用来获得子节点传的参数@trademarkInfo='trademarkInfo'
            在methods中写trademarkInfo方法：
                1.更改searchparams中的trademark
                    使用模板字符串的话，要记得用反引号，之前一直不对的原因就在这里，里面用${}来存变量。
                2.向服务器请求数据
        3.添加面包屑，用来识别trademark
            因为searchparam中的trademark是拼接的字符串，所以要用split方法分割，分割的参数是‘：’
        4.添加移除trademark的方法：
            1.删除searchparam中的trademark
            2.向服务器请求数据
                这里因为query和params'都没有变，所以没必要改路由。

3.平台售卖属性。
    和2的原理与步骤是完全一样的，就是一些细节不同。
        1.比如说props属性是个数组，所以要push进行
        2.push的时候要进行查重操作，indexof==-1来判断，注意这个是数组的方法
        3.因为props是数组，所以面包屑不能用v-if，要用v-for
        4.删除面包屑的时候，使用splice方法，是数组的方法，第一个参数是位置，第二个参数是删除的数量。

4.升序与降序。
    1.学会使用iconfont，很简单，在public的index.html中link（一直找不到link应该的位置），引入网站给出的地址。
    2.添加使用:class={:}来对active进行判断，当然判断写成方法放在method里面有利于调用
    3.添加click方法，来增加点击时的效果，这个方法分两种考虑，点的是active，点的不是active
    4.添加上下箭头，:class='函数'来控制。


5.分页器。
    思考：为什么要使用分页
        用户加载很慢
        前端三个重要的部分，轮播图，分页器，日历。
        分页的复用性很强，所以要摘出来，放在全局components，在入口注册。
        Pagination