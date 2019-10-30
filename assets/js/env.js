import pkg from '../../package'
let appid = 'wxa7c464f4beddd1db'

const EnvType = {
  dev: '.dev.nhf.cn',
  test: '.test.nhf.cn',
  uat: '.uat.nhf.cn',
  production: '-prod.nhf.cn',
}[process.env.NODE_ENV]

const baseUrl = process.env.MODE === 'local' ?
  `http://127.0.0.1:${pkg.config.nuxt.port}` : {
    dev: 'https://goddess-dev.nhf.cn',
    test: 'https://goddess-test.nhf.cn',
    uat: 'https://goddess-uat.nhf.cn',
    production: 'https://goddess-careers.guominhealth.com',
  }[process.env.NODE_ENV]


if (process.env.NODE_ENV === 'production') {
  appid = ''
}
const env = {
  appid,
  baseUrl,
  apiUrl: `https://api${EnvType}/wjj-web-manager`,
  createUrl: `https://api${EnvType}/wjj-web-manager-create`,
  wsUrl: `https://api${EnvType}/wjj-web-manager-ws`,
  h5PublicUrl: 'https://public' + EnvType,
  // 概念性的, 解释性的, 专业的名词, 统一在gm下面管理, 方便调整
  gm: {},
}

export default env
