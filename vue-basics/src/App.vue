<script setup>
import { ref, reactive, computed } from 'vue'

const items = ref([
  { id: '1', name: 'Notebook', description: 'Spiral ruled notebook', price: 15 },
  { id: '2', name: 'Pen', description: 'Blue gel pen', price: 5 }
])

const form = reactive({
  name: '',
  description: '',
  price: 0
})

const itemCount = computed(() => {
  return items.value.length
})

const totalPrice = computed(() => {
  return items.value.reduce((sum, item) => sum + Number(item.price), 0)
})

function addItem() {
  if (!form.name) return
  items.value.push({
    id: String(Date.now()),
    name: form.name,
    description: form.description,
    price: Number(form.price)
  })
  form.name = ''
  form.description = ''
  form.price = 0
}

function deleteItem(id) {
  items.value = items.value.filter(item => item.id !== id)
}
</script>

<template>
  <h2>Vue Basics CRUD</h2>
  <br>

  <form @submit.prevent="addItem">
    <label for="name">Name:</label>
    <br>
    <input id="name" v-model="form.name" placeholder="Item Name" required>
    <br><br>

    <label for="description">Description:</label>
    <br>
    <input id="description" v-model="form.description" placeholder="Item Description" required>
    <br><br>

    <label for="price">Price:</label>
    <br>
    <input id="price" v-model.number="form.price" type="number" placeholder="Item Price" required>
    <br><br>

    <button type="submit">Add Item</button>
  </form>

  <br>
  <hr>
  <br>

  <h3>Item Statistics</h3>
  <br>
  <p>Total Items: {{ itemCount }}</p>
  <br>
  <p>Total Price: ${{ totalPrice }}</p>

  <br>
  <hr>
  <br>

  <h3>Items List</h3>
  <br>

  <p v-if="items.length === 0">No items available.</p>

  <ul v-if="items.length > 0">
    <li v-for="item in items" :key="item.id">
      <span>{{ item.name }} - {{ item.description }} - ${{ item.price }}</span>
      <br><br>
      <button @click="deleteItem(item.id)">Delete</button>
      <br><br>
    </li>
  </ul>
</template>
