import { createRouter, createWebHistory } from 'vue-router'
import OverviewView from '../views/OverviewView.vue'
import ManageDepartmentsView from '../views/ManageDepartmentsView.vue'
import ManageEmployeesView from '../views/ManageEmployeesView.vue'

const routes = [
  {
    path: '/',
    name: 'Overview',
    component: OverviewView
  },
  {
    path: '/manage-departments',
    name: 'ManageDepartments',
    component: ManageDepartmentsView
  },
  {
    path: '/manage-employees',
    name: 'ManageEmployees',
    component: ManageEmployeesView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
