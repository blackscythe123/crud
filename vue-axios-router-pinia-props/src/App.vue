<script setup>
</script>

<template>
  <div class="app-container">
    <header class="header">
      <h1 class="logo">CompanyHub</h1>
      <nav class="nav-links">
        <router-link to="/">Overview</router-link>
        <router-link to="/manage-departments">Manage Departments</router-link>
        <router-link to="/manage-employees">Manage Employees</router-link>
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
  margin: 0;
  padding: 0;
}
body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: #24292f;
  background-color: #ffffff;
}
.app-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 24px 16px;
}
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #eaeef2;
  padding-bottom: 16px;
  margin-bottom: 24px;
}
.logo {
  font-size: 1.5rem;
  color: #0969da;
}
.nav-links {
  display: flex;
  gap: 16px;
}
.nav-links a {
  text-decoration: none;
  color: #57606a;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 6px;
}
.nav-links a.router-link-active {
  color: #0969da;
  background-color: #f0f4f8;
  font-weight: 600;
}
.main-content {
  padding: 8px 0;
}
</style>
