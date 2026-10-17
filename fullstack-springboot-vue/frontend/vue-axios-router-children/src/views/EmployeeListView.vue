<template>
  <div class="employees-page">
    <header class="page-header">
      <h1>Employees</h1>
      <p>Manage company employees and view their profiles.</p>
    </header>

    <section class="card form-card">
      <h2>Add New Employee</h2>
      <form @submit.prevent="createEmployee" class="form">
        <div class="form-row">
          <div class="form-group">
            <label for="emp-name">Full Name</label>
            <input
              id="emp-name"
              v-model="form.name"
              type="text"
              required
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div class="form-group">
            <label for="emp-email">Email</label>
            <input
              id="emp-email"
              v-model="form.email"
              type="email"
              required
              placeholder="e.g. jane@example.com"
            />
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="emp-dept">Department</label>
            <select id="emp-dept" v-model="form.departmentId" required>
              <option value="" disabled>Select Department</option>
              <option v-for="dept in departments" :key="dept.id" :value="dept.id">
                {{ dept.name }} ({{ dept.code }})
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="emp-salary">Salary</label>
            <input
              id="emp-salary"
              v-model.number="form.salary"
              type="number"
              min="0"
              step="any"
              required
              placeholder="e.g. 75000"
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Add Employee</button>
      </form>
    </section>

    <section class="card table-card">
      <h2>All Employees</h2>
      <table class="data-table">
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
          <tr v-if="employees.length === 0">
            <td colspan="6" class="empty">No employees found.</td>
          </tr>
          <tr v-for="emp in employees" :key="emp.id">
            <td>{{ emp.id }}</td>
            <td>{{ emp.name }}</td>
            <td>{{ emp.email }}</td>
            <td>{{ getDepartmentName(emp.departmentId) }}</td>
            <td>${{ Number(emp.salary).toLocaleString() }}</td>
            <td class="action-cell">
              <router-link :to="'/company/employees/' + emp.id" class="btn btn-info">View</router-link>
              <button @click="handlePatch(emp.id, emp.salary)" class="btn btn-warning">Patch</button>
              <button @click="deleteEmployee(emp.id)" class="btn btn-danger">Delete</button>
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

const employees = ref([])
const departments = ref([])

const form = reactive({
  name: '',
  email: '',
  departmentId: '',
  salary: ''
})

const fetchDepartments = async () => {
  try {
    const res = await api.get('/departments')
    departments.value = Array.isArray(res.data) ? res.data : []
  } catch (err) {
    departments.value = []
  }
}

const fetchEmployees = async () => {
  try {
    const res = await api.get('/employees')
    employees.value = Array.isArray(res.data) ? res.data : []
  } catch (err) {
    employees.value = []
  }
}

const createEmployee = async () => {
  try {
    await api.post('/employees', {
      name: form.name,
      email: form.email,
      departmentId: Number(form.departmentId),
      salary: Number(form.salary)
    })
    form.name = ''
    form.email = ''
    form.departmentId = ''
    form.salary = ''
    await fetchEmployees()
  } catch (err) {
    alert('Failed to add employee')
  }
}

const deleteEmployee = async (id) => {
  try {
    await api.delete(`/employees/${id}`)
    await fetchEmployees()
  } catch (err) {
    alert('Failed to delete employee')
  }
}

const handlePatch = async (id, salary) => {
  const newSalary = prompt('New salary:', salary)
  if (newSalary !== null && newSalary !== '') {
    try {
      await api.patch(`/employees/${id}`, { salary: Number(newSalary) })
      await fetchEmployees()
    } catch (err) {
      alert('Failed to patch employee')
    }
  }
}

const getDepartmentName = (deptId) => {
  const dept = departments.value.find((d) => d.id === deptId)
  return dept ? dept.name : `Dept #${deptId}`
}

onMounted(() => {
  fetchDepartments()
  fetchEmployees()
})
</script>

<style scoped>
.employees-page {
  max-width: 960px;
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

input,
select {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 6px;
  font-size: 0.95rem;
}

input:focus,
select:focus {
  outline: none;
  border-color: #2563eb;
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
  justify-content: center;
  transition: opacity 0.2s;
}

.btn:hover {
  opacity: 0.9;
}

.btn-primary {
  background-color: #2563eb;
  color: #ffffff;
}

.btn-info {
  background-color: #0284c7;
  color: #ffffff;
  font-size: 0.875rem;
  padding: 6px 12px;
}

.btn-danger {
  background-color: #ef4444;
  color: #ffffff;
  font-size: 0.875rem;
  padding: 6px 12px;
}

.btn-warning {
  background-color: #f59e0b;
  color: #ffffff;
  font-size: 0.875rem;
  padding: 6px 12px;
}

.action-cell {
  display: flex;
  gap: 8px;
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

.empty {
  text-align: center;
  color: #94a3b8;
  padding: 24px;
}
</style>
