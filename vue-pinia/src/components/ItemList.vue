<script setup>
import { ref } from 'vue'
import { useItemStore } from '../stores/itemStore'

const store = useItemStore()

const editingId = ref(null)
const editName = ref('')
const editDescription = ref('')
const editPrice = ref(0)

function startEdit(item) {
  editingId.value = item.id
  editName.value = item.name
  editDescription.value = item.description
  editPrice.value = item.price
}

function cancelEdit() {
  editingId.value = null
}

function saveEdit(id) {
  store.updateItem(id, {
    name: editName.value,
    description: editDescription.value,
    price: Number(editPrice.value)
  })
  editingId.value = null
}
</script>

<template>
  <div>
    <p>Total Items in Store: {{ store.totalCount }}</p>
    <br>

    <p v-if="store.items.length === 0">No items available in store.</p>

    <ul v-if="store.items.length > 0">
      <li v-for="item in store.items" :key="item.id">
        <div v-if="editingId === item.id">
          <label>Edit Name:</label>
          <br>
          <input v-model="editName" placeholder="Name">
          <br><br>

          <label>Edit Description:</label>
          <br>
          <input v-model="editDescription" placeholder="Description">
          <br><br>

          <label>Edit Price:</label>
          <br>
          <input v-model.number="editPrice" type="number" placeholder="Price">
          <br><br>

          <button @click="saveEdit(item.id)">Save</button>
          <button @click="cancelEdit">Cancel</button>
        </div>

        <div v-else>
          <span>{{ item.name }} - {{ item.description }} - ${{ item.price }}</span>
          <br><br>
          <button @click="startEdit(item)">Edit</button>
          <button @click="store.deleteItem(item.id)">Delete</button>
        </div>
        <br>
      </li>
    </ul>
  </div>
</template>
