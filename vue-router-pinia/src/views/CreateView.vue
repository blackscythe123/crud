<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useItemStore } from '../stores/itemStore'

const router = useRouter()
const store = useItemStore()

const form = reactive({
  id: '',
  name: '',
  description: '',
  price: 0
})

function submit() {
  store.addItem({
    id: form.id || Date.now().toString(),
    name: form.name,
    description: form.description,
    price: Number(form.price)
  })
  router.push('/items')
}
</script>

<template>
  <h3>Add New Item</h3>
  <br>
  <form @submit.prevent="submit">
    <label>Custom ID (Optional):</label>
    <br>
    <input v-model="form.id" placeholder="ID (e.g. 101)">
    <br><br>

    <label>Name:</label>
    <br>
    <input v-model="form.name" placeholder="Item Name" required>
    <br><br>

    <label>Description:</label>
    <br>
    <input v-model="form.description" placeholder="Description" required>
    <br><br>

    <label>Price:</label>
    <br>
    <input v-model.number="form.price" type="number" placeholder="Price" required>
    <br><br>

    <button type="submit">Save to Pinia Store</button>
  </form>
</template>
