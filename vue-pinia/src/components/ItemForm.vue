<script setup>
import { ref } from 'vue'
import { useItemStore } from '../stores/itemStore'

const store = useItemStore()

const name = ref('')
const description = ref('')
const price = ref(0)

function handleAdd() {
  if (!name.value) return
  store.addItem({
    id: String(Date.now()),
    name: name.value,
    description: description.value,
    price: Number(price.value)
  })
  name.value = ''
  description.value = ''
  price.value = 0
}
</script>

<template>
  <form @submit.prevent="handleAdd">
    <label for="pinia-name">Name:</label>
    <br>
    <input id="pinia-name" v-model="name" placeholder="Item Name" required>
    <br><br>

    <label for="pinia-description">Description:</label>
    <br>
    <input id="pinia-description" v-model="description" placeholder="Item Description" required>
    <br><br>

    <label for="pinia-price">Price:</label>
    <br>
    <input id="pinia-price" v-model.number="price" type="number" placeholder="Item Price" required>
    <br><br>

    <button type="submit">Add Item</button>
  </form>
</template>
