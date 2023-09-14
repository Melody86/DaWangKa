/**
 * 两个路由页
 */
export const constantRouterMap = [
  {
    path: '/',
    name: '20230914',
    component: () => import('@/views/20230914/index'),
    meta: { title: '创源', keepAlive: false }
  },
  {
    path: '/success',
    name: 'success',
    component: () => import('@/views/20230914/success'),
    meta: { title: '成功页', keepAlive: false }
  }
]
