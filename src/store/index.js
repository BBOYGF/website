import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    routes: []
  },
  // 同步执行方法
  mutations: {
    initRouter (state, data) {
      state.routes = data
    }
  },
  // 异步方法
  actions: {}
})
