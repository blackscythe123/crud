<script setup>
import { ref, reactive, onMounted } from 'vue'
import api from '../services/api'

const departments = ref([])
const loading = ref(false)
const errorMessage = ref('')

const form = reactive({
  name: '',
  code: ''
})

async function fetchDepartments() {
  loading.value = true
  errorMessage.value = ''
  try {
    const res = await api.get('/departments')
    departments.value = res.data
  } catch (err) {
    errorMessage.value = err.message || 'Failed to fetch departments'
  } finally {
    loading.value = false
  }
}

async function handleAddDepartment() {
  if (!form.name.trim() || !form.code.trim()) return
  loading.value = true
  errorMessage.value = ''
  try {
    await api.post('/departments', {
      name: form.name.trim(),
      code: form.code.trim()
    })
    form.name = ''
    form.code = ''
    await fetchDepartments()
  } catch (err) {
    errorMessage.value = err.message || 'Failed to add department'
  } finally {
    loading.value = false
  }
}

async function handlePatchDepartment(id, currentCode) {
  const code = prompt('Enter new department code:', currentCode)
  if (!code || code === currentCode) return
  loading.value = true
  errorMessage.value = ''
  try {
    await api.patch(`/departments/${id}`, { code })
    await fetchDepartments()
  } catch (err) {
    errorMessage.value = err.message || 'Failed to patch department'
  } finally {
    loading.value = false
  }
}

async function handleDeleteDepartment(id) {
  if (!confirm('Are you sure you want to delete this department?')) return
  loading.value = true
  errorMessage.value = ''
  try {
    await api.delete(`/departments/${id}`)
    await fetchDepartments()
  } catch (err) {
    errorMessage.value = err.message || 'Failed to delete department'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDepartments()
})
</script>

<template>
  <div class="department-view">
    <h2>Departments</h2>

    <div v-if="loading" class="state-msg">Loading...</div>
    <div v-if="errorMessage" class="state-msg error">{{ errorMessage }}</div>

    <div class="card">
      <h3>Add New Department</h3>
      <form @submit.prevent="handleAddDepartment" class="dept-form">
        <div class="form-group">
          <label for="dept-name">Department Name</label>
          <input
            id="dept-name"
            v-model="form.name"
            type="text"
            placeholder="e.g. Engineering"
            required
          />
        </div>

        <div class="form-group">
          <label for="dept-code">Department Code</label>
          <input
            id="dept-code"
            v-model="form.code"
            type="text"
            placeholder="e.g. ENG"
            required
          />
        </div>

        <button type="submit" class="btn primary" :disabled="loading">Add Department</button>
      </form>
    </div>

    <div class="card">
      <h3>Department List</h3>
      <table v-if="departments.length > 0" class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dept in departments" :key="dept.id">
            <td>{{ dept.id }}</td>
            <td>{{ dept.name }}</td>
            <td><span class="badge">{{ dept.code }}</span></td>
            <td>
              <button
                @click="handlePatchDepartment(dept.id, dept.code)"
                class="btn"
                :disabled="loading"
              >
                Patch
              </button>
              &nbsp;
              <button
                @click="handleDeleteDepartment(dept.id)"
                class="btn danger"
                :disabled="loading"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="empty-text">No departments found.</p>
    </div>
  </div>
</template>

<style scoped>
.department-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h2 {
  margin: 0;
  color: #2c3e50;
}

.card {
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 18px;
}

.card h3 {
  margin: 0 0 14px 0;
  font-size: 16px;
  color: #2c3e50;
}

.dept-form {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-end;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 180px;
}

label {
  font-size: 13px;
  font-weight: bold;
  color: #555;
}

input {
  padding: 8px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

input:focus {
  outline: none;
  border-color: #3498db;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn.primary {
  background: #27ae60;
  color: #fff;
}

.btn.primary:hover:not(:disabled) {
  background: #219150;
}

.btn.danger {
  background: #e74c3c;
  color: #fff;
  padding: 5px 10px;
  font-size: 12px;
}

.btn.danger:hover:not(:disabled) {
  background: #c0392b;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.data-table th,
.data-table td {
  padding: 10px 12px;
  text-align: left;
  border-bottom: 1px solid #eee;
  font-size: 14px;
}

.data-table th {
  background: #f8f9fa;
  color: #555;
  font-weight: 600;
}

.badge {
  background: #ecf0f1;
  color: #2c3e50;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
  font-family: monospace;
}

.state-msg {
  padding: 10px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.state-msg.error {
  background-color: #fde8e8;
  color: #c0392b;
  border-color: #f5c6cb;
}

.empty-text {
  color: #7f8c8d;
  font-size: 14px;
  margin: 10px 0 0 0;
}
</style>
