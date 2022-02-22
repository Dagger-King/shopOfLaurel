import Vue from "vue"
import Vuex from "vuex"
import home from "./Home"
import search from "./Search"

Vue.use(Vuex);

const state = {};
const mutations = {};
const actions = {};
const getters = {};

export default new Vuex.Store({
    modules:{
        home,
        search
    }
    // state,
    // mutations,
    // actions,
    // getters
})