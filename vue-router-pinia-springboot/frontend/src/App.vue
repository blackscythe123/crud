<script setup>
</script>

<template>
  <h1>Spring Boot + MongoDB + Vue Router + Pinia CRUD</h1>
  <nav>
    <router-link to="/">Item List</router-link>
    |
    <router-link to="/add">Add Item</router-link>
  </nav>
  <hr>
  <router-view />
</template>
