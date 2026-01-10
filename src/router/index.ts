import { createRouter, createWebHistory } from 'vue-router'
import { useCartStore } from '@/stores/cart'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'start',
      component: () => import('@/views/StartView.vue')
    },
    {
      path: '/scan',
      name: 'scan',
      component: () => import('@/views/ScanView.vue')
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue')
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: () => import('@/views/CheckoutView.vue'),
      beforeEnter: (to, from, next) => {
        // Route guard: redirect to /scan if cart is empty
        const cartStore = useCartStore()
        if (cartStore.totalItems === 0) {
          next('/scan')
        } else {
          next()
        }
      }
    },
  ]
})

export default router

