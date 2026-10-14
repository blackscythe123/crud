<script setup>
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
    <button @click="handleDelete">Delete</button>
  </div>
</template>
