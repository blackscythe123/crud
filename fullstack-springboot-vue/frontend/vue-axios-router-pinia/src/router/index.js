import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '../views/DashboardView.vue'
import DepartmentView from '../views/DepartmentView.vue'
import EmployeeView from '../views/EmployeeView.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: DashboardView },
  { path: '/departments', name: 'Departments', component: DepartmentView },
  { path: '/employees', name: 'Employees', component: EmployeeView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
