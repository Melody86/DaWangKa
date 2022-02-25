/**
 * 两个路由页
 */
export const constantRouterMap = [
  {
    path: '/',
    component: () => import('@/views/chuangdao_tanchuang/index')
  },

  {
    path: '/chuangdao_tanchuang',
    name: 'chuangdao_tanchuang',
    component: () => import('@/views/chuangdao_tanchuang/index'),
    meta: { title: '创道', keepAlive: false }
  }
]
