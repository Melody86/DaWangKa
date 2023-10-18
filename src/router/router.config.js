/**
 * 两个路由页
 */
export const constantRouterMap = [
  {
    path: '/index',
    name: '20231017',
    component: () => import('@/views/20231017/index'),
    meta: { title: '创源', keepAlive: false }
  },
  {
    path: '/',
    name: '20231017',
    component: () => import('@/views/20231017/startPage'),
    meta: { title: '创源', keepAlive: false }
  },
  {
    path: '/success',
    name: 'success',
    component: () => import('@/views/20231017/success'),
    meta: { title: '成功页', keepAlive: false }
  }
]
