<template>
  <div class="app-container">
    <header class="app-header">
      <div class="header-inner">
        <h1 class="logo">Company Admin</h1>
        <nav class="nav">
          <router-link to="/" class="nav-link">Dashboard</router-link>
          <router-link to="/departments" class="nav-link">Departments</router-link>
          <router-link to="/employees" class="nav-link">Employees</router-link>
        </nav>
      </div>
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>

<style>
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  background-color: #f4f5f7;
  color: #333333;
  line-height: 1.5;
}

.app-container {
  min-height: 100vh;
}

.app-header {
  background-color: #ffffff;
  border-bottom: 1px solid #e1e4e8;
  padding: 0 16px;
}

.header-inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
}

.logo {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a1a;
}

.nav {
  display: flex;
  gap: 16px;
}

.nav-link {
  text-decoration: none;
  color: #555555;
  font-weight: 600;
  font-size: 14px;
  padding: 6px 10px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #0066cc;
  background-color: #f0f4f8;
}

.nav-link.router-link-exact-active {
  color: #0066cc;
  background-color: #e6f0fa;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px 16px;
}
</style>
