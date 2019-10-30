// 方法都从此页输出
import {
  getStorage,
  setStorage,
  clearSingleStorage,
  clearAllStorage,
} from './storage'

// 3: 封装代理公共请求
import {
  getJsCode,
  getUrlParam,
  getMemberInfoByAccountNo,
  uploadQN
} from './requestForYou'

// 2: 获取cooike
export {
  getCookie, 
  setCookie, 
  removeCookie, 
  hasCookie, 
  getCookieKeys
} from './cookie'

//判断设备
export { isEq } from './isEq'
//倒计时
export { getTime } from './time'
export { $event } from './event'

export {
  getJsCode,
  getStorage,
  setStorage,
  getUrlParam,
  clearSingleStorage,
  clearAllStorage,
  getMemberInfoByAccountNo,
  uploadQN
}
