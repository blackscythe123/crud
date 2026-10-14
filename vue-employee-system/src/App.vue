<script setup>
import { reactive, computed } from 'vue'
import { useEmployeeStore } from './stores/employeeStore'

const store = useEmployeeStore()

const form = reactive({
  id: '',
  name: '',
  department: 'Engineering',
  experience: '',
  baseSalary: ''
})

const formDepartments = computed(() => {
  return store.departments.filter(dept => dept !== 'All')
})

const handleAddEmployee = () => {
  if (!form.id || !form.name || !form.department || form.experience === '' || form.baseSalary === '') {
    return
  }
  store.addEmployee({
    id: Number(form.id),
    name: form.name.trim(),
    department: form.department,
    experience: Number(form.experience),
    baseSalary: Number(form.baseSalary)
  })
  form.id = ''
  form.name = ''
  form.department = 'Engineering'
  form.experience = ''
  form.baseSalary = ''
}

const formatCurrency = (amount) => {
  return Number(amount || 0).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })
}
</script>

<template>
  <div class="container">
    <header class="header">
      <h1>Employee Management System</h1>
    </header>

    <div class="summary-cards">
      <div class="card">
        <h3>Total Employees</h3>
        <p class="card-value">{{ store.totalEmployees }}</p>
      </div>
      <div class="card">
        <h3>Total Payroll ($)</h3>
        <p class="card-value">${{ formatCurrency(store.totalPayroll) }}</p>
      </div>
      <div class="card">
        <h3>Average Salary ($)</h3>
        <p class="card-value">${{ formatCurrency(store.averageSalary) }}</p>
      </div>
    </div>

    <section class="section form-section">
      <h2>Add New Employee</h2>
      <form @submit.prevent="handleAddEmployee" class="employee-form">
        <div class="form-group">
          <label for="emp-id">Employee ID</label>
          <input
            id="emp-id"
            v-model="form.id"
            type="number"
            min="1"
            placeholder="e.g. 5"
            required
          />
        </div>
        <div class="form-group">
          <label for="emp-name">Name</label>
          <input
            id="emp-name"
            v-model="form.name"
            type="text"
            placeholder="e.g. Jane Doe"
            required
          />
        </div>
        <div class="form-group">
          <label for="emp-department">Department</label>
          <select id="emp-department" v-model="form.department" required>
            <option v-for="dept in formDepartments" :key="dept" :value="dept">
              {{ dept }}
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="emp-experience">Experience (Years)</label>
          <input
            id="emp-experience"
            v-model="form.experience"
            type="number"
            min="0"
            step="1"
            placeholder="e.g. 3"
            required
          />
        </div>
        <div class="form-group">
          <label for="emp-salary">Base Salary ($)</label>
          <input
            id="emp-salary"
            v-model="form.baseSalary"
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 50000"
            required
          />
        </div>
        <div class="form-actions">
          <button type="submit" class="btn btn-primary">Add Employee</button>
        </div>
      </form>
    </section>

    <section class="section">
      <div class="tabs-header">
        <h2>Department Filter</h2>
        <div class="filter-tabs">
          <button
            v-for="dept in store.departments"
            :key="dept"
            type="button"
            class="tab-btn"
            :class="{ active: store.selectedDept === dept }"
            @click="store.setDepartment(dept)"
          >
            {{ dept }}
          </button>
        </div>
      </div>

      <div class="table-container">
        <table class="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Experience</th>
              <th>Base Salary</th>
              <th>Bonus</th>
              <th>Tax</th>
              <th>Net Salary</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="store.filteredEmployees.length === 0">
              <td colspan="9" class="no-records">No employees found in this department.</td>
            </tr>
            <tr v-for="emp in store.filteredEmployees" :key="emp.id">
              <td>{{ emp.id }}</td>
              <td>{{ emp.name }}</td>
              <td>{{ emp.department }}</td>
              <td>{{ emp.experience }} yrs</td>
              <td>${{ formatCurrency(emp.baseSalary) }}</td>
              <td>${{ formatCurrency(store.calculateBonus(emp)) }}</td>
              <td>${{ formatCurrency(store.calculateTax(emp)) }}</td>
              <td>${{ formatCurrency(store.calculateNetSalary(emp)) }}</td>
              <td>
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="store.deleteEmployee(emp.id)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f7f9fc;
  color: #333333;
  padding: 24px 16px;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.header {
  margin-bottom: 24px;
}

.header h1 {
  font-size: 28px;
  color: #1a202c;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
}

.card h3 {
  font-size: 14px;
  font-weight: 500;
  color: #718096;
  margin-bottom: 8px;
}

.card-value {
  font-size: 24px;
  font-weight: 700;
  color: #2b6cb0;
}

.section {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
}

.section h2 {
  font-size: 18px;
  color: #2d3748;
  margin-bottom: 16px;
}

.employee-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  align-items: flex-end;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
  margin-bottom: 6px;
}

.form-group input,
.form-group select {
  padding: 8px 10px;
  font-size: 14px;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  background-color: #ffffff;
  outline: none;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #3182ce;
}

.form-actions {
  display: flex;
}

.btn {
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 4px;
  border: none;
  cursor: pointer;
}

.btn-primary {
  background-color: #3182ce;
  color: #ffffff;
  width: 100%;
  height: 38px;
}

.btn-primary:hover {
  background-color: #2b6cb0;
}

.btn-danger {
  background-color: #e53e3e;
  color: #ffffff;
  padding: 4px 10px;
  font-size: 12px;
}

.btn-danger:hover {
  background-color: #c53030;
}

.tabs-header {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tab-btn {
  padding: 6px 14px;
  font-size: 13px;
  border: 1px solid #cbd5e0;
  background-color: #edf2f7;
  color: #4a5568;
  border-radius: 4px;
  cursor: pointer;
}

.tab-btn.active {
  background-color: #3182ce;
  color: #ffffff;
  border-color: #3182ce;
  font-weight: 600;
}

.table-container {
  overflow-x: auto;
}

.employee-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

.employee-table th,
.employee-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #e2e8f0;
  font-size: 14px;
}

.employee-table th {
  background-color: #f7fafc;
  color: #4a5568;
  font-weight: 600;
}

.no-records {
  text-align: center;
  color: #a0aec0;
  padding: 24px;
}
</style>
