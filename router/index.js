import Business from './business'

const router = {
  middleware:'headers',
  scrollBehavior: ()  => {
    return { x: 0, y: 0 }
  },
  extendRoutes (routes, resolve) {
      routes.push(
      ...Business(resolve)
      )
  }
}

export default router
