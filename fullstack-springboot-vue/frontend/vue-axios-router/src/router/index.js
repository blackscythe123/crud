import { createRouter, createWebHistory } from 'vue-router'
import HomeDashboardView from '../views/HomeDashboardView.vue'
import DepartmentView from '../views/DepartmentView.vue'
import EmployeeView from '../views/EmployeeView.vue'
import AddEmployeeView from '../views/AddEmployeeView.vue'

const routes = [
  { path: '/', name: 'Dashboard', component: HomeDashboardView },
  { path: '/departments', name: 'Departments', component: DepartmentView },
  { path: '/employees', name: 'Employees', component: EmployeeView },
  { path: '/add-employee', name: 'AddEmployee', component: AddEmployeeView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
