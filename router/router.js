import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const generateRoutes = (routeList) => {
  return routeList.map(({ name, path, dir, title }) => {
    return {
      name,
      path,
      component:  () => import(`../views/${dir}.vue`).then(m => m.default || m),
      meta: {
        title
      }
    }
  })
}

const Public = [
  {
    dir: 'Public/WxAuth/index',
    path: '/wx-auth',
    name: 'WxAuth',
    title: '微信授权'
  }
]

export function createRouter() {
  return new Router({
    mode: 'history',
    routes: generateRoutes([
      ...Public,
    ])
  })
}
