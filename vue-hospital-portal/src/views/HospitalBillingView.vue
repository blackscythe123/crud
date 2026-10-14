<script setup>
import { computed } from 'vue'
import { useHospitalStore } from '../stores/hospitalStore'

const hospital = useHospitalStore()

const paidTotal = computed(() => {
  return hospital.patients
    .filter((p) => p.paymentStatus === 'Paid')
    .reduce((sum, p) => sum + (Number(p.bill) || 0), 0)
})

const pendingTotal = computed(() => {
  return hospital.patients
    .filter((p) => p.paymentStatus !== 'Paid')
    .reduce((sum, p) => sum + (Number(p.bill) || 0), 0)
})

function handleSettle(id) {
  hospital.settlePayment(id)
}
</script>

<template>
  <div class="billing-page">
    <h2>Hospital Financial & Critical Care Overview</h2>

    <div class="metrics-grid">
      <div class="metric-card">
        <span class="metric-label">Total Revenue</span>
        <span class="metric-value font-blue">${{ hospital.totalRevenue }}</span>
        <span class="metric-sub">Across all admissions</span>
      </div>

      <div class="metric-card">
        <span class="metric-label">Paid Revenue</span>
        <span class="metric-value font-green">${{ paidTotal }}</span>
        <span class="metric-sub">Cleared payments</span>
      </div>

      <div class="metric-card">
        <span class="metric-label">Pending Dues</span>
        <span class="metric-value font-amber">${{ pendingTotal }}</span>
        <span class="metric-sub">Awaiting settlement</span>
      </div>

      <div class="metric-card">
        <span class="metric-label">Critical / ICU Cases</span>
        <span class="metric-value font-red">{{ hospital.criticalCount }}</span>
        <span class="metric-sub">Requiring priority monitoring</span>
      </div>
    </div>

    <div class="table-card">
      <h3>Patient Invoices & Payment Ledger</h3>
      <div v-if="hospital.patients.length === 0" class="empty-state">
        No active patient billing records.
      </div>
      <div v-else class="table-container">
        <table class="billing-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Assigned Doctor</th>
              <th>Bed Type</th>
              <th>Risk</th>
              <th>Total Bill</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="patient in hospital.patients" :key="patient.id">
              <td class="font-bold">{{ patient.name }}</td>
              <td>{{ patient.doctor }}</td>
              <td>{{ patient.bedType }}</td>
              <td>
                <span :class="['badge-risk', 'badge-' + (patient.risk ? patient.risk.toLowerCase() : 'normal')]">
                  {{ patient.risk || 'Normal' }}
                </span>
              </td>
              <td class="font-bold">${{ patient.bill }}</td>
              <td>
                <span :class="['status-badge', patient.paymentStatus === 'Paid' ? 'status-paid' : 'status-pending']">
                  {{ patient.paymentStatus || 'Pending' }}
                </span>
              </td>
              <td>
                <button
                  v-if="patient.paymentStatus !== 'Paid'"
                  class="btn-settle"
                  @click="handleSettle(patient.id)"
                >
                  Mark Paid
                </button>
                <span v-else class="settled-text">Settled</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style scoped>
.billing-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h2 {
  margin: 0;
  font-size: 20px;
  color: #1a202c;
}

h3 {
  margin: 0 0 14px 0;
  font-size: 16px;
  color: #2d3748;
}

.metrics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.metric-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.metric-label {
  font-size: 13px;
  color: #718096;
  font-weight: 500;
}

.metric-value {
  font-size: 26px;
  font-weight: 700;
}

.metric-sub {
  font-size: 11px;
  color: #a0aec0;
}

.font-blue {
  color: #2b6cb0;
}

.font-green {
  color: #2f855a;
}

.font-amber {
  color: #c05621;
}

.font-red {
  color: #c53030;
}

.table-card {
  background-color: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 18px;
}

.empty-state {
  color: #718096;
  padding: 20px 0;
  text-align: center;
}

.table-container {
  overflow-x: auto;
}

.billing-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  text-align: left;
}

.billing-table th {
  background-color: #f7fafc;
  color: #4a5568;
  padding: 10px 12px;
  border-bottom: 2px solid #e2e8f0;
}

.billing-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #edf2f7;
}

.font-bold {
  font-weight: 600;
}

.badge-risk {
  font-size: 11px;
  padding: 2px 7px;
  border-radius: 10px;
  font-weight: 600;
}

.badge-high {
  background-color: #fed7d7;
  color: #9b2c2c;
}

.badge-moderate {
  background-color: #feebc8;
  color: #c05621;
}

.badge-normal {
  background-color: #c6f6d5;
  color: #22543d;
}

.status-badge {
  font-size: 11px;
  font-weight: 700;
  padding: 3px 8px;
  border-radius: 12px;
}

.status-paid {
  background-color: #c6f6d5;
  color: #22543d;
}

.status-pending {
  background-color: #feebc8;
  color: #9c4221;
}

.btn-settle {
  background-color: #3182ce;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  font-weight: 600;
}

.btn-settle:hover {
  background-color: #2b6cb0;
}

.settled-text {
  font-size: 12px;
  color: #718096;
}
</style>
