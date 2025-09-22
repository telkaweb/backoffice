"use strict";

import Vue from 'vue';
import axios from "axios";
import store from "../store";
import VueCookies from "vue-cookies";

Vue.use(VueCookies)

let token = Vue.$cookies.get('token')

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
  baseURL: process.env.VUE_APP_BASE_URL,
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  // baseURL: process.env.baseURL || process.env.apiUrl || process.env.VUE_APP_BASE_URL,
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true,
  headers: {Authorization: token}
};

let configMain = {
  baseURL:process.env.VUE_APP_BASE_URL_DEFAULT,
  // baseURL: process.env.baseURL || process.env.apiUrl || ""
  // timeout: 60 * 1000, // Timeout
  // withCredentials: true, // Check cross-site Access-Control
  // headers: {Authorization: token}
};

const _axios = axios.create(config);
const _axiosMain = axios.create(configMain);

_axios.interceptors.request.use(
    function (config) {
      store.commit("setLoading", true)
      // Do something before request is sent
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
);

// Add a response interceptor
_axios.interceptors.response.use(
    function (response) {
      store.commit("setLoading", false)
      // Do something with response data
      return response;
    },
    function (error) {
      store.commit("setLoading", false)
      // Do something with response error
      return Promise.reject(error);
    }
);

Plugin.install = function (Vue) {
  Vue.axios = _axios;
  Vue.mainAxios = _axiosMain;
  window.axios = _axios;
  window.mainAxios = _axiosMain;

  Object.defineProperties(Vue.prototype, {
    axios: {
      get() {
        return _axios;
      }
    },
    $axios: {
      get() {
        return _axios;
      }
    },
  });
};

Vue.use(Plugin)

export default Plugin;
