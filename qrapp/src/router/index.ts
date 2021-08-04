import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/landing'
  },
  {
    path: '/landing',
    component: () => import('@/views/Landing.vue')
  },
  {
    path: '/registration',
    component: () => import('@/views/Registration.vue')
  },
  {
    path: '/signin',
    component: () => import('@/views/SignIn.vue')
  },
  {
    path: '/cashier',
    component: () => import('@/views/LandingCashier.vue')
  },
  {
    path: '/cashier/registration',
    component: () => import('@/views/RegistrationCashier.vue')
  },
  {
    path: '/cashier/signin',
    component: () => import('@/views/SignInCashier.vue')
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
        component: () => import('@/views/testBuy.vue')
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
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
