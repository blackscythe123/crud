import { createRouter, createWebHistory } from 'vue-router';
import ListView from '../views/ListView.vue';
import AddView from '../views/AddView.vue';
import ItemDetailView from '../views/ItemDetailView.vue';

const routes = [
  {
    path: '/',
    name: 'List',
    component: ListView
  },
  {
    path: '/add',
    name: 'Add',
    component: AddView
  },
  {
    path: '/item/:id',
    name: 'Detail',
    component: ItemDetailView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
