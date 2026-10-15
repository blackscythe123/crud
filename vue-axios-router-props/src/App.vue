<script setup>
</script>

<template>
  <div class="app-container">
    <header class="navbar">
      <h2>Company Management</h2>
      <nav class="nav-links">
        <router-link to="/">Departments</router-link>
        <router-link to="/employees">Employees</router-link>
      </nav>
    </header>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px 16px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
  color: #2d3748;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 16px;
  margin-bottom: 24px;
}
.navbar h2 {
  margin: 0;
  font-size: 22px;
}
.nav-links {
  display: flex;
  gap: 12px;
}
.nav-links a {
  text-decoration: none;
  color: #4a5568;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 4px;
  border: 1px solid #cbd5e0;
}
.nav-links a.router-link-active {
  background-color: #3182ce;
  border-color: #3182ce;
  color: #fff;
}
.content {
  margin-top: 10px;
}
</style>
