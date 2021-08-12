/**
 * 两个路由页
 */
export const constantRouterMap = [
  {
    path: '/',
    redirect: { name: process.env.VUE_APP_TEMP }
  },
  // {
  //   path: '/chuangyuan_new',
  //   name: 'chuangyuan_new',
  //   component: () => import('@/views/chuangyuan_new/index'),
  //   meta: { title: '创源20210803', keepAlive: false }
  // },
  {
    path: '/lihe',
    name: 'lihe',
    component: () => import('@/views/lihe/index'),
    meta: { title: '中秋礼盒', keepAlive: false }
  }
]
