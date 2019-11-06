import request from 'js/axios'

export default {
  /**
  * @description 根据code码获取openid等信息
  * @param {String} code 微信跳转回来携带的code码  
  */
  getOpenid: ({ code }, args) => request({
    url: '/wechat/getOpenIdByCode',
    gateWay: 'local',
    data: { code },
    showLoading: false,
    showError: false,
    ...args
  }),

  /**
  * @description 获取直播列表
  * @param {String} pageNo 第几页
  * @param {String} pageSize 一页几条
  */
  getList: ({ pageNo, pageSize }, args) => request({
    url: '/createLive/wjjGmOpenToken/queryLiveList',
    data: { pageNo, pageSize },
    showLoading: false,
    showError: false,
    ...args
  }),
}
