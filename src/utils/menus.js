import {getRequest} from './api'

export const initMenu = (router, store) => {
  // 判断菜单是否为空
  if (store.state.routes.length > 0) {
    return
  }
  getRequest('/system/cfg/menu').then(data => {
    if (data) {
      // 格式化路由
      let fmtRouter = formatRoutes(data)
      // 添加到路由
      router.addRoutes(fmtRouter)
      // 保存到本地
      store.commit('initRouter', fmtRouter)
    }
  })
}
export const formatRoutes = (routes) => {
  let fmtRoutes = []
  routes.forEach(router => {
    let {
      path,
      component,
      name,
      iconCls,
      children
    } = router
    // 递归生成 Children
    if (children && children instanceof Array) {
      children = formatRoutes(children)
    }
    let fmRouter = {
      path: path,
      name: name,
      iconCls: iconCls,
      children: children,
      component (resolve) {
        if (component.startsWith('Home')) {
          require(['../views/' + component + '.vue'], resolve)
        } else if (component.startsWith('Emp')) {
          require(['../views/emp/' + component + '.vue'], resolve)
        } else if (component.startsWith('Sta')) {
          require(['../views/sta/' + component + '.vue'], resolve)
        } else if (component.startsWith('Sys')) {
          require(['../views/sys/' + component + '.vue'], resolve)
        }
      }
    }
    fmtRoutes.push(fmRouter)
  })
  return fmtRoutes
}
