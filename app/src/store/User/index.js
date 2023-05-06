import { reqGetCode, reqRegist, reqUserLogin, reqUserInfo } from '@/api'
// import { reqUserInfo } from '../../api'

const state = {
    code:'',
    token:'',
    userInfo:{}
}
const mutations = {
    CODE(state,code){
        state.code=code
    },
    USERLOGIN(state,token){
        state.token=token
    },
    GETUSERINFO(state,userInfo){
        state.userInfo=userInfo
    }
}
const actions = {
    async getCode({commit},phone){
        let result = await reqGetCode(phone)
        if(result.code==200){
            // console.log(result)
            commit('CODE',result.data)
            return 'Ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async userRegister({commit},data){
        let result = await reqRegist(data)
        // console.log(result)
        if(result.code==200){
            return 'Ok'
        }else{
            return Promise.reject(new Error('fail'))
        }
    },
    async userLogin({commit},data){
        let result = await reqUserLogin(data);
        // console.log(result)
        if(result.code==200){
            commit("USERLOGIN",result.data.token)
            return 'ok'
        }
        else{
            return Promise.reject(new Error('fail'))
        }
    },
    async getUserInfo({commit}){
        let result = await reqUserInfo();
        console.log(result)
        if(result.code==200){
            commit('GETUSERINFO',result.data)
            return 'ok'
        }
        else{
            return Promise.reject(new Error('fail'))
        }
    }
}
const getters = {
    
}
export default {
    state,
    mutations,
    actions,
    getters
}