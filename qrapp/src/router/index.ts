import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue')
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/home'
      },
      {
        path: 'Home',
        component: () => import('@/views/home.vue')
      },
      {
        path: 'purchasedVoucherDetail/:id',
        component: () => import('@/views/purchasedVoucherDisplay.vue')
      },
      {
        path: 'redeemedVoucherDetail/:id',
        component: () => import('@/views/redeemedVoucherDisplay.vue')
      },
      {
        path: 'testBuy',
        component: () => import('@/views/TestBuy.vue')
      },
      {
        path: 'cart',
        component: () => import('@/views/Cart.vue')
      },
      {
        path: 'merchantVoucherDetail/:id',
        component: () => import('@/views/merchantVoucherDisplay.vue')
      },
      {
        path: 'wallet',
        component: () => import('@/views/wallet.vue')
      },
      {
        path: 'profile',
        component: () => import('@/views/profile.vue')
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
