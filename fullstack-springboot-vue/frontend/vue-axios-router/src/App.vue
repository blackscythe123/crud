<script setup>
</script>

<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="brand">
        <h1>Company Portal</h1>
      </div>
      <nav class="nav-links">
        <router-link to="/" class="nav-item">Dashboard</router-link>
        <router-link to="/departments" class="nav-item">Departments</router-link>
        <router-link to="/employees" class="nav-item">Employees</router-link>
        <router-link to="/add-employee" class="nav-item">Add Employee</router-link>
      </nav>
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  background-color: #f4f6f8;
  color: #333333;
}
</style>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #2c3e50;
  color: #ffffff;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.brand h1 {
  font-size: 20px;
  margin: 16px 0;
}

.nav-links {
  display: flex;
  gap: 8px;
}

.nav-item {
  color: #ecf0f1;
  text-decoration: none;
  padding: 8px 14px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  transition: background-color 0.2s;
}

.nav-item:hover {
  background-color: #34495e;
}

.nav-item.router-link-exact-active {
  background-color: #1abc9c;
  color: #ffffff;
}

.main-content {
  flex: 1;
  max-width: 1000px;
  width: 100%;
  margin: 24px auto;
  padding: 0 20px;
}
</style>
