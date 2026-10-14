<script setup>
import { computed } from 'vue'
import { useBankStore } from '../stores/bankStore'

const bank = useBankStore()

const totalDeposits = computed(() => {
  return bank.transactions
    .filter(tx => tx.type === 'DEPOSIT')
    .reduce((sum, tx) => sum + tx.amount, 0)
})

const totalWithdrawals = computed(() => {
  return bank.transactions
    .filter(tx => tx.type === 'WITHDRAWAL')
    .reduce((sum, tx) => sum + tx.amount, 0)
})
</script>

<template>
  <div class="statement-card">
    <div class="header-row">
      <h2>Account Statement</h2>
      <router-link to="/" class="btn btn-back">Back to Dashboard</router-link>
    </div>

    <div class="summary-cards">
      <div class="summary-box deposits">
        <span>Total Deposits</span>
        <strong>${{ totalDeposits.toFixed(2) }}</strong>
      </div>
      <div class="summary-box withdrawals">
        <span>Total Withdrawals</span>
        <strong>${{ totalWithdrawals.toFixed(2) }}</strong>
      </div>
      <div class="summary-box balance">
        <span>Current Balance</span>
        <strong>${{ bank.balance.toFixed(2) }}</strong>
      </div>
    </div>

    <div class="table-container">
      <table class="statement-table" v-if="bank.transactions.length">
        <thead>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Balance After</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tx in bank.transactions" :key="tx.id">
            <td>{{ tx.date }}</td>
            <td :class="tx.type === 'DEPOSIT' ? 'type-deposit' : 'type-withdrawal'">{{ tx.type }}</td>
            <td>${{ tx.amount.toFixed(2) }}</td>
            <td>${{ tx.balanceAfter.toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
      <p v-else class="empty-state">No transactions recorded yet.</p>
    </div>
  </div>
</template>

<style scoped>
.statement-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #fafafa;
}

.header-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.summary-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
}

.summary-box {
  padding: 12px;
  border-radius: 6px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.summary-box.deposits {
  background-color: #e8f8f5;
  border: 1px solid #a3e4d7;
  color: #16a085;
}

.summary-box.withdrawals {
  background-color: #fdebd0;
  border: 1px solid #f8c471;
  color: #d35400;
}

.summary-box.balance {
  background-color: #ebf5fb;
  border: 1px solid #aed6f1;
  color: #2980b9;
}

.summary-box span {
  font-size: 13px;
  color: #555;
}

.summary-box strong {
  font-size: 18px;
}

.table-container {
  overflow-x: auto;
}

.statement-table {
  width: 100%;
  border-collapse: collapse;
}

.statement-table th,
.statement-table td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.statement-table th {
  background-color: #f2f2f2;
}

.type-deposit {
  color: #27ae60;
  font-weight: bold;
}

.type-withdrawal {
  color: #c0392b;
  font-weight: bold;
}

.btn {
  padding: 8px 14px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
}

.btn-back {
  background-color: #7f8c8d;
  color: white;
}

.empty-state {
  text-align: center;
  color: #777;
  padding: 20px;
}
</style>
