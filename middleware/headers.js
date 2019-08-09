import utils from '../assets/js/utils'
export default function ({ req, res, store, route, redirect }) {
  let token = ''
  if (process.client) {
    token = utils.getCookie('token')
  } else {
    token = utils.getCookie('token', req.headers)
  }
  store.commit('setData', { token })
}