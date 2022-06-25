1.开发detail的子组件zoom
    首先把detail的数据传给zoom，父传子用props

2.轮播图复习
    1.引包，js,css
    2.结构完整
    3.new swiper一个实例
        使用watch监听数据，保证用的服务器数据回来
        为了保证结构ok使用nexttick
        nexttick里面的swiper可以使用dom节点监听，ref

3.放大镜部分
    1.我们需要对事件进行捕获，也就是对event进行一个mousemove事件handler
    2.在method中对handler进行编辑，形参是event
        定义一个mask变量，这个变量代表了遮罩。使用ref进行定位
        使用this.$refs.mask来对这个遮罩的位置进行设置。
        需要注意的是，遮罩不可以超出框架，所以要对边界进行设置。
    3.对放大镜部分进行位置设置。

4.购物车部分
    购买产品个数的操作：
            收集表单数据：v-model
            这里我们用skuNum收集(skuNum要在data里面创建)
            我们看一下能不能收集，组件detail-data-routine
        1.默认数量是1
        2.通过+和-来对个数进行改变
            @click，skuNum++
            注意的是，--要注意默认是1的问题
            使用三元运算符实现--
        3.直接对表单进行更改
            对表单绑定事件：@change
                实现changeSkuNum方法，在methods中
                event参数
                event.target.value
                表单元素只要是用户输入，需要考虑的就很多。
                    1   非数字*1
                        let value=event.target.value*1
                         一定是Nan not a number
                        通过这种方法可以直接过滤掉大量的非法字符。
                        if(isNaN(value))this.skuNum=1
                    2   小于1 的情况
                        直接等于1
                    3   合法，把小数去掉。
                        this.skuNum=parseInt(value)

    我们点购物车的时候要给服务器传输数据，商品以及个数。也就是不仅要路由跳转，还要发请求。
    接口请求地址：
        /api/cart/addToCart/{ skuId }/{ skuNum }
        写api，将产品添加到购物车中或者更新产品个数。
        export const reqAddOrUpdateShopCart=(skuId,skuNum)=>requests({url:`/cart/addToCart/{ skuId }/{ skuNum }`,method:'post'})
    去store三部曲
        将产品添加到购物车中
        async addOrUpdateShopCart({commit},{skuId,skuNum}){
            let result = await reqaddOrUpdateShopCart(skuId,skuNum);
            打印一下result，看一下是否有问题。
        }
    回到detail去绑定事件
        @click="addShopcar"
        过去的路由跳转就是a跳到b，而这里在跳转前要发请求。
        去methods写方法
            addShopcar(){
                1.发请求，把产品加入到数据库，通知服务器
                this.$store.dispatch('addOrUpdateShopCart',{skuId:this.$store.params.skuId，skuNum:this.skuNum})
                    这里要注意服务器并没有返回其他数据，只返回了code=200，所以没必要仓库存储。
                    成功与失败的结果在仓库
                    代码就是在调用仓库中的addOrUpdateShopCart
                直接用let result = 
                result就是promise
                if (result.code==200){
                    return 
                }else{
                    代表加入购物车失败
                    return Promise.reject(new Error('fail))
                }
                回到detail组件，我们对把addShopcar添加await和async
                用try catch来改写
                try {
                    await。。。
                } catch(err){
                    alert(error.message)
                }
                2.服务器存储成功，进行路由跳转
                    把加入购物车的静态组件拷过去，注册路由，一级路由
                    去detail组件进行路由跳转
                    在try中进行跳转
                    this.$router.push(name:'addcartsuccess')
                    在路由跳转的时候，还要将产品的信息带给下一级的路由组件。
                    this.$router.push({name:'addcartsuccess',query:{skuInfo:this.skuInfo}})
                    一些简单的数据skuNum，通过query形式给路由组件传递过去
                    产品信息的数据skuInfo，通过会话存储（不持久化，会话结束数据在消失
                    本地存储与会话存储，一般存储字符串
                    sessionStorage.setItem("SKUINFO",JSON.stringify(this.skuInfo))
                    向会话存储了一个对象
                    调用的话，去购物车组件中，在mounted中sessionStorage.getItem('SKUINFO')
                        skuInfo(){
                            return JSON.parse(sessionStorage.getItem('SKUINFO'))
                        }
                    注意无论是本地存储还是会话存储，一定要用字符串，别用对象。
                3.失败了给用户进行提示
            }

    表单设置的两种方法，v-model和ref