import { createRouter, createWebHistory } from 'vue-router'

import ProductsListView from '../views/ProductListView.vue'
import ShoppingCartView from '../views/ShoppingCartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'productos',
      component: ProductsListView
    },

    {
      path: '/soppingcart',
      name: 'cart',
      component: ShoppingCartView
    }
  ]
})

export default router
