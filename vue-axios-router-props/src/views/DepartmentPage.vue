<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import EntryForm from '../components/EntryForm.vue'
import DataCard from '../components/DataCard.vue'

const departments = ref([])

const deptFields = [
  { key: 'name', label: 'Department Name', placeholder: 'e.g. Engineering' },
  { key: 'code', label: 'Department Code', placeholder: 'e.g. ENG' }
]

const fetchDepartments = async () => {
  try {
    const res = await api.get('/departments')
    departments.value = res.data
  } catch (error) {
    console.error(error)
  }
}

const handleCreateDepartment = async (formData) => {
  try {
    const res = await api.post('/departments', formData)
    departments.value.push(res.data)
  } catch (error) {
    console.error(error)
  }
}

const handleRemoveDepartment = async (id) => {
  try {
    await api.delete(`/departments/${id}`)
    departments.value = departments.value.filter(dept => dept.id !== id)
  } catch (error) {
    console.error(error)
  }
}

const handlePatch = async (id, code) => {
  const newCode = prompt('New code:', code)
  if (!newCode || newCode === code) return
  try {
    await api.patch(`/departments/${id}`, { code: newCode })
    await fetchDepartments()
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchDepartments()
})
</script>

<template>
  <div class="page-container">
    <h2>Departments</h2>
    <EntryForm :fields="deptFields" @submit-data="handleCreateDepartment" />
    <div class="card-list">
      <p v-if="departments.length === 0" class="empty-state">No departments available.</p>
      <DataCard
        v-for="dept in departments"
        :key="dept.id"
        :id="dept.id"
        :title="dept.name"
        :subtitle="dept.code"
        @remove="handleRemoveDepartment"
        @patch="handlePatch(dept.id, dept.code)"
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
