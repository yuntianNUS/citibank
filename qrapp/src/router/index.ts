import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import Tabs from '../views/Tabs.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/tab1'
  },
  {
    path: '/tabs/',
    component: Tabs,
    children: [
      {
        path: '',
        redirect: '/tabs/tab1'
      },
      {
        path: 'tab1',
        component: () => import('@/views/Tab1.vue')
      },
      {
        path: 'tab2',
        component: () => import('@/views/Tab2.vue')
      },
      {
        path: 'tab3',
        component: () => import('@/views/Tab3.vue')
      },
      {
        path: 'testBuy',
        name: 'testBuy',
        component: () => import('@/views/testBuy.vue')
      },
      {
        path: 'CashierScan',
        name: 'CashierScan',
        component: () => import('@/views/CashierScanPage.vue')
      },
      {
        path: 'CashierRedeemSuccess/:passedVoucherId',
        name: 'CashierRedeemSuccess',
        component: () => import('@/views/CashierRedeemSuccessPage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
