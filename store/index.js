import { getCookie } from 'js/utils'
export const state = () => ({
  openid: '',
  unionid: '',
  token: '',
})

export const getters = {

}

export const mutations = {
  setData(state, data) {
    Object.entries(data).map(([key, value]) => {
      state[key] = value
    })
  }
}

export const actions = {
  nuxtServerInit({ commit }, { req }) {
    const openid = getCookie('openid', req.headers) || ''
    commit('setData', {
      openid,
    })
  }
}