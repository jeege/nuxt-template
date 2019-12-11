import Vue from 'vue'
import Router from 'vue-router'
import Public from './routes/public'
import Index from './routes/index'

Vue.use(Router)

/**
* 生成路由表
* @param {Array} 
* @returns {Array<RouteConfig>} vue-reuter路由
*/

const generateRoutes = (routeList) => {
  return routeList.map(({ name, path, dir, title,...props }) => {
    return {
      name,
      path,
      ...props,
      component:  () => import(`../views/${dir}.vue`).then(m => m.default || m),
      meta: {
        title
      }
    }
  })
}

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: generateRoutes([
      ...Public,
      ...Index
    ])
  })
}
