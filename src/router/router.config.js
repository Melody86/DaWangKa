/**
 * 两个路由页
 */
export const constantRouterMap = [
  {
    path: '/',
    name: '20230811',
    component: () => import('@/views/20230811/index'),
    meta: { title: '创源', keepAlive: false }
  }
]
