<script setup>
</script>

<template>
  <div class="app-layout">
    <header class="app-header">
      <div class="brand">
        <span class="cross-icon">+</span>
        <h1 class="portal-title">Hospital Care Portal</h1>
      </div>
      <nav class="nav-links">
        <router-link to="/">Book OPD / Admit</router-link>
        <router-link to="/patients">Patients List</router-link>
        <router-link to="/billing">Billing / Stats</router-link>
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
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #2d3748;
  background-color: #f7fafc;
}
</style>

<style scoped>
.app-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background-color: #1a365d;
  color: #ffffff;
  padding: 14px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
}

.brand {
  display: flex;
  align-items: center;
  gap: 10px;
}

.cross-icon {
  background-color: #e53e3e;
  color: #ffffff;
  font-weight: bold;
  font-size: 16px;
  width: 24px;
  height: 24px;
  border-radius: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.portal-title {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
}

.nav-links {
  display: flex;
  gap: 12px;
}

.nav-links a {
  color: #e2e8f0;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 4px;
  transition: background-color 0.2s, color 0.2s;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  background-color: #2b6cb0;
  color: #ffffff;
}

.content-container {
  max-width: 960px;
  width: 100%;
  margin: 28px auto;
  padding: 0 20px;
}
</style>
