import Vue from 'vue'
import axios from 'axios'

const errorHandler = (error, vm, info) => {
  axios.post('/log', {
    type: '代码错误',
    error: error.stack
  }).catch(err => {
    console.log(err)
  })
  //getErr(error, vm, info);
}

Vue.config.errorHandler = errorHandler;
Vue.prototype.$throw = (error,vm,info)=> errorHandler(error,vm,info);