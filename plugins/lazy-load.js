import Vue from 'vue'
import VueLazyLoad from 'vue-lazyload'

Vue.use(VueLazyLoad, {
  loading: require('~/assets/imgs/imgError.png'),
  error: require('~/assets/imgs/imgError.png')
})
