import axios from 'axios'
import store from '@/store'
import Vue from 'vue'
const request = axios.create({
  // baseURL1: 'http://toutiao.itheima.net',
  // baseURL2: 'http://42.192.3.136:3000/api/v1'
  baseURL: ''
})

request.interceptors.request.use(function(config) {
  // Do something before request is sent
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  if (config.url.search('sendMsg') !== -1) {
    config.url = Vue.prototype.baseUrl + '/sendMsg'
  }
  return config
}, function(error) {
  // Do something with request error
  return Promise.reject(error)
})

export default request
