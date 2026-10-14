<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['delete-item'])

function handleDelete() {
  emit('delete-item', props.item.id)
}
</script>

<template>
  <div>
    <strong>{{ item.name }}</strong>
    <br>
    <span>Description: {{ item.description }}</span>
    <br>
    <span>Price: ${{ item.price }}</span>
    <br><br>

    <RouterLink :to="'/item/' + item.id">View Details</RouterLink>
    <br><br>
    <RouterLink :to="'/edit/' + item.id">Edit</RouterLink>
    <br><br>
    <button @click="handleDelete">Delete</button>
  </div>
</template>
