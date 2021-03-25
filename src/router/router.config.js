/**
 * 两个路由页
 */
export const constantRouterMap = [
  {
    path: '/',
    redirect: { name: 'lingka' }
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
