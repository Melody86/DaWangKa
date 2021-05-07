/**
 * 两个路由页
 */
export const constantRouterMap = [
  {
    path: '/',
    redirect: { name: process.env.VUE_APP_TEMP }
  },
  {
    path: '/chuangyuan_no_sel',
    name: 'chuangyuan_no_sel',
    component: () => import('@/views/chuangyuan_no_sel/index'),
    meta: { title: '创源不选号', keepAlive: false }
  },
  {
    path: '/liandong',
    name: 'liandong',
    component: () => import('@/views/liandong/index'),
    meta: { title: '联动不选号', keepAlive: false }
  },
  {
    path: '/chuangyuan',
    name: 'chuangyuan',
    component: () => import('@/views/chuangyuan/index'),
    meta: { title: '创源', keepAlive: false }
  },
  {
    path: '/chuangdao',
    name: 'chuangdao',
    component: () => import('@/views/chuangdao/index'),
    meta: { title: '创道', keepAlive: false }
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
