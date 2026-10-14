import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import TransactionFormView from '../views/TransactionFormView.vue'
import StatementView from '../views/StatementView.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: DashboardView },
  { path: '/transaction', name: 'Transaction', component: TransactionFormView },
  { path: '/statement', name: 'Statement', component: StatementView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
