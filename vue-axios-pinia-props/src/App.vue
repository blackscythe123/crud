<script setup>
import { onMounted } from 'vue'
import { useCompanyStore } from './stores/companyStore'
import DepartmentSection from './components/DepartmentSection.vue'
import EmployeeSection from './components/EmployeeSection.vue'

const companyStore = useCompanyStore()
const store = companyStore

onMounted(() => {
  store.fetchDepartments()
  store.fetchEmployees()
})

function handleCreateDepartment(department) {
  store.createDepartment(department)
}

function handleDeleteDepartment(id) {
  store.deleteDepartment(id)
}

async function handlePatchDept(id, code) {
  const newCode = prompt('New code:', code)
  if (!newCode || newCode === code) return
  await companyStore.patchDepartment(id, { code: newCode })
}

function handleCreateEmployee(employee) {
  store.createEmployee(employee)
}

function handleDeleteEmployee(id) {
  store.deleteEmployee(id)
}

async function handlePatchEmp(id, salary) {
  const newSalary = prompt('New salary:', salary)
  if (!newSalary || Number(newSalary) === Number(salary)) return
  await companyStore.patchEmployee(id, { salary: Number(newSalary) })
}
</script>

<template>
  <main class="app-container">
    <header class="app-header">
      <h1>Company Management System</h1>
    </header>
    <DepartmentSection
      :departments="store.departments"
      @create="handleCreateDepartment"
      @delete="handleDeleteDepartment"
      @patch="handlePatchDept"
    />
    <EmployeeSection
      :employees="store.employees"
      :departments="store.departments"
      @create="handleCreateEmployee"
      @delete="handleDeleteEmployee"
      @patch="handlePatchEmp"
    />
  </main>
</template>

<style scoped>
.app-container {
  max-width: 960px;
  margin: 0 auto;
  padding: 24px 16px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #333;
}

.app-header {
  margin-bottom: 24px;
  border-bottom: 2px solid #eee;
  padding-bottom: 12px;
}

.app-header h1 {
  margin: 0;
  font-size: 24px;
}
</style>
