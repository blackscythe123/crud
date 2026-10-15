<template>
  <div class="overview">
    <header class="page-header">
      <h1>Company Overview</h1>
      <p>Welcome to the central company dashboard.</p>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Departments</h3>
        <p class="stat-value">{{ departmentCount }}</p>
        <router-link to="/company/departments" class="stat-link">View Departments &rarr;</router-link>
      </div>

      <div class="stat-card">
        <h3>Total Employees</h3>
        <p class="stat-value">{{ employeeCount }}</p>
        <router-link to="/company/employees" class="stat-link">View Employees &rarr;</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const departmentCount = ref(0)
const employeeCount = ref(0)

const fetchStats = async () => {
  try {
    const deptRes = await api.get('/departments')
    departmentCount.value = Array.isArray(deptRes.data) ? deptRes.data.length : 0
  } catch (err) {
    departmentCount.value = 0
  }

  try {
    const empRes = await api.get('/employees')
    employeeCount.value = Array.isArray(empRes.data) ? empRes.data.length : 0
  } catch (err) {
    employeeCount.value = 0
  }
}

onMounted(() => {
  fetchStats()
})
</script>

<style scoped>
.overview {
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.stat-card {
  background-color: #ffffff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.stat-card h3 {
  font-size: 1rem;
  color: #475569;
  font-weight: 500;
}

.stat-value {
  font-size: 2.25rem;
  font-weight: 700;
  color: #2563eb;
}

.stat-link {
  color: #2563eb;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
}

.stat-link:hover {
  text-decoration: underline;
}
</style>
