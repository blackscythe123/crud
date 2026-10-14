<script setup>
import { ref } from 'vue'
import ItemForm from './components/ItemForm.vue'
import ItemCard from './components/ItemCard.vue'

const items = ref([
  { id: '1', name: 'Desk Lamp', description: 'LED study lamp', price: 20 },
  { id: '2', name: 'Notebook', description: 'Spiral notebook', price: 8 }
])

function addItem(newItem) {
  items.value.push({
    id: String(Date.now()),
    ...newItem
  })
}

function deleteItem(id) {
  items.value = items.value.filter(item => item.id !== id)
}
</script>

<template>
  <h2>Vue Props and Emits CRUD</h2>
  <br>

  <ItemForm @add-item="addItem" />

  <br>
  <hr>
  <br>

  <h3>Items List</h3>
  <br>

  <p v-if="items.length === 0">No items available.</p>

  <div v-for="item in items" :key="item.id">
    <ItemCard :item="item" @delete-item="deleteItem" />
    <br>
    <hr>
    <br>
  </div>
</template>
