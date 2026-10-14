<script setup>
import { ref } from 'vue'
import { useRouter, RouterLink } from 'vue-router'
import { items } from '../data/items'

const router = useRouter()

const name = ref('')
const description = ref('')
const price = ref(0)

function addItem() {
  if (!name.value) return
  items.value.push({
    id: String(Date.now()),
    name: name.value,
    description: description.value,
    price: Number(price.value)
  })
  router.push('/')
}
</script>

<template>
  <h3>Create New Item</h3>
  <br>

  <form @submit.prevent="addItem">
    <label for="create-name">Name:</label>
    <br>
    <input id="create-name" v-model="name" placeholder="Item Name" required>
    <br><br>

    <label for="create-description">Description:</label>
    <br>
    <input id="create-description" v-model="description" placeholder="Item Description" required>
    <br><br>

    <label for="create-price">Price:</label>
    <br>
    <input id="create-price" v-model.number="price" type="number" placeholder="Item Price" required>
    <br><br>

    <button type="submit">Save Item</button>
  </form>

  <br>
  <RouterLink to="/">Back to List</RouterLink>
</template>
