import { createRouter, createWebHistory } from 'vue-router'
import MenuView from '../views/MenuView.vue'
import OrderCartView from '../views/OrderCartView.vue'
import OrderSuccessView from '../views/OrderSuccessView.vue'

const routes = [
  { path: '/', name: 'Menu', component: MenuView },
  { path: '/cart', name: 'OrderCart', component: OrderCartView },
  { path: '/order-success', name: 'OrderSuccess', component: OrderSuccessView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
