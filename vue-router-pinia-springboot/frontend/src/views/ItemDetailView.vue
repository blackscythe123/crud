<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useItemStore } from '../stores/itemStore';

const route = useRoute();
const router = useRouter();
const itemStore = useItemStore();

const id = route.params.id;
const item = ref(null);
const form = ref({
  name: '',
  description: '',
  price: 0
});

const loadItem = async () => {
  const data = await itemStore.fetchItemById(id);
  if (data) {
    item.value = data;
    form.value = {
      name: data.name,
      description: data.description,
      price: data.price
    };
  }
};

const updateItem = async () => {
  await itemStore.editItem(id, {
    name: form.value.name,
    description: form.value.description,
    price: form.value.price
  });
  router.push('/');
};

const deleteCurrentItem = async () => {
  await itemStore.removeItem(id);
  router.push('/');
};

onMounted(loadItem);
</script>

<template>
  <h2>Item Details and Edit</h2>

  <router-link to="/">Back to List</router-link>
  <br><br>

  <div v-if="item">
    <h3>Item Details</h3>
    ID: {{ item.id }}
    <br>
    Name: {{ item.name }}
    <br>
    Description: {{ item.description }}
    <br>
    Price: {{ item.price }}
    <br><br>

    <h3>Edit Item</h3>
    <form @submit.prevent="updateItem">
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

      <button type="submit">Update Item</button>
      <button type="button" @click="deleteCurrentItem">Delete Item</button>
    </form>
  </div>
  <div v-else>
    <p>Item not found or loading...</p>
  </div>
</template>
