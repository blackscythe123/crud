import { createRouter, createWebHistory } from 'vue-router'
import OPDRegistrationView from '../views/OPDRegistrationView.vue'
import PatientListView from '../views/PatientListView.vue'
import HospitalBillingView from '../views/HospitalBillingView.vue'

const routes = [
  { path: '/', name: 'OPDRegistration', component: OPDRegistrationView },
  { path: '/patients', name: 'PatientList', component: PatientListView },
  { path: '/billing', name: 'HospitalBilling', component: HospitalBillingView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
