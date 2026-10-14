<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useItemStore } from '../stores/itemStore';

const router = useRouter();
const itemStore = useItemStore();
const searchId = ref('');

const goToSearch = () => {
  if (searchId.value) {
    router.push(`/item/${searchId.value}`);
  }
};

const goToItem = (id) => {
  router.push(`/item/${id}`);
};

const deleteItem = async (id) => {
  await itemStore.removeItem(id);
};

onMounted(() => {
  itemStore.fetchItems();
});
</script>

<template>
  <h2>Item List</h2>

  <router-link to="/add">Add New Item</router-link>
  <br><br>

  <label>Find Item by ID:</label>
  <br>
  <input v-model="searchId" placeholder="Enter Item ID" />
  <button type="button" @click="goToSearch">View Details</button>
  <br><br>

  <button type="button" @click="itemStore.fetchItems()">Refresh List</button>
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
      <tr v-for="item in itemStore.items" :key="item.id">
        <td>{{ item.id }}</td>
        <td>{{ item.name }}</td>
        <td>{{ item.description }}</td>
        <td>{{ item.price }}</td>
        <td>
          <button type="button" @click="goToItem(item.id)">View / Edit</button>
          <button type="button" @click="deleteItem(item.id)">Delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
