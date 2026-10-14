<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { todoState } from '../data/todoState'

const router = useRouter()
const title = ref('')
const description = ref('')

function handleSubmit() {
  todoState.addTodo(title.value, description.value)
  router.push('/')
}
</script>

<template>
  <div>
    <h2>Add New Task</h2>
    <form @submit.prevent="handleSubmit" class="add-form">
      <div class="form-group">
        <label for="title">Task Title:</label>
        <input id="title" type="text" v-model="title" required placeholder="Enter task title" />
      </div>

      <div class="form-group">
        <label for="desc">Description:</label>
        <textarea id="desc" v-model="description" rows="3" placeholder="Enter optional details"></textarea>
      </div>

      <div class="form-actions">
        <button type="submit" class="btn btn-save">Save Task</button>
        <router-link to="/" class="btn btn-cancel">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
.add-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

input, textarea {
  padding: 8px;
  font-size: 14px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  padding: 8px 16px;
  border-radius: 4px;
  text-decoration: none;
  font-size: 14px;
  cursor: pointer;
  border: none;
}

.btn-save {
  background-color: #27ae60;
  color: white;
}

.btn-cancel {
  background-color: #95a5a6;
  color: white;
  display: inline-flex;
  align-items: center;
}
</style>
