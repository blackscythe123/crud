<template>
  <div class="container">
    <header class="header">
      <h1>Company Directory</h1>
      <p>Vue 3 + Axios + Props & Emits</p>
    </header>

    <div class="grid">
      <section class="card">
        <h2>Departments</h2>
        <DepartmentForm @create-department="createDepartment" />
        <DepartmentList
          :departments="departments"
          @delete-department="deleteDepartment"
          @patch-department="patchDepartment"
        />
      </section>

      <section class="card">
        <h2>Employees</h2>
        <EmployeeForm
          :departments="departments"
          @create-employee="createEmployee"
        />
        <EmployeeList
          :employees="employees"
          :departments="departments"
          @delete-employee="deleteEmployee"
          @patch-employee="patchEmployee"
        />
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from './services/api'
import DepartmentList from './components/DepartmentList.vue'
import DepartmentForm from './components/DepartmentForm.vue'
import EmployeeList from './components/EmployeeList.vue'
import EmployeeForm from './components/EmployeeForm.vue'

const departments = ref([])
const employees = ref([])

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

const createDepartment = async (departmentData) => {
  try {
    await api.post('/departments', departmentData)
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

const createEmployee = async (employeeData) => {
  try {
    await api.post('/employees', employeeData)
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

const patchEmployee = async (id, currentSalary) => {
  const salary = prompt('Enter new salary:', currentSalary)
  if (!salary || Number(salary) === Number(currentSalary)) return
  try {
    await api.patch(`/employees/${id}`, { salary: Number(salary) })
    await fetchEmployees()
  } catch (error) {
    console.error(error)
  }
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
</style>
