import { createRouter, createWebHistory } from 'vue-router'
import DepartmentPage from '../views/DepartmentPage.vue'
import EmployeePage from '../views/EmployeePage.vue'

const routes = [
  {
    path: '/',
    name: 'Departments',
    component: DepartmentPage
  },
  {
    path: '/employees',
    name: 'Employees',
    component: EmployeePage
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
