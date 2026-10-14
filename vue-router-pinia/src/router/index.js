import { createRouter, createWebHistory } from 'vue-router'
import ItemsLayout from '../views/ItemsLayout.vue'
import ListView from '../views/ListView.vue'
import CreateView from '../views/CreateView.vue'
import DetailView from '../views/DetailView.vue'

const routes = [
  { path: '/', redirect: '/items' },
  {
    path: '/items',
    component: ItemsLayout,
    children: [
      { path: '', component: ListView },
      { path: 'add', component: CreateView },
      { path: ':id', component: DetailView }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
