<script setup>
import { ref, reactive, onMounted } from 'vue'

const API_URL = 'http://localhost:8080/api/items'

const items = ref([])
const loading = ref(false)
const errorMessage = ref('')

const searchId = ref('')
const selectedItem = ref(null)

const createForm = reactive({
  name: '',
  description: '',
  price: 0
})

const editForm = reactive({
  id: '',
  name: '',
  description: '',
  price: 0
})

async function fetchAll() {
  loading.value = true
  errorMessage.value = ''
  try {
    const res = await fetch(API_URL)
    if (!res.ok) throw new Error('Failed to fetch items: ' + res.statusText)
    items.value = await res.json()
  } catch (err) {
    errorMessage.value = err.message
  } finally {
    loading.value = false
  }
}

async function fetchById(id) {
  if (!id) return
  loading.value = true
  errorMessage.value = ''
  try {
    const res = await fetch(API_URL + '/' + id)
    if (!res.ok) throw new Error('Failed to fetch item ' + id + ': ' + res.statusText)
    selectedItem.value = await res.json()
  } catch (err) {
    errorMessage.value = err.message
  } finally {
    loading.value = false
  }
}

async function createItem() {
  if (!createForm.name) return
  loading.value = true
  errorMessage.value = ''
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: createForm.name,
        description: createForm.description,
        describtion: createForm.description,
        price: Number(createForm.price)
      })
    })
    if (!res.ok) throw new Error('Failed to create item: ' + res.statusText)
    createForm.name = ''
    createForm.description = ''
    createForm.price = 0
    await fetchAll()
  } catch (err) {
    errorMessage.value = err.message
  } finally {
    loading.value = false
  }
}

async function updateItem() {
  if (!editForm.id) return
  loading.value = true
  errorMessage.value = ''
  try {
    const res = await fetch(API_URL + '/' + editForm.id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: editForm.id,
        name: editForm.name,
        description: editForm.description,
        describtion: editForm.description,
        price: Number(editForm.price)
      })
    })
    if (!res.ok) throw new Error('Failed to update item: ' + res.statusText)
    editForm.id = ''
    editForm.name = ''
    editForm.description = ''
    editForm.price = 0
    await fetchAll()
  } catch (err) {
    errorMessage.value = err.message
  } finally {
    loading.value = false
  }
}

async function deleteItem(id) {
  loading.value = true
  errorMessage.value = ''
  try {
    const res = await fetch(API_URL + '/' + id, {
      method: 'DELETE'
    })
    if (!res.ok) throw new Error('Failed to delete item: ' + res.statusText)
    if (selectedItem.value && selectedItem.value.id === id) {
      selectedItem.value = null
    }
    await fetchAll()
  } catch (err) {
    errorMessage.value = err.message
  } finally {
    loading.value = false
  }
}

function startEdit(item) {
  editForm.id = item.id
  editForm.name = item.name
  editForm.description = item.description || item.describtion || ''
  editForm.price = item.price
}

function cancelEdit() {
  editForm.id = ''
  editForm.name = ''
  editForm.description = ''
  editForm.price = 0
}

onMounted(() => {
  fetchAll()
})
</script>

<template>
  <h2>Vue Fetch CRUD</h2>
  <br>

  <p v-if="loading">Loading...</p>
  <br v-if="loading">

  <p v-if="errorMessage">{{ errorMessage }}</p>
  <br v-if="errorMessage">

  <button @click="fetchAll">Refresh All (GET /api/items)</button>
  <br><br>
  <hr>
  <br>

  <h3>Create Item (POST /api/items)</h3>
  <br>
  <form @submit.prevent="createItem">
    <label for="create-name">Name:</label>
    <br>
    <input id="create-name" v-model="createForm.name" placeholder="Item Name" required>
    <br><br>

    <label for="create-desc">Description:</label>
    <br>
    <input id="create-desc" v-model="createForm.description" placeholder="Item Description" required>
    <br><br>

    <label for="create-price">Price:</label>
    <br>
    <input id="create-price" v-model.number="createForm.price" type="number" placeholder="Item Price" required>
    <br><br>

    <button type="submit">Create Item</button>
  </form>

  <br>
  <hr>
  <br>

  <h3>Update Item (PUT /api/items/:id)</h3>
  <br>
  <form @submit.prevent="updateItem">
    <label for="edit-id">Item ID:</label>
    <br>
    <input id="edit-id" v-model="editForm.id" placeholder="Item ID" required>
    <br><br>

    <label for="edit-name">Name:</label>
    <br>
    <input id="edit-name" v-model="editForm.name" placeholder="Item Name" required>
    <br><br>

    <label for="edit-desc">Description:</label>
    <br>
    <input id="edit-desc" v-model="editForm.description" placeholder="Item Description" required>
    <br><br>

    <label for="edit-price">Price:</label>
    <br>
    <input id="edit-price" v-model.number="editForm.price" type="number" placeholder="Item Price" required>
    <br><br>

    <button type="submit">Update Item</button>
    <button type="button" @click="cancelEdit">Clear</button>
  </form>

  <br>
  <hr>
  <br>

  <h3>Get Item By ID (GET /api/items/:id)</h3>
  <br>
  <input v-model="searchId" placeholder="Enter Item ID">
  <br><br>
  <button @click="fetchById(searchId)">Fetch By ID</button>
  <br><br>

  <div v-if="selectedItem">
    <h4>Item Details</h4>
    <p>ID: {{ selectedItem.id }}</p>
    <br>
    <p>Name: {{ selectedItem.name }}</p>
    <br>
    <p>Description: {{ selectedItem.description || selectedItem.describtion }}</p>
    <br>
    <p>Price: ${{ selectedItem.price }}</p>
    <br>
    <button @click="selectedItem = null">Close Details</button>
  </div>

  <br>
  <hr>
  <br>

  <h3>Items List (GET /api/items)</h3>
  <br>

  <p v-if="items.length === 0">No items loaded.</p>

  <ul v-if="items.length > 0">
    <li v-for="item in items" :key="item.id">
      <span>{{ item.name }} - {{ item.description || item.describtion }} - ${{ item.price }} (ID: {{ item.id }})</span>
      <br><br>
      <button @click="fetchById(item.id)">View Details</button>
      <button @click="startEdit(item)">Edit</button>
      <button @click="deleteItem(item.id)">Delete</button>
      <br><br>
    </li>
  </ul>
</template>
