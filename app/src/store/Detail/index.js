import { reqDetail,reqAddOrUpdateShopCart } from '@/api'
import {getUUID} from '@/utils/uuid_token'

const state = {
    detailInfo:{},
    uuid_token:getUUID()
};
const mutations = {
    DETAILINFO(state,detailInfo){
        state.detailInfo = detailInfo
    }
};
const actions = {
    async detailInfo({ commit },skuId='') {
        let result = await reqDetail(skuId)
        // console.log(result)
        if (result.code == 200) {
            // console.log(result)
            commit('DETAILINFO', result.data)
        }
    },
    async addOrUpdateShopCart({commit},{skuId,skuNum}){
        let result = await reqAddOrUpdateShopCart(skuId,skuNum);
        // console.log(`api/cart/addToCart/{ skuId }/{ skuNum }`)
        console.log(result)
        if (result.code==200){
            return 'OK'
        }else{
            return Promise.reject(new Error('fail'))
        }
    }
};
const getters = {
    categoryView(state){
        return state.detailInfo.categoryView||{}
    },
    skuInfo(state){
        return state.detailInfo.skuInfo||{}
    },
    skuSaleAttrValueList(state){
        return state.detailInfo.skuInfo.skuSaleAttrValueList||[]       
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}