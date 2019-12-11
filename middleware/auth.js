import env from 'js/env'
import { isEq } from 'js/utils'
export default function ({ req, route, store, redirect }) {
  const isWx = isEq(req).isWeixin
  console.log(store.state)
  if (!isWx) return
  if (route.name === 'WxAuth') return
  if (!store.state.openid) {
    //微信授权跳转页面
    const redirectTo = `${env.baseUrl}/wx-auth?from=${encodeURIComponent(route.fullPath)}`
    // 微信授权
    redirect(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${env.appid}&redirect_uri=${encodeURIComponent(redirectTo)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`)
  }
}