<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  initialItem: {
    type: Object,
    default: () => ({ name: '', description: '', price: 0 })
  },
  submitButtonText: {
    type: String,
    default: 'Save'
  }
})

const emit = defineEmits(['submit-item'])

const name = ref(props.initialItem.name || '')
const description = ref(props.initialItem.description || '')
const price = ref(props.initialItem.price || 0)

watch(() => props.initialItem, (val) => {
  if (val) {
    name.value = val.name || ''
    description.value = val.description || ''
    price.value = val.price || 0
  }
})

function handleSubmit() {
  if (!name.value) return
  emit('submit-item', {
    name: name.value,
    description: description.value,
    price: Number(price.value)
  })
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <label for="form-name">Name:</label>
    <br>
    <input id="form-name" v-model="name" placeholder="Item Name" required>
    <br><br>

    <label for="form-desc">Description:</label>
    <br>
    <input id="form-desc" v-model="description" placeholder="Item Description" required>
    <br><br>

    <label for="form-price">Price:</label>
    <br>
    <input id="form-price" v-model.number="price" type="number" placeholder="Item Price" required>
    <br><br>

    <button type="submit">{{ submitButtonText }}</button>
  </form>
</template>
