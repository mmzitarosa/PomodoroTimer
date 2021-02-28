import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const WORK_TYPE = "WORK";
export const BREAK_TYPE = "BREAK";
export const STOP_TYPE = "STOP";

const WORK_TIME: number = 25 * 1000; // 25 Minutes
const BREAK_TIME: number = 5 * 1000; // 5 Minutes
const TOMATOES: number = 4; // 4 Repetitions
// const LONG_BREAK_TIME = BREAK_TIME * TOMATOES;

export default new Vuex.Store({
    state: {
        active: false,
        tomatoes: 0,
        nextWorkTime: <number | undefined>undefined,
        calculateWorkTime: (tomatoes: number) => {
            return new Date().getTime() + WORK_TIME + (tomatoes < TOMATOES ? BREAK_TIME : 0);
        }
    },
    getters: {
        nextAlarm: state => {
            if (state.nextWorkTime) {
                let nowTime = new Date().getTime();
                let difference = state.nextWorkTime - nowTime;

                if ((state.tomatoes < TOMATOES && difference > BREAK_TIME)
                || (state.tomatoes >= TOMATOES && difference > BREAK_TIME)) {
                    return {
                        time: difference - BREAK_TIME,
                        type: WORK_TYPE
                    }
                } else {
                    return {
                        time: difference > 0 ? difference : 0,
                        type: BREAK_TYPE
                    }
                }
            } else {
                return {
                    time: WORK_TIME,
                    type: STOP_TYPE
                }
            }
        },
        isActive: state => {
            if (state.tomatoes>TOMATOES) {
                return false;
            }
            return state.active;
        }
    },
    mutations: {
        start(state) {
            if (state.nextWorkTime == undefined) {
                state.nextWorkTime = state.calculateWorkTime(state.tomatoes);
            }
            state.active = true;
        },
        stop(state) {
            state.active = false;
        },
        reset(state) {
            if (state.nextWorkTime == undefined) {
                state.tomatoes = 0;
            } else if (state.active) {
                state.nextWorkTime = state.calculateWorkTime(state.tomatoes);
            } else {
                state.nextWorkTime = undefined;
            }
        }
    },
    actions: {},
    modules: {}
})
