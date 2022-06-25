import { reqCastList , reqDeleteCartById , reqChangeCheckedById} from "@/api";

const state = {
    shopCartInfo:[]
}
const mutations = {
    SHOPCARTINFO(state,shopCartInfo){
        state.shopCartInfo=shopCartInfo
    }
}
const actions = {
    async getCartList({ commit }) {
        let result = await reqCastList()
            // console.log('1',result)
        if(result.code==200){
            commit('SHOPCARTINFO',result.data)
        }
    },
    async deleteCartById({ commit },{skuId}) {
        let result = await reqDeleteCartById(skuId)
        // console.log('2',result)
        if(result.code==200){
            return 'OK'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async changeCheckedById({ commit }, {skuId, isChecked}){
        let result = await reqChangeCheckedById(skuId,isChecked)
        // console.log('3',result)
        if(result.code==200){
            return 'OK'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {
    shopCartInfo(state){
        return state.shopCartInfo[0].cartInfoList||[]
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}