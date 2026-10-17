<template>
  <div class="container">
    <header class="header">
      <h1>Company Management</h1>
      <p>Vue 3 + Axios + Pinia</p>
    </header>

    <div class="stats-grid">
      <div class="stat-card">
        <h3>Total Departments</h3>
        <p class="stat-value">{{ companyStore.totalDepartments }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Employees</h3>
        <p class="stat-value">{{ companyStore.totalEmployees }}</p>
      </div>
      <div class="stat-card">
        <h3>Total Payroll</h3>
        <p class="stat-value">${{ companyStore.totalPayroll.toLocaleString() }}</p>
      </div>
    </div>

    <div v-if="companyStore.loading" class="status-msg info">Loading data...</div>
    <div v-if="companyStore.error" class="status-msg error">{{ companyStore.error }}</div>

    <div class="main-grid">
      <section class="card">
        <h2>Departments</h2>
        
        <form @submit.prevent="handleCreateDepartment" class="form">
          <div class="form-group">
            <label for="dept-name">Department Name</label>
            <input
              id="dept-name"
              v-model="deptForm.name"
              type="text"
              required
              placeholder="e.g. Engineering"
            />
          </div>
          <div class="form-group">
            <label for="dept-code">Department Code</label>
            <input
              id="dept-code"
              v-model="deptForm.code"
              type="text"
              required
              placeholder="e.g. ENG"
            />
          </div>
          <button type="submit" class="btn btn-primary">Add Department</button>
        </form>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Code</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="companyStore.departments.length === 0">
                <td colspan="4" class="empty">No departments found</td>
              </tr>
              <tr v-for="dept in companyStore.departments" :key="dept.id">
                <td>{{ dept.id }}</td>
                <td>{{ dept.name }}</td>
                <td><code>{{ dept.code }}</code></td>
                <td>
                  <button @click="handlePatchDepartment(dept.id, dept.code)" class="btn">Patch</button>
                  <button @click="companyStore.deleteDepartment(dept.id)" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card">
        <h2>Employees</h2>

        <form @submit.prevent="handleCreateEmployee" class="form">
          <div class="form-group">
            <label for="emp-name">Full Name</label>
            <input
              id="emp-name"
              v-model="empForm.name"
              type="text"
              required
              placeholder="e.g. Jane Doe"
            />
          </div>
          <div class="form-group">
            <label for="emp-email">Email Address</label>
            <input
              id="emp-email"
              v-model="empForm.email"
              type="email"
              required
              placeholder="e.g. jane@example.com"
            />
          </div>
          <div class="form-group">
            <label for="emp-dept">Department</label>
            <select id="emp-dept" v-model="empForm.departmentId" required>
              <option value="" disabled>Select Department</option>
              <option v-for="dept in companyStore.departments" :key="dept.id" :value="dept.id">
                {{ dept.name }} ({{ dept.code }})
              </option>
            </select>
          </div>
          <div class="form-group">
            <label for="emp-salary">Salary</label>
            <input
              id="emp-salary"
              v-model.number="empForm.salary"
              type="number"
              min="0"
              step="any"
              required
              placeholder="e.g. 75000"
            />
          </div>
          <button type="submit" class="btn btn-primary">Add Employee</button>
        </form>

        <div class="table-wrapper">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="companyStore.employees.length === 0">
                <td colspan="6" class="empty">No employees found</td>
              </tr>
              <tr v-for="emp in companyStore.employees" :key="emp.id">
                <td>{{ emp.id }}</td>
                <td>{{ emp.name }}</td>
                <td>{{ emp.email }}</td>
                <td>{{ getDepartmentName(emp.departmentId) }}</td>
                <td>${{ Number(emp.salary).toLocaleString() }}</td>
                <td>
                  <button @click="handlePatchEmployee(emp.id, emp.salary)" class="btn">Patch</button>
                  <button @click="companyStore.deleteEmployee(emp.id)" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useCompanyStore } from './stores/companyStore'

