<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { useItemStore } from '../stores/itemStore'

const route = useRoute()
const store = useItemStore()

const item = computed(() => {
  return store.getItemById(route.params.id)
})
</script>

<template>
  <h3>Item Details</h3>
  <br>

  <div v-if="item">
    <p>ID: {{ item.id }}</p>
    <br>
    <p>Name: {{ item.name }}</p>
    <br>
    <p>Description: {{ item.description }}</p>
    <br>
    <p>Price: ${{ item.price }}</p>
    <br>
    <RouterLink :to="'/edit/' + item.id">Edit This Item</RouterLink>
  </div>

  <p v-else>Item not found.</p>

  <br><br>
  <RouterLink to="/">Back to List</RouterLink>
</template>
