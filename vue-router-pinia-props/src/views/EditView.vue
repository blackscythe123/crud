<script setup>
import { computed } from 'vue'
import { useRoute, useRouter, RouterLink } from 'vue-router'
import { useItemStore } from '../stores/itemStore'
import ItemForm from '../components/ItemForm.vue'

const route = useRoute()
const router = useRouter()
const store = useItemStore()

const item = computed(() => {
  return store.getItemById(route.params.id)
})

function handleUpdate(data) {
  store.updateItem(route.params.id, data)
  router.push('/')
}
</script>

<template>
  <h3>Edit Item</h3>
  <br>

  <div v-if="item">
    <ItemForm :initial-item="item" submit-button-text="Update Item" @submit-item="handleUpdate" />
  </div>

  <p v-else>Item not found.</p>

  <br>
  <RouterLink to="/">Back to List</RouterLink>
</template>
