import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        visible: false
    },
    getters: {
        visibile(state){
            return state.visible;
        }
    },
    mutations: {
        visible(state) {
            state.visible = true;
        },
    },
    actions: {},
    modules: {}
})
