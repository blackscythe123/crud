<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const employees = ref([])
const departments = ref([])
const loading = ref(false)
const errorMessage = ref('')

async function fetchData() {
  loading.value = true
  errorMessage.value = ''
  try {
    const [empRes, deptRes] = await Promise.all([
      api.get('/employees'),
      api.get('/departments').catch(() => ({ data: [] }))
    ])
    employees.value = empRes.data
    departments.value = deptRes.data
  } catch (err) {
    errorMessage.value = err.message || 'Failed to fetch employees'
  } finally {
    loading.value = false
  }
}

function getDepartmentName(deptId) {
  if (!deptId) return 'N/A'
  const dept = departments.value.find(d => d.id === deptId)
  return dept ? `${dept.name} (${dept.code})` : deptId
}

async function handleDeleteEmployee(id) {
  if (!confirm('Are you sure you want to delete this employee?')) return
  loading.value = true
  errorMessage.value = ''
  try {
    await api.delete(`/employees/${id}`)
    await fetchData()
  } catch (err) {
    errorMessage.value = err.message || 'Failed to delete employee'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <div class="employee-view">
    <div class="view-header">
      <h2>Employees</h2>
      <router-link to="/add-employee" class="btn primary">+ Add Employee</router-link>
    </div>

    <div v-if="loading" class="state-msg">Loading...</div>
    <div v-if="errorMessage" class="state-msg error">{{ errorMessage }}</div>

    <div class="card">
      <table v-if="employees.length > 0" class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in employees" :key="emp.id">
            <td>{{ emp.id }}</td>
            <td><strong>{{ emp.name }}</strong></td>
            <td>{{ emp.email }}</td>
            <td>{{ getDepartmentName(emp.departmentId) }}</td>
            <td>${{ Number(emp.salary || 0).toLocaleString() }}</td>
            <td>
              <button
                @click="handleDeleteEmployee(emp.id)"
                class="btn danger"
                :disabled="loading"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="empty-text">No employees found.</p>
    </div>
  </div>
</template>

<style scoped>
.employee-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
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

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  text-decoration: none;
  cursor: pointer;
  font-weight: bold;
  display: inline-block;
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
  margin: 0;
}
</style>
