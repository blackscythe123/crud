<script setup>
import { reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useItemStore } from '../stores/itemStore'

const route = useRoute()
const router = useRouter()
const store = useItemStore()

const item = reactive({
  id: '',
  name: '',
  description: '',
  price: 0
})

onMounted(() => {
  const found = store.getById(route.params.id)
  if (found) {
    Object.assign(item, found)
  }
})

function saveUpdate() {
  store.updateItem(item.id, {
    name: item.name,
    description: item.description,
    price: Number(item.price)
  })
  router.push('/items')
}
</script>

<template>
  <h3>Item Detail & Edit (ID: {{ route.params.id }})</h3>
  <br>

  <form @submit.prevent="saveUpdate">
    <label>Name:</label>
    <br>
    <input v-model="item.name" required>
    <br><br>

    <label>Description:</label>
    <br>
    <input v-model="item.description" required>
    <br><br>

    <label>Price:</label>
    <br>
    <input v-model.number="item.price" type="number" required>
    <br><br>

    <button type="submit">Update Item</button>
    <router-link to="/items">Back</router-link>
  </form>
</template>
