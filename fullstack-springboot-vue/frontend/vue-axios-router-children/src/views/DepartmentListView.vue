<template>
  <div class="departments-page">
    <header class="page-header">
      <h1>Departments</h1>
      <p>Manage company departments.</p>
    </header>

    <section class="card form-card">
      <h2>Add New Department</h2>
      <form @submit.prevent="createDepartment" class="form">
        <div class="form-row">
          <div class="form-group">
            <label for="dept-name">Department Name</label>
            <input
              id="dept-name"
              v-model="form.name"
              type="text"
              required
              placeholder="e.g. Finance"
            />
          </div>
          <div class="form-group">
            <label for="dept-code">Department Code</label>
            <input
              id="dept-code"
              v-model="form.code"
              type="text"
              required
              placeholder="e.g. FIN"
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Add Department</button>
      </form>
    </section>

    <section class="card table-card">
      <h2>All Departments</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="departments.length === 0">
            <td colspan="4" class="empty">No departments found.</td>
          </tr>
          <tr v-for="dept in departments" :key="dept.id">
            <td>{{ dept.id }}</td>
            <td>{{ dept.name }}</td>
            <td><code>{{ dept.code }}</code></td>
            <td>
              <button @click="deleteDepartment(dept.id)" class="btn btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '../services/api'

const departments = ref([])
const form = reactive({
  name: '',
  code: ''
})

const fetchDepartments = async () => {
  try {
    const res = await api.get('/departments')
    departments.value = Array.isArray(res.data) ? res.data : []
  } catch (err) {
    departments.value = []
  }
}

const createDepartment = async () => {
  try {
    await api.post('/departments', {
      name: form.name,
      code: form.code
    })
    form.name = ''
    form.code = ''
    await fetchDepartments()
  } catch (err) {
    alert('Failed to add department')
  }
}

const deleteDepartment = async (id) => {
  try {
    await api.delete(`/departments/${id}`)
    await fetchDepartments()
  } catch (err) {
    alert('Failed to delete department')
  }
}

onMounted(() => {
  fetchDepartments()
})
</script>

<style scoped>
.departments-page {
  max-width: 900px;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  font-size: 1.75rem;
  margin-bottom: 6px;
  color: #1e293b;
}

.page-header p {
  color: #64748b;
}

.card {
  background: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 24px;
}

.card h2 {
  font-size: 1.2rem;
  margin-bottom: 16px;
  color: #334155;
}

.form-row {
  display: flex;
  gap: 16px;
  margin-bottom: 16px;
}

.form-group {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #475569;
}

input {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
}

input:focus {
  outline: none;
  border-color: #2563eb;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.9;
}

.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
}

.btn-danger {
  background-color: #ef4444;
  color: #ffffff;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #e2e8f0;
}

.data-table th {
  background-color: #f8fafc;
  font-size: 0.875rem;
  color: #475569;
  font-weight: 600;
}

.data-table td code {
  background-color: #f1f5f9;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.85rem;
}

.empty {
  text-align: center;
  color: #94a3b8;
  padding: 24px;
}
</style>
