<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useItemStore } from '../stores/itemStore';

const router = useRouter();
const itemStore = useItemStore();

const form = ref({
  name: '',
  description: '',
  price: 0
});

const submitForm = async () => {
  await itemStore.addItem({
    name: form.value.name,
    description: form.value.description,
    price: form.value.price
  });
  router.push('/');
};
</script>

<template>
  <h2>Add New Item</h2>

  <router-link to="/">Back to List</router-link>
  <br><br>

  <form @submit.prevent="submitForm">
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

    <button type="submit">Create Item</button>
  </form>
</template>
