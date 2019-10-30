import request from 'js/axios'

export default {
  /**
  * @description 根据code码获取openid等信息
  * @param {String} code 微信跳转回来携带的code码  
  * @param {Object} args 请求配置信息  
  */
  getOpenid: ({ code }, args) => request({
    url: '/wechat/getOpenIdByCode',
    gateWay: 'local',
    data: { code },
    showLoading: false,
    showError: false,
    ...args
  })
}
