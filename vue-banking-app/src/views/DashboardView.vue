<script setup>
import { useBankStore } from '../stores/bankStore'

const bank = useBankStore()
</script>

<template>
  <div class="dashboard-card">
    <h2>Account Overview</h2>
    <div class="info-row">
      <span>Account Holder:</span>
      <strong>{{ bank.accountHolder }}</strong>
    </div>
    <div class="info-row">
      <span>Account Number:</span>
      <strong>{{ bank.accountNumber }}</strong>
    </div>
    <div class="info-row">
      <span>Account Type:</span>
      <strong>{{ bank.accountType }}</strong>
    </div>
    <div class="balance-box">
      <span>Available Balance</span>
      <h3 class="balance-val">${{ bank.balance.toFixed(2) }}</h3>
    </div>

    <div class="quick-actions">
      <router-link to="/transaction" class="btn btn-primary">Deposit / Withdraw</router-link>
      <router-link to="/statement" class="btn btn-secondary">View Statement ({{ bank.transactionCount }})</router-link>
    </div>
  </div>
</template>

<style scoped>
.dashboard-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #fafafa;
}

.info-row {
  display: flex;
  justify-content: space-between;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.balance-box {
  margin: 20px 0;
  padding: 15px;
  background-color: #e8f8f5;
  border: 1px solid #a3e4d7;
  border-radius: 6px;
  text-align: center;
}

.balance-val {
  color: #16a085;
  font-size: 28px;
  margin: 5px 0 0 0;
}

.quick-actions {
  display: flex;
  gap: 10px;
  margin-top: 15px;
}

.btn {
  flex: 1;
  text-align: center;
  padding: 10px;
  border-radius: 4px;
  text-decoration: none;
  font-weight: bold;
}

.btn-primary {
  background-color: #2980b9;
  color: white;
}

.btn-secondary {
  background-color: #7f8c8d;
  color: white;
}
</style>
