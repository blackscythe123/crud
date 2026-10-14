<script setup>
</script>

<template>
  <div class="app-layout">
    <header class="app-header">
      <h1 class="portal-title">Vue Banking Portal</h1>
      <nav class="nav-links">
        <router-link to="/">Dashboard</router-link>
        <router-link to="/transaction">New Transaction</router-link>
        <router-link to="/statement">Statement</router-link>
      </nav>
    </header>

    <main class="content-container">
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
  color: #333;
  background-color: #f5f6f8;
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
  color: white;
  padding: 15px 25px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.portal-title {
  margin: 0;
  font-size: 20px;
}

.nav-links {
  display: flex;
  gap: 15px;
}

.nav-links a {
  color: #ecf0f1;
  text-decoration: none;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 4px;
  transition: background-color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  background-color: #34495e;
}

.content-container {
  max-width: 650px;
  width: 100%;
  margin: 30px auto;
  padding: 0 15px;
}
</style>
