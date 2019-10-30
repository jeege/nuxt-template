import axios from 'axios'
import http from './http'
import { setCookie, getCookie } from './utils'
import env from './env'
import Toast from '~/plugins/toast'

/**
* @description 设置axios请求超时时间
*/
const service = axios.create({
  timeout: 15000
})

/**
* @description 响应拦截器，获取token，保存至cookie
*/
service.interceptors.response.use(
  response => {
    if (response.headers.token) setCookie('token', response.headers.token)
    return response
  },
  error => {
    return Promise.reject(error)
  }
)

class Axios {
  constructor(props) {
    this.https = props
    this.headers = {}
  }

  /**
  * @description 请求封装
  * @param {String} url 请求的接口地址  
  * @param {String} method 请求方法默认post
  * @param {String} gateWay 请求转发前缀
  * @param {Object} data 请求的数据
  * @param {Boolean} showLoading 是否显示请求loading
  * @param {Boolean} showError 是否弹出请求错误信息
  * @param {Boolean} handle 是否返回处理后的数据
  * @param {Object} cookieFrom 获取cookie的对象，默认document
  */
  request({ url, method = 'post', gateWay = 'api', data, showLoading = true, showError = true, handle = true, cookieFrom = document }) {
    const isClient = process.client
    // 请求地址
    const requestUrl = (() => {
      if (gateWay === 'local') return env.baseUrl
      if (isClient) return gateWay
      return env[`${gateWay}Url`]
    })() + url

    //设置请求头token
    const token = getCookie('token', cookieFrom)
    token && this.setToken(token)

    //开启菊花图
    isClient && showLoading && Toast.loading('Loading...')


    return new Promise((resolve, reject) => {
      service({
        url: requestUrl,
        method,
        data,
        headers: {
          ...this.headers
        }
      }).then(res => {
        // 关闭菊花图
        isClient && showLoading && Toast.close_loading()
        if (!handle) {
          // 不处理数据
          resolve(res.data)
        } else if (res.data.code === '1000') {
          // code码1000返回具体数据
          resolve(res.data.data)
        } else {
          // 弹出错误提示
          isClient && showError && Toast.error(res.data.message)
          reject(res.data.message)
        }
      }).catch(err => {
        // 关闭菊花图
        isClient && showLoading && Toast.close_loading()
        if (err.response) {
          // 弹出错误提示
          isClient && showError && Toast.error(err.response.data.message)
          reject(err.response.data)
        } else {
          reject(err.message)
        }
      })
    })
  }

  setToken(token) {
    this.headers.token = token
  }

  sendLog(logPath, params) {
    axios.post(logPath, params).catch(err => {
      console.log(err)
    })
  }
  // 更新已过期token
  updateToken() {
    window.location.href = "/index?code=301"
  }
}

const https = new Axios(http)
const request = https.request.bind(https)

export default request 
