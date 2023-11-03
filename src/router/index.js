import { createRouter, createWebHistory } from 'vue-router'
import CategoryListView from '../views/CategoryListView.vue'
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
      path: '/category',
      name: 'category',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: CategoryListView
    },
    {
      path: '/soppingcart',
      name: 'cart',
      component: ShoppingCartView
    }
  ]
})

export default router
