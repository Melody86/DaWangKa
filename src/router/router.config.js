/**
 * 两个路由页
 */
export const constantRouterMap = [
  {
    path: '/',
    name: 'chuangyuan',
    component: () => import('@/views/chuangyuan/index'),
    meta: { title: '创源', keepAlive: false }
  }
]
