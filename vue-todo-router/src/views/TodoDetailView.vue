<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { todoState } from '../data/todoState'

const route = useRoute()
const router = useRouter()

const todo = computed(() => {
  return todoState.getTodoById(route.params.id)
})

function handleDelete() {
  if (todo.value) {
    todoState.deleteTodo(todo.value.id)
    router.push('/')
  }
}
</script>

<template>
  <div v-if="todo" class="detail-card">
    <h2>Task Details</h2>
    <p><strong>ID:</strong> {{ todo.id }}</p>
    <p><strong>Title:</strong> {{ todo.title }}</p>
    <p><strong>Description:</strong> {{ todo.description || 'No description provided' }}</p>
    <p><strong>Status:</strong> {{ todo.done ? 'Completed ✅' : 'Pending ⏳' }}</p>

    <div class="actions">
      <button type="button" class="btn btn-toggle" @click="todoState.toggleTodo(todo.id)">
        Mark as {{ todo.done ? 'Pending' : 'Completed' }}
      </button>
      <button type="button" class="btn btn-delete" @click="handleDelete">Delete</button>
      <router-link to="/" class="btn btn-back">Back to List</router-link>
    </div>
  </div>
  <div v-else class="not-found">
    <p>Task not found.</p>
    <router-link to="/">Return to List</router-link>
  </div>
</template>

<style scoped>
.detail-card {
  max-width: 450px;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 20px;
  background-color: #fafafa;
}

.actions {
  display: flex;
  gap: 10px;
  margin-top: 20px;
  flex-wrap: wrap;
}

.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
}

.btn-toggle {
  background-color: #2980b9;
  color: white;
}

.btn-delete {
  background-color: #e74c3c;
  color: white;
}

.btn-back {
  background-color: #7f8c8d;
  color: white;
  display: inline-flex;
  align-items: center;
}

.not-found {
  padding: 20px;
  text-align: center;
}
</style>
