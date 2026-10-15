<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'

const departments = ref([])
const employees = ref([])
const loading = ref(false)
const errorMessage = ref('')

const totalDepartments = computed(() => departments.value.length)
const totalEmployees = computed(() => employees.value.length)

const totalPayroll = computed(() => {
  return employees.value.reduce((sum, emp) => sum + (Number(emp.salary) || 0), 0)
})

const averageSalary = computed(() => {
  if (employees.value.length === 0) return 0
  return Math.round(totalPayroll.value / employees.value.length)
})

async function fetchDashboardData() {
  loading.value = true
  errorMessage.value = ''
  try {
    const [deptRes, empRes] = await Promise.all([
      api.get('/departments'),
      api.get('/employees')
    ])
    departments.value = deptRes.data
    employees.value = empRes.data
  } catch (err) {
    errorMessage.value = err.message || 'Failed to load dashboard data'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchDashboardData()
})
</script>

<template>
  <div class="dashboard-view">
    <h2>Dashboard Overview</h2>

    <div v-if="loading" class="state-msg">Loading dashboard stats...</div>
    <div v-if="errorMessage" class="state-msg error">{{ errorMessage }}</div>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>Departments</h3>
        <p class="stat-value">{{ totalDepartments }}</p>
        <router-link to="/departments" class="stat-link">View all departments &rarr;</router-link>
      </div>

      <div class="stat-card">
        <h3>Employees</h3>
        <p class="stat-value">{{ totalEmployees }}</p>
        <router-link to="/employees" class="stat-link">View all employees &rarr;</router-link>
      </div>

      <div class="stat-card">
        <h3>Total Payroll</h3>
        <p class="stat-value">${{ totalPayroll.toLocaleString() }}</p>
        <span class="stat-sub">Monthly expenditure</span>
      </div>

      <div class="stat-card">
        <h3>Average Salary</h3>
        <p class="stat-value">${{ averageSalary.toLocaleString() }}</p>
        <span class="stat-sub">Per employee</span>
      </div>
    </div>

    <div class="dashboard-sections">
      <div class="section-card">
        <div class="section-header">
          <h3>Departments Overview</h3>
          <router-link to="/departments" class="action-btn">Manage</router-link>
        </div>
        <ul v-if="departments.length > 0" class="item-list">
          <li v-for="dept in departments" :key="dept.id" class="list-row">
            <strong>{{ dept.name }}</strong>
            <span class="badge">{{ dept.code }}</span>
          </li>
        </ul>
        <p v-else class="empty-text">No departments recorded.</p>
      </div>

      <div class="section-card">
        <div class="section-header">
          <h3>Recent Employees</h3>
          <router-link to="/add-employee" class="action-btn">+ Add New</router-link>
        </div>
        <ul v-if="employees.length > 0" class="item-list">
          <li v-for="emp in employees.slice(-5)" :key="emp.id" class="list-row">
            <div>
              <strong>{{ emp.name }}</strong>
              <small class="muted-text">({{ emp.email }})</small>
            </div>
            <span class="salary-text">${{ Number(emp.salary || 0).toLocaleString() }}</span>
          </li>
        </ul>
        <p v-else class="empty-text">No employees recorded.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.dashboard-view {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h2 {
  margin: 0;
  color: #2c3e50;
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

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
}

.stat-card {
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.stat-card h3 {
  margin: 0 0 8px 0;
  font-size: 14px;
  color: #666;
  text-transform: uppercase;
}

.stat-value {
  margin: 0 0 10px 0;
  font-size: 28px;
  font-weight: bold;
  color: #2c3e50;
}

.stat-link {
  font-size: 13px;
  color: #3498db;
  text-decoration: none;
}

.stat-link:hover {
  text-decoration: underline;
}

.stat-sub {
  font-size: 13px;
  color: #888;
}

.dashboard-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
}

.section-card {
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.section-header h3 {
  margin: 0;
  font-size: 16px;
  color: #2c3e50;
}

.action-btn {
  font-size: 12px;
  padding: 4px 8px;
  background: #2c3e50;
  color: #ffffff;
  text-decoration: none;
  border-radius: 4px;
}

.action-btn:hover {
  background: #34495e;
}

.item-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.list-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.list-row:last-child {
  border-bottom: none;
}

.badge {
  background: #ecf0f1;
  color: #2c3e50;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 12px;
  font-family: monospace;
}

.muted-text {
  margin-left: 6px;
  color: #7f8c8d;
  font-size: 12px;
}

.salary-text {
  font-weight: bold;
  color: #27ae60;
}

.empty-text {
  color: #7f8c8d;
  font-size: 14px;
  margin: 8px 0;
}
</style>
