<template>
  <div class="dashboard-view">
    <h2>Dashboard</h2>
    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Departments</h3>
        <p class="stat-number">{{ companyStore.totalDepts }}</p>
        <router-link to="/departments" class="stat-link">Manage Departments</router-link>
      </div>
      <div class="stat-card">
        <h3>Total Employees</h3>
        <p class="stat-number">{{ companyStore.totalEmployees }}</p>
        <router-link to="/employees" class="stat-link">Manage Employees</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCompanyStore } from '../stores/companyStore'

const companyStore = useCompanyStore()

onMounted(() => {
  companyStore.fetchDepartments()
  companyStore.fetchEmployees()
})
</script>

<style scoped>
.dashboard-view h2 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
}

.stat-card {
  background: #ffffff;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 24px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.stat-card h3 {
  font-size: 16px;
  color: #555555;
  margin-bottom: 12px;
}

.stat-number {
  font-size: 40px;
  font-weight: bold;
  color: #0066cc;
  margin-bottom: 16px;
}

.stat-link {
  display: inline-block;
  color: #0066cc;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
}

.stat-link:hover {
  text-decoration: underline;
}
</style>
