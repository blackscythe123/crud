<template>
  <div class="app-container">
    <header class="app-header">
      <h1>Vue Router Todo App</h1>
      <nav class="nav">
        <router-link to="/" class="nav-link">Task List</router-link>
        <span class="divider">|</span>
        <router-link to="/add" class="nav-link">Add New Task</router-link>
      </nav>
    </header>

    <main class="main-content">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  max-width: 500px;
  margin: 30px auto;
  font-family: Arial, sans-serif;
}

.app-header {
  border-bottom: 2px solid #333;
  padding-bottom: 15px;
  margin-bottom: 20px;
}

.nav {
  display: flex;
  gap: 10px;
  align-items: center;
}

.nav-link {
  text-decoration: none;
  color: #2980b9;
  font-weight: bold;
}

.nav-link.router-link-exact-active {
  color: #27ae60;
  text-decoration: underline;
}

.divider {
  color: #aaa;
}

.main-content {
  padding: 10px 0;
}
</style>
