<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <h2>Vue Router + Pinia + Props CRUD</h2>
  <br>

  <nav>
    <RouterLink to="/">All Items</RouterLink>
    <br><br>
    <RouterLink to="/add">Add New Item</RouterLink>
  </nav>

  <br>
  <hr>
  <br>

  <RouterView />
</template>
