import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useItemStore = defineStore('items', () => {
  const items = ref([
    { id: '1', name: 'Item 1', description: 'First item', price: 10 },
    { id: '2', name: 'Item 2', description: 'Second item', price: 20 }
  ])

  function addItem(item) {
    items.value.push(item)
  }

  function updateItem(id, updated) {
    const idx = items.value.findIndex(i => i.id === id)
    if (idx !== -1) {
      items.value[idx] = { ...items.value[idx], ...updated }
    }
  }

  function deleteItem(id) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function getById(id) {
    return items.value.find(i => i.id === id)
  }

  return { items, addItem, updateItem, deleteItem, getById }
})
