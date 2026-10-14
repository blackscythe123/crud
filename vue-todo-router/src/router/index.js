import { createRouter, createWebHistory } from 'vue-router'
import TodoListView from '../views/TodoListView.vue'
import AddTodoView from '../views/AddTodoView.vue'
import TodoDetailView from '../views/TodoDetailView.vue'

const routes = [
  { path: '/', name: 'TodoList', component: TodoListView },
  { path: '/add', name: 'AddTodo', component: AddTodoView },
  { path: '/todo/:id', name: 'TodoDetail', component: TodoDetailView, props: true }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
