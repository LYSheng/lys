'use strict'
import axios from 'axios'
import store from '../store/store';
import * as types from '../store/types'
import common from './common'     //公共js
import qs from 'qs'
import router from '../router'
//let baseUrl='https://servicehcentreapi.mallsvip.com/api/'    // 'http://fwh-yfb.mallsvip.com/api/'   http://10.38.50.26:8001/api/   https://servicehcentreapi.mallsvip.com
//http://test.baic.api/api/login
let baseUrl='http://test.baic.api';
// axios 配置
// axios.defaults.timeout = 5000;
// axios.defaults.baseURL = 'https://api.github.com';

// http request 拦截器
axios.interceptors.request.use(
  config => {
    // console.log(store.state.token)
    // loading   （待定）（待定）（待定）（待定）（待定）
    if (store.state.token) {
      // config.headers.Authorization = 'Bearer '+store.state.token;
    }
    return config
  }, error => {
    return Promise.reject(error)
  });
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response
  }, error => {
    //401处理    （去掉先）
    if (error.response) {
      let Personal=JSON.parse(localStorage.getItem("Personal"));
      switch (error.response.status) {
        case 403:
          let _this=this;
          //重新获取token并且重新Header赋值
          // console.log(this.aa())
          // axios.get('http://fwh-yfb.mallsvip.com/api/Account/'+Personal.refreshToken)
          //   .then(function(response) {
          //     console.log(response.data);
          //     // this.$store.commit(types.LOGIN, response);
          //   })
          // if(res){
          //   console.log(res);
          //   this.$store.commit(types.LOGIN, res);
          // }
          //401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT);
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    return Promise.resolve(error.response)
  })

function checkStatus (response) {
  // loading
  // 如果http状态码正常，则直接返回数据
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response.data
    // 如果不需要除了data之外的数据，可以直接 return response.data
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  // 如果code异常(这里已经包括网络错误，服务器错误，后端抛出的错误)，可以弹出一个错误提示，告诉用户
  if (res.status === -404) {
    alert(res.msg)
  }
  if (res.data && (!res.data.success)) {
    // console.log(res.data.error_msg)
  }
  return res
}

export default {
  post (url, data) {
    return axios({
      method: 'post',
      baseURL: baseUrl,
      url,
      data: data,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'api-version':'1.0',
        'ServerDesc':'H5'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        if(res.success=="true"){
          return checkCode(res)
        }else{
          return checkCode(res)
        }
      }
    )
  },
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: baseUrl,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded',
        'api-version':'1.0',
        'ServerDesc':'H5',
      }
    }).then(
      (response) => {
        // console.log(response)
        return checkStatus(response)
      }
    ).then(
      (res) => {
        // console.log(res)
        return checkCode(res)
      }
    )
  },
  Newget (url, params) {
    let token=localStorage.getItem("token");
    return axios({
      method: 'get',
      baseURL: baseUrl,
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded',
        'api-version':'1.0',
        'ServerDesc':'H5',
        'X-Auth-Token':token,
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        if(res.isBizSuccess==true){
          return checkCode(res)
        }else{
          return common.Toast(res.bizErrorMsg)
        }
      }
    )
  },
  Newpost (url, data) {
    let token=localStorage.getItem("token");
    return axios({
      method: 'post',
      baseURL: baseUrl,
      url,
      data: data,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json',
        'api-version':'1.0',
        'ServerDesc':'H5',
        'X-Auth-Token':token,
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }
    ).then(
      (res) => {
        if(res.success=="true"){
          return checkCode(res)
        }else{
          return checkCode(res)
        }
      }
    )
  },
}
