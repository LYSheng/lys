import Vue from 'vue';
import "babel-polyfill";
import Vuex from 'vuex';
import * as types from './types'
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {},
    token: null,
    title: '',
    count:false,
    provinceId:null,
  },
  mutations: {
    [types.LOGIN]: (state, data) => {
      localStorage.token = data;
      state.token = data;
    },
    [types.LOGOUT]: (state) => {
      localStorage.removeItem('token');
      state.token = null
    },
    [types.TITLE]: (state, data) => {
      state.title = data;
    },
    [types.PID]: (state, data) => {
      state.provinceId = data;
    }
  }
})
