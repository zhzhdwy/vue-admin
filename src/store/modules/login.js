import {Login} from "@/api/login";
import {getUsername, removeLogin, setToken, setUsername} from "@/utils/app";

const state = {
    token: '',
    username: getUsername() || ''
}

const getters = {
}

const mutations = {
    set_Token(state, value){
        state.token = value
    },
    set_Username(state, value){
      state.username = value
    }
}

const actions = {
    login(content, requestData) {
        return new Promise((resolve, reject) => {
            Login(requestData).then((response => {
                //token存储
                let data = response.data.data
                content.commit('set_Token', data.token)
                content.commit('set_Username', data.username)
                //存储到cookie中,这个地方只存了用户名和token，后台还给的东西都能存
                setToken(data.token)
                setUsername(data.username)
                //返回给then数据
                resolve(response)
            })).catch(error => {
                reject(error)
            })
        })
    },
    exist(content){
        return new Promise((resolve) => {
            removeLogin()
            content.commit('set_Token', "")
            content.commit('set_Username', "")
            resolve()
        })
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};