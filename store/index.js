import https from '../assets/js/axios'
export const state = () => ({
  token: '',
  accountNo: '',
  qiniutoken: '',
  tabBarState: -1
})

export const getters = {

}

export const mutations = {
  setData(state, obj) {
    Object.entries(obj).map(([key, value]) => {
      state[key] = value
    })
  }
}

export const actions = {
  //获取七牛token
  async getQiNiuToken({ commit, rootState }) {
    const data = await https('upload', 'burstImageLoad', { rootState }, {
      showEnd: false,
      showStart: false,
    })
    if (data.code == 1000) {
      commit('setData', { qiniutoken: data.data })
    }
  },
}