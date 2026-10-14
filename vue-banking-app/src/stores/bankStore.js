import { defineStore } from 'pinia'

export const useBankStore = defineStore('bank', {
  state: () => ({
    accountNumber: 'ACC-892144',
    accountHolder: 'John Doe',
    accountType: 'Savings Account',
    balance: 5000,
    transactions: [
      { id: 1, type: 'DEPOSIT', amount: 5000, balanceAfter: 5000, date: new Date().toLocaleDateString() }
    ]
  }),
  getters: {
    transactionCount: (state) => state.transactions.length
  },
  actions: {
    deposit(amount) {
      const val = parseFloat(amount)
      if (isNaN(val) || val <= 0) return { success: false, message: 'Invalid deposit amount' }

      this.balance += val
      this.transactions.unshift({
        id: Date.now(),
        type: 'DEPOSIT',
        amount: val,
        balanceAfter: this.balance,
        date: new Date().toLocaleDateString()
      })
      return { success: true, message: 'Deposit successful!' }
    },

    withdraw(amount) {
      const val = parseFloat(amount)
      if (isNaN(val) || val <= 0) return { success: false, message: 'Invalid withdrawal amount' }
      if (val > this.balance) return { success: false, message: 'Insufficient balance!' }

      this.balance -= val
      this.transactions.unshift({
        id: Date.now(),
        type: 'WITHDRAWAL',
        amount: val,
        balanceAfter: this.balance,
        date: new Date().toLocaleDateString()
      })
      return { success: true, message: 'Withdrawal successful!' }
    }
  }
})
