<script setup>
</script>

<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="brand">
        <h1 class="brand-title">Library Management System</h1>
      </div>
      <nav class="nav-links">
        <router-link to="/">Catalog</router-link>
        <router-link to="/members">Members</router-link>
        <router-link to="/loans">Issue/Return Loans</router-link>
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
  color: #1e293b;
  background-color: #f1f5f9;
}
</style>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #0f172a;
  color: white;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #1e293b;
}

.brand-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: -0.025em;
}

.nav-links {
  display: flex;
  gap: 12px;
}

.nav-links a {
  color: #94a3b8;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.nav-links a:hover {
  color: #f8fafc;
  background-color: #1e293b;
}

.nav-links a.router-link-active {
  color: white;
  background-color: #2563eb;
}

.content-container {
  max-width: 1000px;
  width: 100%;
  margin: 28px auto;
  padding: 0 20px;
}
</style>
