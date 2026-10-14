import { createRouter, createWebHistory } from 'vue-router'
import BookCatalogView from '../views/BookCatalogView.vue'
import MembershipView from '../views/MembershipView.vue'
import LoanManagerView from '../views/LoanManagerView.vue'

const routes = [
  {
    path: '/',
    name: 'Catalog',
    component: BookCatalogView
  },
  {
    path: '/members',
    name: 'Members',
    component: MembershipView
  },
  {
    path: '/loans',
    name: 'Loans',
    component: LoanManagerView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
