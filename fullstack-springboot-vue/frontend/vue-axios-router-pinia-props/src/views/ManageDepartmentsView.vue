<script setup>
import { onMounted } from 'vue'
import { useCompanyStore } from '../stores/companyStore'
import EntityTable from '../components/EntityTable.vue'
import EntityForm from '../components/EntityForm.vue'

const companyStore = useCompanyStore()
const store = companyStore

const departmentFields = [
  { key: 'name', label: 'Department Name', type: 'text', placeholder: 'e.g. Finance' },
  { key: 'code', label: 'Department Code', type: 'text', placeholder: 'e.g. FIN' },
  { key: 'budget', label: 'Annual Budget ($)', type: 'number', placeholder: 'e.g. 50000' }
]

const departmentColumns = [
  { key: 'id', label: 'ID' },
  { key: 'name', label: 'Name' },
  { key: 'code', label: 'Code' },
  { key: 'budget', label: 'Budget' }
]

const handleAddDepartment = (formData) => {
  store.addDepartment({
    name: formData.name,
    code: formData.code,
    budget: Number(formData.budget)
  })
}

const handleDeleteDepartment = (id) => {
  store.removeDepartment(id)
}

const handlePatch = (item) => {
  const code = prompt('New code:', item.code)
  if (code) {
    companyStore.patchDepartment(item.id, { code })
  }
}

onMounted(() => {
  store.fetchDepartments()
})
</script>

<template>
  <div class="manage-departments-view">
    <h2>Manage Departments</h2>
    <EntityForm
      :fields="departmentFields"
      title="Add New Department"
      @submit-form="handleAddDepartment"
    />
    <EntityTable
      :items="store.departments"
      :columns="departmentColumns"
      title="All Departments"
      @delete-item="handleDeleteDepartment"
      @patch-item="handlePatch"
    />
  </div>
</template>

<style scoped>
.manage-departments-view {
  padding: 16px 0;
}
.manage-departments-view h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}
</style>
