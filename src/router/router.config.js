/**
 * 两个路由页
 */
export const constantRouterMap = [
  {
    path: '/',
    name: '20230811',
    component: () => import('@/views/20230811/index'),
    meta: { title: '创源', keepAlive: false }
  },
  {
    path: '/success',
    name: 'success',
    component: () => import('@/views/20230811/success'),
    meta: { title: '成功页', keepAlive: false }
  },
  {
    path: '/newsuccess_lcb',
    name: 'newsuccess_lcb',
    component: () => import('@/views/20230811/newsuccess_lcb'),
    meta: { title: '新成功页', keepAlive: false }
  }
]
