<script setup>
import { ref, onMounted } from 'vue';
import ItemService from './services/ItemService';

const items = ref([]);
const isEditing = ref(false);

const initialForm = { id: null, name: '', describtion: '', price: 0 };
const form = ref({ ...initialForm });

// 1. READ ALL
const loadItems = async () => {
  try {
    const res = await ItemService.getAll();
    items.value = res.data;
  } catch (error) {
    console.error('Error fetching items:', error);
  }
};

// 2. CREATE or UPDATE
const saveItem = async () => {
  try {
    if (isEditing.value) {
      await ItemService.update(form.value.id, form.value);
    } else {
      await ItemService.create(form.value);
    }
    cancelEdit();
    await loadItems();
  } catch (error) {
    console.error('Error saving item:', error);
  }
};

// 3. EDIT TRIGGER
const editItem = (item) => {
  isEditing.value = true;
  form.value = { ...item };
};

// 4. CANCEL / RESET
const cancelEdit = () => {
  isEditing.value = false;
  form.value = { ...initialForm };
};

// 5. DELETE
const deleteItem = async (id) => {
  if (confirm('Are you sure you want to delete this item?')) {
    try {
      await ItemService.delete(id);
      await loadItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  }
};

onMounted(() => {
  loadItems();
});
</script>

<template>
  <div class="container">
    <h2>Fullstack CRUD: Spring Boot + MongoDB + Vue.js</h2>

    <!-- FORM -->
    <div class="form-card">
      <h3>{{ isEditing ? 'Edit Item' : 'Add New Item' }}</h3>
      <form @submit.prevent="saveItem">
        <input v-model="form.name" placeholder="Item Name" required />
        <input v-model="form.describtion" placeholder="Description" required />
        <input v-model.number="form.price" type="number" step="0.01" placeholder="Price" required />

        <button type="submit" class="btn-primary">{{ isEditing ? 'Update' : 'Add' }}</button>
        <button v-if="isEditing" type="button" class="btn-secondary" @click="cancelEdit">Cancel</button>
      </form>
    </div>

    <!-- TABLE -->
    <table class="item-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Price ($)</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.describtion }}</td>
          <td>${{ item.price }}</td>
          <td>
            <button class="btn-edit" @click="editItem(item)">Edit</button>
            <button class="btn-delete" @click="deleteItem(item.id)">Delete</button>
          </td>
        </tr>
        <tr v-if="items.length === 0">
          <td colspan="5" class="empty-state">No items found. Add one above!</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.container {
  max-width: 850px;
  margin: 30px auto;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #333;
}
.form-card {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  margin-bottom: 24px;
}
input {
  padding: 8px 12px;
  margin-right: 10px;
  margin-bottom: 10px;
  border: 1px solid #ced4da;
  border-radius: 4px;
}
button {
  padding: 8px 16px;
  margin-right: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
}
.btn-primary { background: #42b883; color: white; }
.btn-secondary { background: #6c757d; color: white; }
.btn-edit { background: #007bff; color: white; }
.btn-delete { background: #dc3545; color: white; }

.item-table {
  width: 100%;
  border-collapse: collapse;
}
.item-table th, .item-table td {
  border: 1px solid #dee2e6;
  padding: 10px 14px;
  text-align: left;
}
.item-table th {
  background: #f1f3f5;
}
.empty-state {
  text-align: center;
  color: #868e96;
}
</style>
