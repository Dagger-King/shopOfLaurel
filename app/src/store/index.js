import Vue from "vue"
import Vuex from "vuex"
import home from "./Home"
import search from "./Search"
import detail from "./Detail"
import shopcart from "./ShopCart"
import user from "./User"

Vue.use(Vuex);

const state = {};
const mutations = {};
const actions = {};
const getters = {};

export default new Vuex.Store({
    modules:{
        home,
        search,
        detail,
        shopcart,
        user
    }
    // state,
    // mutations,
    // actions,
    // getters
})