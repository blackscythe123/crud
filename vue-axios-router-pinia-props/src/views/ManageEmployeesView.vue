<script setup>
import { onMounted } from 'vue'
import { useCompanyStore } from '../stores/companyStore'
import EntityTable from '../components/EntityTable.vue'
import EntityForm from '../components/EntityForm.vue'

const companyStore = useCompanyStore()
const store = companyStore

const employeeFields = [
  { key: 'name', label: 'Employee Name', type: 'text', placeholder: 'e.g. Jane Doe' },
  { key: 'email', label: 'Email Address', type: 'email', placeholder: 'e.g. jane@example.com' },
  { key: 'role', label: 'Job Role', type: 'text', placeholder: 'e.g. Developer' },
  { key: 'department', label: 'Department', type: 'text', placeholder: 'e.g. Engineering' }
]

const employeeColumns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'department', label: 'Department' }
]

const handleAddEmployee = (formData) => {
  store.addEmployee({
    name: formData.name,
    email: formData.email,
    role: formData.role,
    department: formData.department
  })
}

const handleDeleteEmployee = (id) => {
  store.removeEmployee(id)
}

const handlePatch = (item) => {
  const salary = prompt('New salary:', item.salary)
  if (salary !== null && salary !== '') {
    companyStore.patchEmployee(item.id, { salary: Number(salary) })
  }
}

onMounted(() => {
  store.fetchEmployees()
})
</script>

<template>
  <div class="manage-employees-view">
    <h2>Manage Employees</h2>
    <EntityForm
      :fields="employeeFields"
      title="Add New Employee"
      @submit-form="handleAddEmployee"
    />
    <EntityTable
      :items="store.employees"
      :columns="employeeColumns"
      title="All Employees"
      @delete-item="handleDeleteEmployee"
      @patch-item="handlePatch"
    />
  </div>
</template>

<style scoped>
.manage-employees-view {
  padding: 16px 0;
}
.manage-employees-view h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}
</style>
