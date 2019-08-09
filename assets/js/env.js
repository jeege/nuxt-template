let EnvType = `${process.env.NODE_ENV}.nhf.cn/wjj-web-manager`
let appid = 'wx9bdc98ec3cbb4a94'
let baseUrl = process.env.baseUrl

if (process.env.NODE_ENV == 'production') {
  appid = 'wx684b247cae78d00f'
  EnvType = '-prod.nahefa.com.cn/wjj-web-manager'
}

const env = {
  appid,
  EnvType: 'https://api' + EnvType,
  h5PublicUrl: 'https://public' + EnvType,
  // 概念性的, 解释性的, 专业的名词, 统一在gm下面管理, 方便调整
  gm: {},
  baseUrl
}

export default env
