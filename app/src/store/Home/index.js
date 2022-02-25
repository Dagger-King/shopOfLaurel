import { reqCategoryList, reqBanner, reqFloor } from '@/api'

const state = {
    categoryList: [],
    banner: [],
    floorList: []
};
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList
    },
    BANNER(state, banner) {
        state.banner = banner
    },
    FLOOR(state, floorlist) {
        state.floorList = floorlist
    }
};
const actions = {
    async categoryList({ commit }) {
        let result = await reqCategoryList()
        if (result.code == 200) {
            // console.log(result)
            commit('CATEGORYLIST', result.data)
        }
    },
    async banner({ commit }) {
        let result = await reqBanner()
        // console.log(result.code)
        if (result.code == 200) {
            commit('BANNER', result.data)
        }
    },
    async floor({ commit }) {
        let result = await reqFloor()
        // console.log(result)
        if (result.code == 200) {
            commit('FLOOR', result.data)
        }
    }
};
const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}