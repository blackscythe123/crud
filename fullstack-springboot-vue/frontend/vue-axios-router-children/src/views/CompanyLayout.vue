<template>
  <div class="layout-container">
    <aside class="sidebar">
      <div class="sidebar-header">
        <h2>Company Portal</h2>
      </div>
      <nav class="nav-links">
        <router-link to="/company" class="nav-item" exact-active-class="active">Overview</router-link>
        <router-link to="/company/departments" class="nav-item" active-class="active">Departments</router-link>
        <router-link to="/company/employees" class="nav-item" active-class="active">Employees</router-link>
      </nav>
    </aside>
    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
.layout-container {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 240px;
  background-color: #2c3e50;
  color: #fff;
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.sidebar-header h2 {
  font-size: 1.25rem;
  font-weight: 600;
  color: #ecf0f1;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nav-item {
  color: #bdc3c7;
  text-decoration: none;
  padding: 10px 14px;
  border-radius: 6px;
  transition: background-color 0.2s, color 0.2s;
}

.nav-item:hover {
  background-color: #34495e;
  color: #ffffff;
}

.nav-item.active {
  background-color: #3498db;
  color: #ffffff;
  font-weight: 600;
}

.main-content {
  flex: 1;
  padding: 32px;
  background-color: #f8fafc;
  overflow-y: auto;
}
</style>
