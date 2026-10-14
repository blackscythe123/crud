<script setup>
import { ref, onMounted } from 'vue';
import ItemService from './services/ItemService';
import AnalyticsService from './services/AnalyticsService';

const items = ref([]);
const summaries = ref([]);
const isEditing = ref(false);
const form = ref({
  id: '',
  name: '',
  description: '',
  category: '',
  price: 0,
  quantity: 0
});
const searchId = ref('');
const selectedItem = ref(null);

const loadData = async () => {
  await Promise.all([loadItems(), loadAnalytics()]);
};

const loadItems = async () => {
  const res = await ItemService.getAll();
  items.value = res.data;
};

const loadAnalytics = async () => {
  const res = await AnalyticsService.getCategorySummary();
  summaries.value = res.data;
};

const saveItem = async () => {
  if (isEditing.value) {
    await ItemService.update(form.value.id, {
      name: form.value.name,
      description: form.value.description,
      category: form.value.category,
      price: form.value.price,
      quantity: form.value.quantity
    });
  } else {
    await ItemService.create({
      name: form.value.name,
      description: form.value.description,
      category: form.value.category,
      price: form.value.price,
      quantity: form.value.quantity
    });
  }
  resetForm();
  loadData();
};

const editItem = (item) => {
  isEditing.value = true;
  form.value = { ...item };
};

const resetForm = () => {
  isEditing.value = false;
  form.value = { id: '', name: '', description: '', category: '', price: 0, quantity: 0 };
};

const deleteItem = async (id) => {
  await ItemService.delete(id);
  if (selectedItem.value && selectedItem.value.id === id) {
    selectedItem.value = null;
  }
  loadData();
};

const fetchSingleItem = async (id) => {
  const targetId = id || searchId.value;
  if (!targetId) return;
  const res = await ItemService.getById(targetId);
  selectedItem.value = res.data;
};

onMounted(loadData);
</script>

<template>
  <h2>Item Management and MongoDB Aggregation Analytics</h2>

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

    <label>Category:</label>
    <br>
    <input v-model="form.category" placeholder="Category" required />
    <br><br>

    <label>Price:</label>
    <br>
    <input v-model.number="form.price" type="number" step="0.01" placeholder="Price" required />
    <br><br>

    <label>Quantity:</label>
    <br>
    <input v-model.number="form.quantity" type="number" placeholder="Quantity" required />
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
    Category: {{ selectedItem.category }}
    <br>
    Price: {{ selectedItem.price }}
    <br>
    Quantity: {{ selectedItem.quantity }}
    <br>
    <button type="button" @click="selectedItem = null">Close Details</button>
  </div>

  <hr>

  <h3>Aggregation Analytics: Category Summary</h3>
  <button type="button" @click="loadAnalytics">Refresh Analytics</button>
  <br><br>

  <table>
    <thead>
      <tr>
        <th>Category</th>
        <th>Total Price</th>
        <th>Average Price</th>
        <th>Total Quantity</th>
        <th>Item Count</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="summary in summaries" :key="summary.category">
        <td>{{ summary.category }}</td>
        <td>{{ summary.totalPrice }}</td>
        <td>{{ summary.avgPrice }}</td>
        <td>{{ summary.totalQuantity }}</td>
        <td>{{ summary.count }}</td>
      </tr>
    </tbody>
  </table>

  <hr>

  <h3>Items List</h3>
  <button type="button" @click="loadData">Refresh All</button>
  <br><br>

  <table>
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Description</th>
        <th>Category</th>
        <th>Price</th>
        <th>Quantity</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.price }}</td>
        <td>{{ item.quantity }}</td>
        <td>
          <button type="button" @click="fetchSingleItem(item.id)">View</button>
          <button type="button" @click="editItem(item)">Edit</button>
          <button type="button" @click="deleteItem(item.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
