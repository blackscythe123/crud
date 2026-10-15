<script setup>
import { onMounted } from 'vue'
import { useCompanyStore } from '../stores/companyStore'
import SummaryBadge from '../components/SummaryBadge.vue'

const store = useCompanyStore()

onMounted(() => {
  store.fetchDepartments()
  store.fetchEmployees()
})
</script>

<template>
  <div class="overview-view">
    <h2>Company Overview</h2>
    <div class="badges-container">
      <SummaryBadge :count="store.totalDepartments" label="Total Departments" />
      <SummaryBadge :count="store.totalEmployees" label="Total Employees" />
      <SummaryBadge :count="'$' + store.totalBudget" label="Total Budget" />
    </div>
  </div>
</template>

<style scoped>
.overview-view {
  padding: 16px 0;
}
.overview-view h2 {
  font-size: 1.5rem;
  margin-bottom: 20px;
}
.badges-container {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}
</style>
