// 商城相关页面路由列表
const Business = function (resolve) {
  // 1: dir.   地址
  // 2: name.  路由名称
  // 3: title. 文档标题
  const r = (dir, name, title, active = -1) => {
    return {
      name,
      path: `/${name}`,
      alias: `${name === 'index' ? '/' : ''}`,
      component: resolve(__dirname, `../pages/${dir}.vue`),
      meta: {
        title,
        active
      }
    }
  }
  return [
    r('Login/index', 'index', '登录'),
    r('Upload/upload', 'upload', '上传', 0),
    r('Share/share', 'share', '分享', 1),
    r('Sign/signUp', 'sign', '报名', 2),
    r('User/user', 'user', '个人中心', 3),
  ]
}
export default Business
