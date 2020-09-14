import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate"

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        activeRegionId: 0, // 当前区域id
        activeRegionCode:"china", // 当前区域code
        projectList: [], // 当前区域项目列表
        regionList:[], // 已接入区域列表
    },
    mutations: {
        // 更新项目列表
        changeProjectList(state, list) {
            state.projectList = list;
            // console.log('store中项目集合', state.projectList)
        },

        // 更新当前区域id
        changeRegionId(state, id) {
            state.activeRegionId = id;
            // console.log('store中regionId', state.activeRegionId)
        },

         // 更新当前区域名称
        changeRegionCode(state, code) {
            state.activeRegionCode = code;
            // console.log('store中regionCode', state.activeRegionCode)
        },

        // 更新已接入区域列表
        changeRegionList(state, list) {
            state.regionList = list;
            // console.log('store中区域集合', state.regionList)
        },
    },
    // vuex-persistedstate 插件，配置数据不丢失
    plugins: [createPersistedState({
        storage: window.sessionStorage,
        reducer(data) {
            return {
                activeRegionId: data.activeRegionId,
                activeRegionCode:data.activeRegionCode,
                projectList: data.projectList,
                regionList:data.regionList
            }
        }
    })]
})

export default store