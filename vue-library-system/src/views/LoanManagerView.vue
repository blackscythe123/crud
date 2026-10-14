<script setup>
import { ref } from 'vue'
import { useLibraryStore } from '../stores/libraryStore'

const libraryStore = useLibraryStore()

const daysLateMap = ref({})
const message = ref('')

function handleReturn(recordId) {
  const daysLate = daysLateMap.value[recordId] || 0
  const success = libraryStore.returnBook(recordId, daysLate)
  if (success) {
    const fineCalculated = Math.max(0, Number(daysLate) || 0) * 2
    if (fineCalculated > 0) {
      message.value = `Book returned with ${daysLate} day(s) overdue. Fine assessed: $${fineCalculated}.`
    } else {
      message.value = 'Book returned on time. No fine assessed.'
    }
  }
  setTimeout(() => {
    message.value = ''
  }, 4000)
}
</script>

<template>
  <div class="loans-page">
    <div class="stats-bar">
      <div class="stat-card">
        <span class="stat-num">{{ libraryStore.activeLoansCount }}</span>
        <span class="stat-label">Active Loans</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">{{ libraryStore.borrowedRecords.length }}</span>
        <span class="stat-label">Total Loan Records</span>
      </div>
      <div class="stat-card">
        <span class="stat-num fine-text">${{ libraryStore.totalFines }}</span>
        <span class="stat-label">Total Fines Collected</span>
      </div>
    </div>

    <div v-if="message" class="alert-box">
      {{ message }}
    </div>

    <div class="table-card">
      <div class="card-header">
        <h2>Loan Records & Fine Calculation</h2>
        <span class="rate-badge">Rate: $2.00 / day overdue</span>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Member ID</th>
            <th>Book Title</th>
            <th>Issue Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Fine Assessed</th>
            <th>Days Late</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="record in libraryStore.borrowedRecords"
            :key="record.id"
            :class="{ 'row-returned': record.returned }"
          >
            <td>#{{ record.id }}</td>
            <td><code>{{ record.memberId }}</code></td>
            <td class="font-bold">{{ record.bookTitle }}</td>
            <td>{{ record.issueDate }}</td>
            <td>{{ record.returnDue }}</td>
            <td>
              <span :class="['status-badge', record.returned ? 'returned' : 'active']">
                {{ record.returned ? 'Returned' : 'Active' }}
              </span>
            </td>
            <td>
              <span :class="['fine-badge', record.fine > 0 ? 'has-fine' : 'zero-fine']">
                ${{ record.fine }}
              </span>
            </td>
            <td>
              <template v-if="!record.returned">
                <input
                  v-model.number="daysLateMap[record.id]"
                  type="number"
                  min="0"
                  placeholder="0"
                  class="days-input"
                />
              </template>
              <template v-else>
                <span class="text-muted">-</span>
              </template>
            </td>
            <td>
              <button
                v-if="!record.returned"
                class="btn-return"
                @click="handleReturn(record.id)"
              >
                Return Book
              </button>
              <span v-else class="text-muted">Completed</span>
            </td>
          </tr>
          <tr v-if="libraryStore.borrowedRecords.length === 0">
            <td colspan="9" class="text-center">No loan records available.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.loans-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stats-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 15px;
}

.stat-card {
  background: white;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-num {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
}

.stat-num.fine-text {
  color: #b91c1c;
}

.stat-label {
  font-size: 13px;
  color: #64748b;
  margin-top: 4px;
}

.alert-box {
  background-color: #eff6ff;
  color: #1e40af;
  border: 1px solid #bfdbfe;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
}

.table-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 20px;
  overflow-x: auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-header h2 {
  margin: 0;
  font-size: 18px;
  color: #1e293b;
}

.rate-badge {
  background-color: #fef2f2;
  color: #991b1b;
  border: 1px solid #fecaca;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  text-align: left;
}

.data-table th,
.data-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #e2e8f0;
}

.data-table th {
  background-color: #f8fafc;
  color: #475569;
  font-weight: 600;
}

.row-returned {
  background-color: #fafafa;
}

.font-bold {
  font-weight: 600;
}

.status-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.active {
  background-color: #fef3c7;
  color: #92400e;
}

.status-badge.returned {
  background-color: #e2e8f0;
  color: #475569;
}

.fine-badge {
  display: inline-block;
  font-weight: 600;
  padding: 2px 6px;
  border-radius: 4px;
}

.fine-badge.has-fine {
  background-color: #fee2e2;
  color: #b91c1c;
}

.fine-badge.zero-fine {
  color: #64748b;
}

.days-input {
  width: 60px;
  padding: 4px 6px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 13px;
}

.btn-return {
  background-color: #10b981;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 500;
}

.btn-return:hover {
  background-color: #059669;
}

.text-muted {
  color: #94a3b8;
  font-size: 13px;
}

.text-center {
  text-align: center;
  color: #64748b;
  padding: 20px 0;
}
</style>
