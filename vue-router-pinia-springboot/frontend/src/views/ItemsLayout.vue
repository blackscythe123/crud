<template>
  <h1>Fullstack Item Portal</h1>
  <nav>
    <router-link to="/items">Item List</router-link> | 
    <router-link to="/items/add">Add Item</router-link>
  </nav>
  <br>
  <hr>
  <br>
  <router-view></router-view>
</template>
