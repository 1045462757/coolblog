import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

var state = {
    myBlogs: [],
    hotBlogs: [],
    collectBlogs: [],
    information: ""
}

var mutations = {
    addMyBlogs(state, data) {
        state.myBlogs = data
    },
    addHotBlogs(state, data) {
        state.hotBlogs = data;
    },
    addCollectBlogs(state, data) {
        state.collectBlogs = data;
    },
    addInformation(state, data) {
        state.information = data;
    }
}

const store = new Vuex.Store({
    state,
    mutations
})

export default store;