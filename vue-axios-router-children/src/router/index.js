import { createRouter, createWebHistory } from 'vue-router'
import CompanyLayout from '../views/CompanyLayout.vue'
import CompanyOverview from '../views/CompanyOverview.vue'
import DepartmentListView from '../views/DepartmentListView.vue'
import EmployeeListView from '../views/EmployeeListView.vue'
import EmployeeDetailView from '../views/EmployeeDetailView.vue'

const routes = [
  {
    path: '/',
    redirect: '/company'
  },
  {
    path: '/company',
    component: CompanyLayout,
    children: [
      {
        path: '',
        component: CompanyOverview
      },
      {
        path: 'departments',
        component: DepartmentListView
      },
      {
        path: 'employees',
        component: EmployeeListView
      },
      {
        path: 'employees/:id',
        component: EmployeeDetailView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
