<script setup>
import { ref, onMounted } from 'vue';
import ItemService from './services/ItemService';

const items = ref([]);
const isEditing = ref(false);
const form = ref({
  id: '',
  name: '',
  description: '',
  price: 0
});
const searchId = ref('');
const selectedItem = ref(null);

const loadItems = async () => {
  const res = await ItemService.getAll();
  items.value = res.data;
};

const saveItem = async () => {
  if (isEditing.value) {
    await ItemService.update(form.value.id, {
      name: form.value.name,
      description: form.value.description,
      price: form.value.price
    });
  } else {
    await ItemService.create({
      name: form.value.name,
      description: form.value.description,
      price: form.value.price
    });
  }
  resetForm();
  loadItems();
};

const editItem = (item) => {
  isEditing.value = true;
  form.value = { ...item };
};

const resetForm = () => {
  isEditing.value = false;
  form.value = { id: '', name: '', description: '', price: 0 };
};

const deleteItem = async (id) => {
  await ItemService.delete(id);
  if (selectedItem.value && selectedItem.value.id === id) {
    selectedItem.value = null;
  }
  loadItems();
};

const fetchSingleItem = async (id) => {
  const targetId = id || searchId.value;
  if (!targetId) return;
  const res = await ItemService.getById(targetId);
  selectedItem.value = res.data;
};

onMounted(loadItems);
</script>

<template>
  <h2>Item Management</h2>

  <h3>{{ isEditing ? 'Edit Item' : 'Add New Item' }}</h3>
  <form @submit.prevent="saveItem">
    <label>Name:</label>
    <br>
    <input v-model="form.name" placeholder="Name" required />
    <br><br>

    <label>Description:</label>
    <br>
    <input v-model="form.description" placeholder="Description" required />
    <br><br>

    <label>Price:</label>
    <br>
    <input v-model.number="form.price" type="number" step="0.01" placeholder="Price" required />
    <br><br>

    <button type="submit">{{ isEditing ? 'Update Item' : 'Create Item' }}</button>
    <button type="button" v-if="isEditing" @click="resetForm">Cancel</button>
  </form>

  <hr>

  <h3>Fetch Single Item By ID</h3>
  <input v-model="searchId" placeholder="Enter Item ID" />
  <button type="button" @click="fetchSingleItem(searchId)">Fetch Detail</button>

  <div v-if="selectedItem">
    <br>
    <b>Item Details:</b>
    <br>
    ID: {{ selectedItem.id }}
    <br>
    Name: {{ selectedItem.name }}
    <br>
    Description: {{ selectedItem.description }}
    <br>
    Price: {{ selectedItem.price }}
    <br>
    <button type="button" @click="selectedItem = null">Close Details</button>
  </div>

  <hr>

  <h3>Item List</h3>
  <button type="button" @click="loadItems">Refresh List</button>
  <br><br>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.price }}</td>
        <td>
          <button type="button" @click="fetchSingleItem(item.id)">View</button>
          <button type="button" @click="editItem(item)">Edit</button>
          <button type="button" @click="deleteItem(item.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
