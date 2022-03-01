import { reqSearch } from "@/api";
const state = {
    searchInfo:{}
};
const mutations = {
    SEARCH(state, search) {
        state.searchInfo = search
    }
};
const actions = {
    async search({ commit }, params={}) {
        let result = await reqSearch(params)
        // console.log(result.data)
        if (result.code == 200) {
            commit('SEARCH', result.data)
        }

    }
};
const getters = {
    attrsList(state){
        return state.searchInfo.attrsList||[]
    },
    goodsList(state){
        return state.searchInfo.goodsList||[]
    },
    trademarkList(state){
        return state.searchInfo.trademarkList||[]
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}