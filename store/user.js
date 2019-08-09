import https from '../assets/js/axios'
export const state = () => ({
  info: {}
})

export const mutations = {
  setData(state, obj) {
    Object.entries(obj).map(([key, value]) => {
      state[key] = value
    })
  }
}

export const actions = {
  initInfo() {
    https()
  }
}