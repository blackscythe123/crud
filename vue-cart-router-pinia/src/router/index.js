import { createRouter, createWebHistory } from 'vue-router'
import ProductCatalogView from '../views/ProductCatalogView.vue'
import CartView from '../views/CartView.vue'
import CheckoutView from '../views/CheckoutView.vue'

const routes = [
  { path: '/', name: 'Catalog', component: ProductCatalogView },
  { path: '/cart', name: 'Cart', component: CartView },
  { path: '/checkout', name: 'Checkout', component: CheckoutView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
