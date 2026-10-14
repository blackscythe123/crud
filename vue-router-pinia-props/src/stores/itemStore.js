import { defineStore } from 'pinia'

export const useItemStore = defineStore('items', {
  state: () => ({
    items: [
      { id: '1', name: 'Desk', description: 'Standing desk', price: 299 },
      { id: '2', name: 'Lamp', description: 'LED desk light', price: 35 }
    ]
  }),
  getters: {
    totalCount: (state) => state.items.length,
    getItemById: (state) => (id) => state.items.find(item => item.id === id)
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
