import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);
import axios from 'axios';
import Vuex from 'vuex';
Vue.use(Vuex);
Vue.prototype.axios = axios;
import ElementUi from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import echarts from 'echarts';
Vue.prototype.$echarts = echarts
Vue.use(ElementUi);

import router from './router.js';
import app from './App.vue';

const store = new Vuex.Store({
  state: {
    token: '',
    userInfo: [],
  },
  mutations: {
    setToken(state) {
      state.token = localStorage.getItem('token');
      state.userInfo = JSON.parse(localStorage.getItem('userInfo'));
    },
  },
  getters: {
    getToken(state) {
      return state.token;
    },
  }
});

router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    next();
  } else {
    if (to.matched.some(m => m.meta.auth)) {
      next();
    } else {
      ElementUi.Message('亲，您还没有登录哦O(∩_∩)O！');
      next('/login');
    }
  }
});

var vm = new Vue({
  el: '#app',
  data: {},
  render: c => c(app),
  router,
  store
});
