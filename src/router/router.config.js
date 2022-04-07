/**
 * 两个路由页
 */
export const constantRouterMap = [
  {
    path: '/',
    // redirect: { name: process.env.VUE_APP_TEMP }
    component: () => import('@/views/chuangyuan_no_sel/index'),
    meta: { title: '创源不选号', keepAlive: false }
  },
  {
    path: '/chuangyuan_no_sel',
    name: 'chuangyuan_no_sel',
    component: () => import('@/views/chuangyuan_no_sel/index'),
    meta: { title: '创源不选号', keepAlive: false }
  }
]
