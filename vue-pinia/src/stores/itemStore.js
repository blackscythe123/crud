import { defineStore } from 'pinia'

export const useItemStore = defineStore('items', {
  state: () => ({
    items: [
      { id: '1', name: 'Desk Chair', description: 'Ergonomic mesh chair', price: 150 },
      { id: '2', name: 'Monitor Stand', description: 'Dual monitor arm', price: 45 }
    ]
  }),
  getters: {
    totalCount: (state) => state.items.length
  },
  actions: {
    addItem(item) {
      this.items.push(item)
    },
    updateItem(id, updatedFields) {
      const index = this.items.findIndex(item => item.id === id)
      if (index !== -1) {
        this.items[index] = { ...this.items[index], ...updatedFields }
      }
    },
    deleteItem(id) {
      this.items = this.items.filter(item => item.id !== id)
    }
  }
})
