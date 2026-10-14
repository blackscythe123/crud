import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue'
import CreateView from '../views/CreateView.vue'
import EditView from '../views/EditView.vue'
import DetailView from '../views/DetailView.vue'

const routes = [
  { path: '/', component: ListView },
  { path: '/add', component: CreateView },
  { path: '/edit/:id', component: EditView },
  { path: '/item/:id', component: DetailView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
