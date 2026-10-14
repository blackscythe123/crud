<script setup>
import { useRouter, RouterLink } from 'vue-router'
import { useItemStore } from '../stores/itemStore'
import ItemForm from '../components/ItemForm.vue'

const router = useRouter()
const store = useItemStore()

function handleCreate(data) {
  store.addItem({
    id: String(Date.now()),
    ...data
  })
  router.push('/')
}
</script>

<template>
  <h3>Create New Item</h3>
  <br>

  <ItemForm submit-button-text="Create Item" @submit-item="handleCreate" />

  <br>
  <RouterLink to="/">Back to List</RouterLink>
</template>