const companyStore = useCompanyStore()

const deptForm = reactive({
  name: '',
  code: ''
})

const empForm = reactive({
  name: '',
  email: '',
  departmentId: '',
  salary: ''
})

const handleCreateDepartment = async () => {
  if (!deptForm.name || !deptForm.code) return
  await companyStore.createDepartment({
    name: deptForm.name,
    code: deptForm.code
  })
  deptForm.name = ''
  deptForm.code = ''
}

const handleCreateEmployee = async () => {
  if (!empForm.name || !empForm.email || !empForm.departmentId) return
  await companyStore.createEmployee({
    name: empForm.name,
    email: empForm.email,
    departmentId: empForm.departmentId,
    salary: Number(empForm.salary) || 0
  })
  empForm.name = ''
  empForm.email = ''
  empForm.departmentId = ''
  empForm.salary = ''
}

const handlePatchDepartment = async (id, currentCode) => {
  const code = prompt('Enter new department code:', currentCode)
  if (!code || code === currentCode) return
  await companyStore.patchDepartment(id, { code })
}

const handlePatchEmployee = async (id, currentSalary) => {
  const salary = prompt('Enter new salary:', currentSalary)
  if (!salary || Number(salary) === Number(currentSalary)) return
  await companyStore.patchEmployee(id, { salary: Number(salary) })
}

const getDepartmentName = (deptId) => {
  const dept = companyStore.departments.find(d => d.id === deptId)
  return dept ? dept.name : (deptId || 'N/A')
}

onMounted(() => {
  companyStore.fetchDepartments()
  companyStore.fetchEmployees()
})
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: #f4f5f7;
  color: #333333;
  line-height: 1.5;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 16px;
}

.header {
  margin-bottom: 24px;
}

.header h1 {
  font-size: 28px;
  color: #1a1a1a;
}

.header p {
  color: #666666;
  font-size: 14px;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.stat-card {
  background: #ffffff;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.stat-card h3 {
  font-size: 13px;
  text-transform: uppercase;
  color: #666666;
  margin-bottom: 6px;
}

.stat-value {
  font-size: 24px;
  font-weight: 700;
  color: #0969da;
}

.status-msg {
  padding: 10px 14px;
  border-radius: 6px;
  font-size: 14px;
  margin-bottom: 20px;
}

.status-msg.info {
  background-color: #ddf4ff;
  color: #0969da;
  border: 1px solid #54aeff66;
}

.status-msg.error {
  background-color: #ffebe9;
  color: #cf222e;
  border: 1px solid #ff818266;
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 900px) {
  .main-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.card {
  background: #ffffff;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card h2 {
  font-size: 20px;
  margin-bottom: 16px;
  color: #24292f;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 8px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 24px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #444444;
}

.form-group input,
.form-group select {
  padding: 8px 12px;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  font-size: 14px;
  background-color: #ffffff;
  color: #24292f;
  outline: none;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #0969da;
  box-shadow: 0 0 0 3px rgba(9, 105, 218, 0.15);
}

.btn {
  display: inline-block;
  padding: 8px 16px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 6px;
  border: 1px solid transparent;
  cursor: pointer;
  text-align: center;
  transition: background-color 0.15s ease-in-out;
}

.btn-primary {
  background-color: #1f883d;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #1a7f37;
}

.btn-danger {
  background-color: #cf222e;
  color: #ffffff;
  padding: 4px 10px;
  font-size: 12px;
}

.btn-danger:hover {
  background-color: #a40e26;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  text-align: left;
}

th, td {
  padding: 10px 12px;
  border-bottom: 1px solid #e1e4e8;
}

th {
  background-color: #f6f8fa;
  font-weight: 600;
  color: #57606a;
}

td code {
  background-color: #eff1f3;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 12px;
}

.empty {
  text-align: center;
  color: #8c959f;
  padding: 24px;
}
</style>
