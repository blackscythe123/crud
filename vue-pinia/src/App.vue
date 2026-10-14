<script setup>
import ItemForm from './components/ItemForm.vue'
import ItemList from './components/ItemList.vue'
</script>

<template>
  <h2>Vue Pinia CRUD</h2>
  <br>

  <h3>Add New Item</h3>
  <br>
  <ItemForm />

  <br>
  <hr>
  <br>

  <h3>Stored Items</h3>
  <br>
  <ItemList />
</template>
