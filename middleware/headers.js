import utils from '../assets/js/utils'
import gmEvent from '../assets/js/event'
export default function ({ req, res, store, route, redirect }) {
  let token = ''

  if (process.client) {
    token = utils.getCookie('token')
  } else {
    gmEvent.on('401', () => { redirect('/index?code=301') })
    token = utils.getCookie('token', req.headers)
  }
  store.commit('setData', { token, tabBarState: route.meta[0].active })
}