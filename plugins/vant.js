import Vue from 'vue' // $hub用于事件的中转
import Vant from 'vant'
Vue.prototype.$hub = new Vue()
Vue.use(Vant)