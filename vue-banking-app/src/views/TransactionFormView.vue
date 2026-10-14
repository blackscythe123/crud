<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useBankStore } from '../stores/bankStore'

const bank = useBankStore()
const router = useRouter()

const txType = ref('DEPOSIT')
const amount = ref('')
const feedback = ref({ text: '', isError: false })

function handleSubmit() {
  feedback.value = { text: '', isError: false }

  let res
  if (txType.value === 'DEPOSIT') {
    res = bank.deposit(amount.value)
  } else {
    res = bank.withdraw(amount.value)
  }

  if (res.success) {
    feedback.value = { text: res.message, isError: false }
    amount.value = ''
    setTimeout(() => {
      router.push('/statement')
    }, 1000)
  } else {
    feedback.value = { text: res.message, isError: true }
  }
}
</script>

<template>
  <div class="tx-card">
    <h2>Make a Transaction</h2>
    <p>Current Balance: <strong>${{ bank.balance.toFixed(2) }}</strong></p>

    <div v-if="feedback.text" :class="['alert', feedback.isError ? 'alert-danger' : 'alert-success']">
      {{ feedback.text }}
    </div>

    <form @submit.prevent="handleSubmit" class="tx-form">
      <div class="form-group">
        <label>Transaction Type:</label>
        <div class="radio-row">
          <label>
            <input type="radio" value="DEPOSIT" v-model="txType" /> Deposit
          </label>
          <label>
            <input type="radio" value="WITHDRAWAL" v-model="txType" /> Withdrawal
          </label>
        </div>
      </div>

      <div class="form-group">
        <label for="amt">Amount ($):</label>
        <input id="amt" type="number" step="0.01" min="1" v-model="amount" placeholder="e.g. 250.00" required />
      </div>

      <div class="btn-row">
        <button type="submit" class="btn btn-submit">Confirm {{ txType }}</button>
        <router-link to="/" class="btn btn-back">Cancel</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
.tx-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 20px;
  background-color: #fafafa;
}

.alert {
  padding: 10px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.alert-success {
  background-color: #d4edda;
  color: #155724;
}

.alert-danger {
  background-color: #f8d7da;
  color: #721c24;
}

.tx-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.radio-row {
  display: flex;
  gap: 20px;
}

input[type="number"] {
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn-row {
  display: flex;
  gap: 10px;
  margin-top: 10px;
}

.btn {
  padding: 10px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  font-weight: bold;
}

.btn-submit {
  background-color: #27ae60;
  color: white;
}

.btn-back {
  background-color: #95a5a6;
  color: white;
  display: inline-flex;
  align-items: center;
}
</style>
