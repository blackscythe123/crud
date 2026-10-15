<script setup>
import { ref, reactive } from 'vue'
import api from './services/api'
import ToastNotification from './components/ToastNotification.vue'

const departments = ref([
  { id: 1, name: 'Engineering', location: 'Floor 3' },
  { id: 2, name: 'Marketing', location: 'Floor 2' }
])

const newDept = reactive({
  name: '',
  location: ''
})

async function fetchDepartments() {
  try {
    const res = await api.get('/departments')
    departments.value = res.data
  } catch (err) {
  }
}

async function addDepartment() {
  if (!newDept.name) return
  try {
    const res = await api.post('/departments', {
      name: newDept.name,
      location: newDept.location
    })
    departments.value.push(res.data || { id: Date.now(), name: newDept.name, location: newDept.location })
    newDept.name = ''
    newDept.location = ''
  } catch (err) {
  }
}

async function triggerError() {
  try {
    await api.get('/departments/invalid-id')
  } catch (err) {
  }
}
</script>

<template>
  <div class="container">
    <ToastNotification />
    <h1>Department Management</h1>

    <div class="actions">
      <button @click="fetchDepartments">Fetch Departments (GET)</button>
      <button class="btn-error" @click="triggerError">Trigger 404 Error (GET)</button>
    </div>

    <form class="form" @submit.prevent="addDepartment">
      <input v-model="newDept.name" placeholder="Department Name" required />
      <input v-model="newDept.location" placeholder="Location" required />
      <button type="submit">Add Department (POST)</button>
    </form>

    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dept in departments" :key="dept.id">
          <td>{{ dept.id }}</td>
          <td>{{ dept.name }}</td>
          <td>{{ dept.location }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: sans-serif;
  background-color: #f7f9fa;
  color: #333;
}

.container {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
}

h1 {
  margin-top: 0;
  font-size: 22px;
}

.actions {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 8px 14px;
  border: 1px solid #1976d2;
  background-color: #1976d2;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #1565c0;
}

button.btn-error {
  border-color: #d32f2f;
  background-color: #d32f2f;
}

button.btn-error:hover {
  background-color: #b71c1c;
}

.form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex: 1;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

.table th {
  background-color: #f0f0f0;
}
</style>
