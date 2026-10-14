<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { items } from '../data/items'

const route = useRoute()

const item = computed(() => {
  return items.value.find(entry => entry.id === route.params.id)
})
</script>

<template>
  <h3>Item Detail</h3>
  <br>

  <div v-if="item">
    <p>ID: {{ item.id }}</p>
    <br>
    <p>Name: {{ item.name }}</p>
    <br>
    <p>Description: {{ item.description }}</p>
    <br>
    <p>Price: ${{ item.price }}</p>
  </div>

  <p v-else>Item not found.</p>

  <br>
  <RouterLink to="/">Back to List</RouterLink>
</template>
