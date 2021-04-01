/**
 * 两个路由页
 */
export const constantRouterMap = [
  {
    path: '/',
    redirect: { name: process.env.VUE_APP_TEMP }
  },
  {
    path: '/chuangyuan',
    name: 'chuangyuan',
    component: () => import('@/views/chuangyuan/index'),
    meta: { title: '创源', keepAlive: false }
  },
  {
    path: '/dawang',
    name: 'dawang',
    component: () => import('@/views/dawang/index'),
    meta: { title: '联通大王卡', keepAlive: false }
  },
  {
    path: '/yidong',
    name: 'yidong',
    component: () => import('@/views/yidong/index'),
    meta: { title: '电信星卡', keepAlive: false }
  },
  {
    path: '/lingka',
    name: 'lingka',
    component: () => import('@/views/lingka/index'),
    meta: { title: '电信靓卡', keepAlive: false }
  }
]
