<template>
  <div class="employee-detail-page">
    <div class="header-actions">
      <router-link to="/company/employees" class="btn btn-secondary">&larr; Back to Employees</router-link>
    </div>

    <div v-if="loading" class="card">
      <p>Loading employee details...</p>
    </div>

    <div v-else-if="error" class="card error-card">
      <p>{{ error }}</p>
    </div>

    <div v-else-if="employee" class="card detail-card">
      <header class="detail-header">
        <h1>{{ employee.name }}</h1>
        <span class="badge">ID: {{ employee.id }}</span>
      </header>

      <div class="detail-grid">
        <div class="detail-item">
          <span class="detail-label">Email Address</span>
          <span class="detail-value">{{ employee.email }}</span>
        </div>

        <div class="detail-item">
          <span class="detail-label">Department ID</span>
          <span class="detail-value">{{ employee.departmentId }}</span>
        </div>

        <div class="detail-item">
          <span class="detail-label">Salary</span>
          <span class="detail-value">${{ Number(employee.salary).toLocaleString() }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const employee = ref(null)
const loading = ref(true)
const error = ref('')

const fetchEmployee = async () => {
  const id = route.params.id
  loading.value = true
  error.value = ''
  try {
    const res = await api.get(`/employees/${id}`)
    employee.value = res.data
  } catch (err) {
    error.value = 'Failed to load employee details.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchEmployee()
})
</script>

<style scoped>
.employee-detail-page {
  max-width: 650px;
}

.header-actions {
  margin-bottom: 20px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.9;
}

.btn-secondary {
  background-color: #64748b;
  color: #ffffff;
}

.card {
  background: #ffffff;
  padding: 28px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.error-card {
  color: #ef4444;
}

.detail-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 16px;
  margin-bottom: 20px;
}

.detail-header h1 {
  font-size: 1.5rem;
  color: #1e293b;
}

.badge {
  background-color: #e2e8f0;
  color: #475569;
  font-size: 0.85rem;
  font-weight: 600;
  padding: 4px 10px;
  border-radius: 20px;
}

.detail-grid {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-label {
  font-size: 0.85rem;
  color: #64748b;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-value {
  font-size: 1.1rem;
  color: #0f172a;
  font-weight: 600;
}
</style>
