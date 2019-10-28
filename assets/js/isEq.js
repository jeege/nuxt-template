
/**
 * 小程序环境
 */
function isMiniprogram() {
  if (process.client) {
    let ua = navigator.userAgent;
    if (!/MicroMessenger/gi.test(ua)) {//说明不在微信中
      return false
    } else {
      // eslint-disable-next-line
      if (!window.wx) return false
      // eslint-disable-next-line
      window.wx.miniProgram.getEnv(function (res) {
        if (res.miniprogram) {
          return true
        } else {
          return false
        }
      })
    }
  } else {
    return false
  }
}

const isEq = (request) => {
  const UA = process.client ? navigator.userAgent : request.headers['user-agent'];
  const isAndroid = /android|adr|linux/gi.test(UA)
  const isIOS = /iphone|ipod|ipad/gi.test(UA) && !isAndroid
  const isBlackBerry = /BlackBerry/i.test(UA)
  const isWindowPhone = /IEMobile/i.test(UA)
  const isMobile = isAndroid || isIOS || isBlackBerry || isWindowPhone
  const isGmAndroid = isAndroid && /app\/android/gi.test(UA)
  const isGmIOS = isIOS && /app\/ios/gi.test(UA)

  return {
    isAndroid,
    isIOS,
    isMobile,
    isWeixin: /MicroMessenger/gi.test(UA),
    isMiniprogram: isMiniprogram(),
    isQQ: /QQ/gi.test(UA),
    isPC: !isMobile,
    isWeibo: /WeiBo/gi.test(UA),
    isGmAndroid,
    isGmIOS,
  }
}

export {
  isEq
}
