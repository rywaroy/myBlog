import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    ImpressionIsShow:false
};

const actions = {
    showImpression:({commit}) =>{
        commit('showImpression')
    },
    hideImpression:({commit}) =>{
        commit('hideImpression')
    },
};

const mutations = {
    showImpression:(state) => {
        state.ImpressionIsShow = true;
    },
    hideImpression:(state) => {
        state.ImpressionIsShow = false;
    }
};

const getters = {
    ImpressionIsShow(state){
        return state.ImpressionIsShow
    }
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters
});
