export default {
  // 用户模块请求
  user: {
    login: '/manager/account/accountCustomerInfo/login',
    sendSms: '/manager/message/msgSmsRecord/sendSms',
    checkSms: '/manager/message/msgSmsRecord/checkSms',
  },
  upload: {
    imageLoadList: '/imageLoadList', // 批量上传七牛
    burstImageLoad: '/burstImageLoad', // 获取传七牛token
    getBurstImageLoad: '/getBurstImageLoad' // name拼接七牛域名
  }
}
