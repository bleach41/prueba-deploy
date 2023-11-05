import { createRouter, createWebHashHistory } from 'vue-router'

import ProductsListView from '../views/ProductListView.vue'
import ShoppingCartView from '../views/ShoppingCartView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'productos',
      component: ProductsListView
    },

    {
      path: '/shoppingcart',
      name: 'cart',
      component: ShoppingCartView
    }
  ]
})


export default router
