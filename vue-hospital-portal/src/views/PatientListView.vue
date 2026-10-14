<script setup>
import { ref, computed } from 'vue'
import { useHospitalStore } from '../stores/hospitalStore'

const hospital = useHospitalStore()
const filterBed = ref('ALL')
const searchQuery = ref('')
const notice = ref('')

const filteredPatients = computed(() => {
  return hospital.patients.filter((p) => {
    const matchesBed = filterBed.value === 'ALL' || p.bedType === filterBed.value
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      p.doctor.toLowerCase().includes(searchQuery.value.toLowerCase())
    return matchesBed && matchesSearch
  })
})

function handleDischarge(id, name) {
  hospital.dischargePatient(id)
  notice.value = `Patient ${name} has been discharged.`
  setTimeout(() => {
    notice.value = ''
  }, 3000)
}
</script>

<template>
  <div class="patient-list-page">
    <div class="header-row">
      <div>
        <h2>Admitted Patients Directory</h2>
        <p class="subtitle">Currently admitted: {{ hospital.totalPatients }} patient(s)</p>
      </div>
      <router-link to="/" class="btn-admit-link">+ Admit New Patient</router-link>
    </div>

    <div v-if="notice" class="alert alert-info">
      {{ notice }}
    </div>

    <div class="filter-bar">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search patient or doctor..."
        class="search-input"
      />
      <div class="filter-tabs">
        <button
          :class="['tab-btn', filterBed === 'ALL' ? 'tab-active' : '']"
          @click="filterBed = 'ALL'"
        >
          All ({{ hospital.patients.length }})
        </button>
        <button
          :class="['tab-btn', filterBed === 'General Ward' ? 'tab-active' : '']"
          @click="filterBed = 'General Ward'"
        >
          General Ward
        </button>
        <button
          :class="['tab-btn', filterBed === 'ICU' ? 'tab-active' : '']"
          @click="filterBed = 'ICU'"
        >
          ICU
        </button>
      </div>
    </div>

    <div v-if="filteredPatients.length === 0" class="empty-state">
      <p>No admitted patients found matching current criteria.</p>
    </div>

    <div v-else class="table-container">
      <table class="patient-table">
        <thead>
          <tr>
            <th>Patient</th>
            <th>Age</th>
            <th>Bed Type</th>
            <th>Doctor</th>
            <th>Vitals (BP / HR / Temp)</th>
            <th>Risk Level</th>
            <th>Bill ($)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="patient in filteredPatients" :key="patient.id">
            <td class="font-bold">{{ patient.name }}</td>
            <td>{{ patient.age }} yrs</td>
            <td>
              <span :class="['bed-badge', patient.bedType === 'ICU' ? 'bed-icu' : 'bed-general']">
                {{ patient.bedType }}
              </span>
            </td>
            <td>{{ patient.doctor }}</td>
            <td>
              <div class="vitals-chip">
                <span>BP: {{ patient.vitals.bp }}</span>
                <span>HR: {{ patient.vitals.hr }} bpm</span>
                <span>{{ patient.vitals.temp }}°F</span>
              </div>
            </td>
            <td>
              <span :class="['risk-badge', 'risk-' + (patient.risk ? patient.risk.toLowerCase() : 'normal')]">
                {{ patient.risk || 'Normal' }}
              </span>
            </td>
            <td class="bill-cell">${{ patient.bill }}</td>
            <td>
              <button
                class="btn-discharge"
                @click="handleDischarge(patient.id, patient.name)"
              >
                Discharge
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.patient-list-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

h2 {
  margin: 0;
  font-size: 20px;
  color: #1a202c;
}

.subtitle {
  margin: 4px 0 0 0;
  font-size: 13px;
  color: #718096;
}

.btn-admit-link {
  background-color: #2b6cb0;
  color: white;
  text-decoration: none;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 14px;
  border-radius: 4px;
}

.alert-info {
  background-color: #ebf8ff;
  color: #2b6cb0;
  border: 1px solid #bee3f8;
  padding: 10px 14px;
  border-radius: 4px;
  font-size: 14px;
}

.filter-bar {
  display: flex;
  justify-content: space-between;
  gap: 15px;
  flex-wrap: wrap;
  align-items: center;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 8px 12px;
  border: 1px solid #cbd5e0;
  border-radius: 5px;
  font-size: 14px;
}

.filter-tabs {
  display: flex;
  gap: 6px;
}

.tab-btn {
  padding: 6px 12px;
  border: 1px solid #cbd5e0;
  background-color: #ffffff;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  color: #4a5568;
}

.tab-active {
  background-color: #2b6cb0;
  color: #ffffff;
  border-color: #2b6cb0;
}

.empty-state {
  background-color: #ffffff;
  padding: 30px;
  text-align: center;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  color: #718096;
}

.table-container {
  overflow-x: auto;
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
}

.patient-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  text-align: left;
}

.patient-table th {
  background-color: #f7fafc;
  color: #4a5568;
  font-weight: 700;
  padding: 12px 14px;
  border-bottom: 2px solid #e2e8f0;
}

.patient-table td {
  padding: 12px 14px;
  border-bottom: 1px solid #edf2f7;
  color: #2d3748;
}

.font-bold {
  font-weight: 600;
}

.bed-badge {
  font-size: 11px;
  font-weight: 600;
  padding: 3px 8px;
  border-radius: 12px;
}

.bed-general {
  background-color: #e2e8f0;
  color: #2d3748;
}

.bed-icu {
  background-color: #feebc8;
  color: #c05621;
}

.vitals-chip {
  display: flex;
  gap: 8px;
  font-size: 12px;
  color: #4a5568;
}

.risk-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
  text-transform: uppercase;
}

.risk-high {
  background-color: #fed7d7;
  color: #9b2c2c;
}

.risk-moderate {
  background-color: #feebc8;
  color: #c05621;
}

.risk-normal {
  background-color: #c6f6d5;
  color: #22543d;
}

.bill-cell {
  font-weight: 600;
}

.btn-discharge {
  background-color: #e53e3e;
  color: #ffffff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.btn-discharge:hover {
  background-color: #c53030;
}
</style>
