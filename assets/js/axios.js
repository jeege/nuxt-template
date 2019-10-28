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
    console.error(error.Error) // for debug
    return Promise.reject(error)
  }
)
// 1: 如果不用cookie中的accountNo,要单独写在config里面
// 2: type请求方式
// 3: 是否需要加载中的tost
// 4: 是否需要结束的tost
// 5: 是否完全抹杀accountNo参数
class Axios {
  constructor(props) {
    this.http = props
    this.config = {}
  }

  request(model, url, options = {}, configs = {}) {
    // 3: 重置默认配置项, 以确保每次都不重复
    let accountNo, token, host, logPath
    this.config = {
      type: 'post',
      showEnd: true,
      showStart: true,
      useAccountNo: true,
      isClient: process.client  //是否是客户端
    }

    if (process.server) {
      accountNo = options.rootState.accountNo || ''
      token = options.rootState.token
    }

    this.config = Object.assign(this.config, configs)
    let { type, headers, isClient } = this.config
    delete options.rootState

    if (isClient) {
      //客户端请求
      host = 'api'
      accountNo = configs.accountNo || getCookie('accountNo') || ''
      token = getCookie('token')
      logPath = '/log'
      this.startTost()
    } else {
      //服务端请求
      host = env.EnvType
      logPath = env.baseUrl + '/log'
    }

    this.getToken(token)

    // 5: 如果用户在配置项内传入了相关配置, 则会顶掉Cookie里面获取的accountNo;
    if (typeof options == 'object') {
      if (!options.accountNo && accountNo) options.accountNo = accountNo
      if (!this.config.useAccountNo) delete options.accountNo
    }
    let start = Date.now()
    // 6: 拿到token, 弹出加载提示框
    return new Promise((resolve, reject) => {
      // 7: 拼接请求配置, 生成请求地址, 参数, 与方式.
      service[type](host + this.http[model][url], options, {
        headers: headers || {}
      })
        .then(data => {

          //发送请求成功日志
          this.sendLog(logPath, {
            type: '成功请求',
            url: host + this.http[model][url],
            params: options,
            method: this.config.type,
            code: data.data.code,
            time: (Date.now() - start) + 'ms',
          })

          // 8: token过期则调用更新token方法
          if (data.data.code == 500) {
            reject(data.data)
          } else {
            resolve(data.data)
          }
          // 9: 擦屁股
          isClient && Toast.close_loading()
        })
        .catch(err => {
          isClient && Toast.close_loading()

          //发送请求错误日志
          this.sendLog(logPath, {
            type: '失败请求',
            url: host + this.http[model][url],
            params: options,
            method: this.config.type,
            code: err.response && err.response.status || 500,
            error: err.message,
            time: (Date.now() - start) + 'ms',
          })
          if (err.response && err.response.status == 401) {
            if (isClient) {
              this.updateToken()
            } else {
              resolve(err.response.status)
            }
          } else {
            isClient && this.endTost('出错了')
            resolve({ message: '出错了' })
          }
        })
    })
  }
  startTost(msg = 'Loading...') {
    try {
      if (this.config.showStart) {
        Toast.loading(msg)
      }
    } catch (error) { }
  }
  // 有msg就弹出msg
  endTost(msg = '错误') {
    try {
      if (this.config.showEnd) {
        Toast.close_loading()
        Toast.error(msg)
      }
    } catch (error) { }
  }
  getToken(token) {
    service.interceptors.request.use(
      config => {
        if (token)
          config.headers.token = token
        return config
      },
      error => {
        return Promise.reject(error)
      }
    )
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

let https = new Axios(http)
https = https.request.bind(https)

export default https
