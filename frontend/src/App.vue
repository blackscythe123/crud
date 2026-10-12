<script setup>
import { ref, onMounted } from 'vue';
import ItemService from './services/ItemService';

const items = ref([]);
const name = ref('');
const describtion = ref('');
const price = ref(0);

const load = async () => {
  const res = await ItemService.getAll();
  items.value = res.data;
};

const addItem = async () => {
  await ItemService.create({ name: name.value, describtion: describtion.value, price: price.value });
  name.value = '';
  describtion.value = '';
  price.value = 0;
  load();
};

const deleteItem = async (id) => {
  await ItemService.delete(id);
  load();
};

onMounted(load);
</script>

<template>
  <div style="padding: 20px; font-family: sans-serif;">
    <h2>Simple CRUD</h2>

    <form @submit.prevent="addItem">
      <input v-model="name" placeholder="Name" required />
      <input v-model="describtion" placeholder="Description" required />
      <input v-model="price" type="number" placeholder="Price" required />
      <button type="submit">Add</button>
    </form>

    <hr style="margin: 20px 0;" />

    <h3>Items List:</h3>
    <ul>
      <li v-for="item in items" :key="item.id" style="margin-bottom: 8px;">
        <strong>{{ item.name }}</strong> - {{ item.describtion }} (${{ item.price }})
        <button @click="deleteItem(item.id)" style="margin-left: 10px; color: red;">Delete</button>
      </li>
    </ul>
    <p v-if="items.length === 0">No items yet.</p>
  </div>
</template>
