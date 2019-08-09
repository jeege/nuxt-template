/* eslint-disable */
import https from '~/assets/js/axios.js'
import util from '~/assets/js/utils.js'
import env from '~/assets/js/env'

const getUrlParam = function* (name) {
  let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  let r = window.location.search.substr(1).match(reg)
  if (r != null) return yield unescape(r[2])
  return null
}

//  获取用户信息
const getMemberInfoByAccountNo = () => {
  return new Promise((resolve, reject) => {
    https(
      'user',
      'getMemberInfoByAccountNo',
      { accountNo: util.getCookie('accountNo') },
      { showEnd: false, showStart: false }
    ).then(data => {
      if (data.code == 1000) {
        resolve(data.data)
      } else {
        reject(data.message)
      }
    })
  })
}

//判断是否是微信浏览器的函数
const isWeiXin = () => {
  //window.navigator.userAgent属性包含了浏览器类型、版本、操作系统类型、浏览器引擎类型等信息，这个属性可以用来判断浏览器类型
  let ua = window.navigator.userAgent.toLowerCase();
  //通过正则表达式匹配ua中是否含有MicroMessenger字符串
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
}

// 获取jscode
const getJsCode = () => {
  const code = getUrlParam('code').next().value
  const local = window.location.href
  if (code == null || code == '') {
    window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${env.appid}&redirect_uri=${window.encodeURIComponent(local)}&response_type=code&scope=snsapi_userinfo&state=1#wechat_redirect`
  } else {
    return code
  }
}

// 上传七牛
const uploadQN = (file, qiniutoken, compress = true) => {
  return new Promise(async (reslove, reject) => {
    let config = {
      useCdnDomain: true,
      region: qiniu.region.z0
    }
    let putExtra = {
      fname: '',
      params: {},
      mimeType: null
    }
    let randNum = new Date().getTime() + parseInt(Math.random() * 1000);
    let key = randNum + file.name
    let observer = {
      next: res => { },
      error: res => {
        console.log(res)
      },
      complete: res => {
        https('upload', 'getBurstImageLoad', { filekey: res.key }).then(data => {
          if (data.code == 1000) {
            reslove(data.data)
          } else {
            reslove(`https://image.nhf.cn/${res.key}`)
          }
        }).catch(err => {
          console.log(err)
          reslove(`https://image.nhf.cn/${res.key}`)
        })
      }
    }
    let options = {
      "auto-orient": true,
      quality: 0.5
    }
    
    if (file && file.size <= 2 * 1024 * 1024) {
      delete options.quality
      // let observable = qiniu.upload(file, key, qiniutoken, putExtra, config)
      // observable.subscribe(observer)
    }
    if (compress) {
      const compressFile = await qiniu.compressImage(file, options)
      file = compressFile.dist
    }

    let observable = qiniu.upload(file, key, qiniutoken, putExtra, config)
    let subscription = observable.subscribe(observer)
  })
}

export { getMemberInfoByAccountNo, getJsCode, getUrlParam, isWeiXin, uploadQN }
