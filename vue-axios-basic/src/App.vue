<template>
  <div class="container">
    <header class="header">
      <h1>Company Directory</h1>
      <p>Vue 3 + Axios Direct CRUD</p>
    </header>

    <div class="grid">
      <section class="card">
        <h2>Departments</h2>
        
        <form @submit.prevent="createDepartment" class="form">
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
              <tr v-if="departments.length === 0">
                <td colspan="4" class="empty">No departments found</td>
              </tr>
              <tr v-for="dept in departments" :key="dept.id">
                <td>{{ dept.id }}</td>
                <td>{{ dept.name }}</td>
                <td><code>{{ dept.code }}</code></td>
                <td>
                  <button @click="patchDepartment(dept.id, dept.code)" class="btn">Patch</button>
                  <button @click="deleteDepartment(dept.id)" class="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="card">
        <h2>Employees</h2>

        <form @submit.prevent="createEmployee" class="form">
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
              <option v-for="dept in departments" :key="dept.id" :value="dept.id">
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
              <tr v-if="employees.length === 0">
                <td colspan="6" class="empty">No employees found</td>
              </tr>
              <tr v-for="emp in employees" :key="emp.id">
                <td>{{ emp.id }}</td>
                <td>{{ emp.name }}</td>
                <td>{{ emp.email }}</td>
                <td>{{ getDepartmentName(emp.departmentId) }}</td>
                <td>${{ Number(emp.salary).toLocaleString() }}</td>
                <td>
                  <button @click="patchEmployeeSalary(emp.id, emp.salary)" class="btn">Patch</button>
                  <button @click="deleteEmployee(emp.id)" class="btn btn-danger">Delete</button>
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
import { ref, reactive, onMounted } from 'vue'
import api from './services/api'

const departments = ref([])
const employees = ref([])

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

const fetchDepartments = async () => {
  try {
    const response = await api.get('/departments')
    departments.value = response.data
  } catch (error) {
    console.error(error)
  }
}

const fetchEmployees = async () => {
  try {
    const response = await api.get('/employees')
    employees.value = response.data
  } catch (error) {
    console.error(error)
  }
}

const createDepartment = async () => {
  try {
    await api.post('/departments', {
      name: deptForm.name,
      code: deptForm.code
    })
    deptForm.name = ''
    deptForm.code = ''
    await fetchDepartments()
  } catch (error) {
    console.error(error)
  }
}

const deleteDepartment = async (id) => {
  try {
    await api.delete(`/departments/${id}`)
    await fetchDepartments()
    await fetchEmployees()
  } catch (error) {
    console.error(error)
  }
}

const createEmployee = async () => {
  try {
    await api.post('/employees', {
      name: empForm.name,
      email: empForm.email,
      departmentId: Number(empForm.departmentId),
      salary: Number(empForm.salary)
    })
    empForm.name = ''
    empForm.email = ''
    empForm.departmentId = ''
    empForm.salary = ''
    await fetchEmployees()
  } catch (error) {
    console.error(error)
  }
}

const deleteEmployee = async (id) => {
  try {
    await api.delete(`/employees/${id}`)
    await fetchEmployees()
  } catch (error) {
    console.error(error)
  }
}

const patchDepartment = async (id, currentCode) => {
  const code = prompt('Enter new department code:', currentCode)
  if (!code || code === currentCode) return
  try {
    await api.patch(`/departments/${id}`, { code })
    await fetchDepartments()
  } catch (error) {
    console.error(error)
  }
}

const patchEmployeeSalary = async (id, currentSalary) => {
  const salary = prompt('Enter new salary:', currentSalary)
  if (!salary || Number(salary) === Number(currentSalary)) return
  try {
    await api.patch(`/employees/${id}`, { salary: Number(salary) })
    await fetchEmployees()
  } catch (error) {
    console.error(error)
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

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

@media (min-width: 900px) {
  .grid {
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
  color: #222222;
  border-bottom: 1px solid #edf0f2;
  padding-bottom: 8px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
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
  padding: 8px 10px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #ffffff;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #0066cc;
}

.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: background-color 0.15s ease;
}

.btn-primary {
  background-color: #0066cc;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #0052a3;
}

.btn-danger {
  background-color: #d9383a;
  color: #ffffff;
  padding: 4px 8px;
  font-size: 12px;
}

.btn-danger:hover {
  background-color: #b8282a;
}

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-top: 8px;
}

th, td {
  text-align: left;
  padding: 8px 10px;
  border-bottom: 1px solid #eeeeee;
}

th {
  background-color: #fafbfc;
  color: #555555;
  font-weight: 600;
}

code {
  background: #f0f0f0;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 12px;
}

.empty {
  text-align: center;
  color: #888888;
  padding: 16px;
}
</style>
