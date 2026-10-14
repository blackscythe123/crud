import { createRouter, createWebHistory } from 'vue-router';
import ItemsLayout from '../views/ItemsLayout.vue';
import ListView from '../views/ListView.vue';
import AddView from '../views/AddView.vue';
import ItemDetailView from '../views/ItemDetailView.vue';

const routes = [
  { path: '/', redirect: '/items' },
  {
    path: '/items',
    component: ItemsLayout,
    children: [
      { path: '', component: ListView },
      { path: 'add', component: AddView },
      { path: ':id', component: ItemDetailView }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
