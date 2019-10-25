// 方法都从此页输出
import {
  getStorage,
  setStorage,
  clearAllCookie,
  clearSingleStorage,
  clearAllStorage,
} from './session'
// 2: 获取cooike, 获取当前设备类型
import {
  getTime,
  getPhone,
  getCookie,
  setCookie,
} from './cookie'
// 3: 封装代理公共请求
import {
  getJsCode,
  getUrlParam,
  getMemberInfoByAccountNo,
  uploadQN
} from './requestForYou'

export {
  getTime,
  getPhone,
  getCookie,
  setCookie,
  getJsCode,
  getStorage,
  setStorage,
  getUrlParam,
  clearAllCookie,
  clearSingleStorage,
  clearAllStorage,
  getMemberInfoByAccountNo,
  uploadQN
}
