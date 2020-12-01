const state = {
    isCollapse: JSON.parse(sessionStorage.getItem('isCollapse')) || false
}

const getters = {
    isCollapse: state => state.isCollapse
}

const mutations = {
    SET_isCollapse(state) {
        state.isCollapse = !state.isCollapse;
        // html5本地储存
        sessionStorage.setItem('isCollapse', JSON.stringify(state.isCollapse));
    }
}

const actions = {
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
};