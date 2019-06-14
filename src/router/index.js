import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/firstpage',
  //   children: [{
  //     path: 'firstpage',
  //     name: 'Firstpage',
  //     component: () => import('@/views/firstpage/index'),
  //     meta: { title: '首页', icon: 'dashboard' }
  //   }]
  // },
  // {
  //   path: '/',
  //   component: Layout,
  //   redirect: '/tiketmanage',
  //   children: [{
  //     path: 'tiketmanage',
  //     name: 'Tiketmanage',
  //     component: () => import('@/views/tiketmanage/index'),
  //     meta: { title: '票务管理', icon: 'dashboard' }
  //   }]
  // },
  // {
  //   path: '/',
  //   component: Layout,
  //   name: 'HomePage',
  //   children: [{
  //     path: 'homepage',
  //     name: 'HomePage',
  //     component: () => import('@/views/homepage/index'),
  //     meta: { title: '个人主页', icon: 'user' }
  //   }]
  // },
  //
  // {
  //   path: '/',
  //   component: Layout,
  //   name: 'Ticketbuy',
  //   children: [{
  //     path: 'ticketbuy',
  //     name: 'Ticketbuy',
  //     component: () => import('@/views/ticketbuy/index'),
  //     meta: { title: '开始购票', icon: 'table' }
  //   }]
  // },
  // {
  //   path: '/',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'form',
  //       name: 'Form',
  //       component: () => import('@/views/form/index'),
  //       meta: { title: '查看订单', icon: 'form' }
  //     }
  //   ]
  // },
  // { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher
}

export default router
