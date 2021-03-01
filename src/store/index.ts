import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        active: false,
        tomatoes: 0,
        nextAlarmTime: <number | undefined>undefined,
        lastTime: <number | undefined>undefined,
        state: <State | undefined>undefined
    },
    getters: {
        nextAlarmTime: state => {
            return state.nextAlarmTime;
        },
        lastTime: state => {
            return state.lastTime;
        },
        isActive: state => {
            return state.active;
        },
        tomatoesCount: state => {
            return state.tomatoes;
        },
        state: state => {
            return state.state;
        }
    },
    mutations: {
        startTimer(state, payload: { nextAlarmTime: number, state?: State }) {
            state.lastTime = undefined;
            state.nextAlarmTime = payload.nextAlarmTime;
            state.active = true;
            state.state = payload.state;
        },
        stopTimer(state) {
            state.lastTime = new Date().getTime();
            state.active = false;
            state.state = undefined;
        },
        resetTimer(state) {
            state.lastTime = undefined;
            state.nextAlarmTime = undefined;
            state.active = false;
            state.state = undefined;
        },
        incrementTomatoes(state) {
            state.tomatoes++;
        },
        resetTomatoes(state) {
            state.tomatoes = 0;
        }
    },
    actions: {},
    modules: {}
})

export enum State {
    WORK = "WORK",
    BREAK = "BREAK"
}
