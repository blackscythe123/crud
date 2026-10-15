<script setup>
import { onMounted } from 'vue'
import { useCompanyStore } from './stores/companyStore'
import DepartmentSection from './components/DepartmentSection.vue'
import EmployeeSection from './components/EmployeeSection.vue'

const store = useCompanyStore()

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

function handleCreateEmployee(employee) {
  store.createEmployee(employee)
}

function handleDeleteEmployee(id) {
  store.deleteEmployee(id)
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
    />
    <EmployeeSection
      :employees="store.employees"
      :departments="store.departments"
      @create="handleCreateEmployee"
      @delete="handleDeleteEmployee"
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
