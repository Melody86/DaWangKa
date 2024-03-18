/**
 * 两个路由页
 */
export const constantRouterMap = [
  {
    path: '/',
    name: '20240312',
    component: () => import('@/views/20240312/index'),
    meta: { title: '创源', keepAlive: false }
  },
  {
    path: '/success',
    name: 'success',
    component: () => import('@/views/20240312/success'),
    meta: { title: '成功页', keepAlive: false }
  },
  {
    path: '/newsuccess',
    name: 'newsuccess',
    component: () => import('@/views/20240312/newsuccess'),
    meta: { title: '新成功页', keepAlive: false }
  }
]
