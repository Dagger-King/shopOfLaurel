1.查看商品详情与结算。
    查看详情  detail组件
    结算 购物车界面

    声明式导航和编程式导航，这里使用声明就i可以了，routerlink to
        需要注意的是，因为是动态的，所以需要在to前面加冒号，同时因为是模板字符串，所以要用反引号配合${}来使用，一定要记得dollar符号，大括号只有一层。

   购物车部分首先把静态文件拷贝到pages中
   去路由进行登录   
   购物车静态比例15 35 10 17 10 13  


2.临时访客
    我们需要建立临时访客，放在请求头里面，用来保存购物车的数据。
    为了实现这一目的，我们需要进行三步操作。
    1.使用uuid来创建一个用户id，并且要求是单例。
        uuid已经在nodemodules中，无需安装
        使用方法可以查看github
        创建用户的方法可以放在utils文件中，这个文件夹一般用来存放功能模块，如正则等。
        名称就叫uuid_token.js
        单例的方法就是if（！）创建，即可。
        暴露的方法使用const格式。
        记得返回数值，而不是不返回。
        查看的时候使用localstorage.getItem
        存放的时候使用localstorage.setItem(名称,内容)
    2.将用户id放在storage当中储存起来
        存放在detail的state当中
        引入的方法需要学习。
    3.将用户id放在请求头里面。
        首先要把数据从store中引入
        可以打印查看引入的数据
        再把引入的数据传到请求中。
        传入的方法要与后端商量。config.headers.userTempId

3.购物车商品与价格，勾选的动态化。
    前面请求到了数据，我们现在需要把数据应用到组件中。
    首先是store的四件套。
    1.action，如果code为200，commit
    2.mutation，传入state
    3.state，预留一个量，看是数组还是对象
    4.getteres，对数据进行简化。
    然后就是使用v-for来动态化商品与价格
    最后是用：checked来动态化勾选
        这里面使用了两种方法,写在computed种
        1.array.forEach(item=>{sum+=item})
        2.array.every    均为真返回真。

4.购物车商品数量的动态化。
    每次修改都要向数据库发送修改的数据，同时也要发出请求获取这个修改后的数据。
    1.对于加号和减号我们使用@click，对于input框我们使用@change
    2.再method中创建handler方法，该方法需要传递三个参数
        1.type，是加号，减号，还是文本框
        2.disnum，修改的数字，增加是+，减少是负数
        3.是good，也就是我们获取的产品信息，一个对象，包含了此时的数量，产品id
    3.dispatch数据，再getdata，使用try await async
    注意事项：
        1.文本框要用change而不是click，这里容易出错
        2.获取文本框的信息使用$event.target.value*1来获取数据
        3.因为不能小于1，所以再使用减法时要注意避免小于1
        4.对于改变值要考虑非法语句，使用isnan来区分
        5.try catch await async用法。

5.删除购物车产品，防止商品数量到负数，修改勾选状态。
    1.删除购物车商品
        在api中添加接口
        在vuex中添加action
        在组件中添加@click，并且创建方法
        注意：
            delete方法的话，不会返回值，或者说返回值为null，所以我们要使用try和catch人为的创建错误的返回值，Promise.reject(new Error('fail'))
            组件的方法的话，就是标准的async与await，然后try与catch，返回error.meassage
            不要忘记getdata来刷新数据。
    2.导入throttle,限流。
        方法：throttle（await fuction），时间
        注意：使用throttle以后方法的写法，主要是async有较大的改动，容易出错。
    3.修改勾选状态
        在api中添加接口
        在vuex中添加action
        在组件中添加@change，并且创建方法。
        注意，
            在change里面的event要加$
            创建变量的时候，要加let
    
        
    