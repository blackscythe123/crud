<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-item'])

const name = ref('')
const description = ref('')
const price = ref(0)

function handleSubmit() {
  if (!name.value) return
  emit('add-item', {
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
  <form @submit.prevent="handleSubmit">
    <label for="item-name">Name:</label>
    <br>
    <input id="item-name" v-model="name" placeholder="Item Name" required>
    <br><br>

    <label for="item-description">Description:</label>
    <br>
    <input id="item-description" v-model="description" placeholder="Item Description" required>
    <br><br>

    <label for="item-price">Price:</label>
    <br>
    <input id="item-price" v-model.number="price" type="number" placeholder="Item Price" required>
    <br><br>

    <button type="submit">Add Item</button>
  </form>
</template>
