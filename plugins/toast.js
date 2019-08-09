/*
* @Author: xiaoxin 
* @Date: 2019-06-01
* @Name: toast组件  
 * @Last Modified by: linzhijie
 * @Last Modified time: 2019-08-08 10:27:50
* @eg:
*   this.$gmt.warn('提示')
*   this.$gmt.success('提示')
*   this.$gmt.error('提示')
*   this.$gmt.loading('提示')
*   setTimeout(()=>{
*     this.$gmt.close_loading()
*   },2000)
*   this.$gmt.Toast({msg:'提示',icon:5,time:4000})
*/
import Vue from 'vue'
import { Toast } from '~/components/Public'
const promiseToast = (type, params) => {
  const VueToast = Vue.extend(Toast)
  let toast = null
  return new Promise(resolve => {
    if (!toast && type != 'close_loading') {
      toast = new VueToast()
      toast.$mount()  // 手动挂载
      document.querySelector('body').appendChild(toast.$el)
    }
    switch (type) {
      /**
       * @desc 自定义toast
       * @param params.msg 消息文案
       * @param params.icon 消息图标
       * @param params.time 消息时长
       */
      case 'Toast':
        toast.show(params.msg, params.icon, params.time)
        break
      /**
       * @desc 加载中toast 消息时长默认30s
       * @param params.msg 消息文案
       */
      case 'loading':
        params = params || '加载中...'
        toast.show(params, 1, 30000)
        break
      /**
       * @desc 关闭toast
       */
      case 'close_loading':
        const resWrap = document.getElementsByClassName('wrap')
        if (resWrap && resWrap.length > 0) {
          for (let element = 0; element < resWrap.length; element++) {
            if (resWrap[element].getAttribute('icon') == '1') {
              resWrap[element].remove()
              return
            }
          }
        }
        break
      /**
       * @desc 成功toast
       * @param params.msg 消息文案
       */
      case 'success':
        toast.show(params, 2)
        break
      /**
       * @desc 警告toast
       * @param params.msg 消息文案
       */
      case 'warn':
        toast.show(params, 3)
        break
      /**
       * @desc 错误toast
       * @param params.msg 消息文案
       */
      case 'error':
        toast.show(params, 6)
        break
    }
    setTimeout(() => {
      resolve()
    }, (params && params.time) ? params.time : 1500)
  })
}
// export default {
//   install (Vue, options = {}) {
const $gmtoast = {
  // 自定义
  Toast: (params) => {
    return new Promise(resolve => {
      promiseToast('Toast', params).then(() => {
        resolve()
      })
    })
  },
  // 加载中
  loading: (params) => {
    return new Promise(resolve => {
      promiseToast('loading', params).then(() => {
        resolve()
      })
    })
  },
  close_loading: () => {
    promiseToast('close_loading')
  },
  // 成功
  success: (params) => {
    return new Promise(resolve => {
      promiseToast('success', params).then(() => {
        resolve()
      })
    })
  },
  // 警告
  warn: (params) => {
    return new Promise(resolve => {
      promiseToast('warn', params).then(() => {
        resolve()
      })
    })
  },
  // 错误
  error: (params) => {
    return new Promise(resolve => {
      promiseToast('error', params).then(() => {
        resolve()
      })
    })
  },
}
Vue.prototype.$gmt = $gmtoast
export default $gmtoast
//   }
// }