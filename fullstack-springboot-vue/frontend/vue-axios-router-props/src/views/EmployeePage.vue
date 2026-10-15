<script setup>
import { ref, computed, onMounted } from 'vue'
import api from '../services/api'
import EntryForm from '../components/EntryForm.vue'
import DataCard from '../components/DataCard.vue'

const employees = ref([])
const departments = ref([])

const empFields = computed(() => {
  if (departments.value.length > 0) {
    return [
      { key: 'name', label: 'Employee Name', placeholder: 'e.g. Jane Doe' },
      { key: 'email', label: 'Email Address', type: 'email', placeholder: 'e.g. jane@example.com' },
      {
        key: 'departmentId',
        label: 'Department',
        type: 'select',
        placeholder: 'Select Department',
        options: departments.value.map(d => ({ value: d.id, label: `${d.name} (${d.code})` }))
      },
      { key: 'salary', label: 'Salary', type: 'number', placeholder: 'e.g. 75000' }
    ]
  }
  return [
    { key: 'name', label: 'Employee Name', placeholder: 'e.g. Jane Doe' },
    { key: 'email', label: 'Email Address', type: 'email', placeholder: 'e.g. jane@example.com' },
    { key: 'departmentId', label: 'Department ID', placeholder: 'e.g. 1' },
    { key: 'salary', label: 'Salary', type: 'number', placeholder: 'e.g. 75000' }
  ]
})

const fetchEmployees = async () => {
  try {
    const res = await api.get('/employees')
    employees.value = res.data
  } catch (error) {
    console.error(error)
  }
}

const fetchDepartments = async () => {
  try {
    const res = await api.get('/departments')
    departments.value = res.data
  } catch (error) {
    console.error(error)
  }
}

const handleCreateEmployee = async (formData) => {
  try {
    const payload = {
      ...formData,
      salary: Number(formData.salary)
    }
    const res = await api.post('/employees', payload)
    employees.value.push(res.data)
  } catch (error) {
    console.error(error)
  }
}

const handleRemoveEmployee = async (id) => {
  try {
    await api.delete(`/employees/${id}`)
    employees.value = employees.value.filter(emp => emp.id !== id)
  } catch (error) {
    console.error(error)
  }
}

const getSubtitle = (emp) => {
  const dept = departments.value.find(d => d.id === emp.departmentId)
  const deptLabel = dept ? `${dept.name} (${dept.code})` : emp.departmentId
  return `${emp.email} | Dept: ${deptLabel} | $${Number(emp.salary).toLocaleString()}`
}

onMounted(() => {
  fetchDepartments()
  fetchEmployees()
})
</script>

<template>
  <div class="page-container">
    <h2>Employees</h2>
    <EntryForm :fields="empFields" @submit-data="handleCreateEmployee" />
    <div class="card-list">
      <p v-if="employees.length === 0" class="empty-state">No employees available.</p>
      <DataCard
        v-for="emp in employees"
        :key="emp.id"
        :id="emp.id"
        :title="emp.name"
        :subtitle="getSubtitle(emp)"
        @remove="handleRemoveEmployee"
      />
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
}
.empty-state {
  color: #a0aec0;
  font-style: italic;
}
.card-list {
  display: flex;
  flex-direction: column;
}
</style>
