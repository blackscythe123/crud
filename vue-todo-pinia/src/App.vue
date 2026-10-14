<script setup>
import { ref } from 'vue'
import { useTodoStore } from './stores/todoStore'

const store = useTodoStore()
const newTodoText = ref('')

function handleAdd() {
  store.addTodo(newTodoText.value)
  newTodoText.value = ''
}
</script>

<template>
  <div class="todo-app">
    <h1>Todo List (Pinia)</h1>

    <form @submit.prevent="handleAdd" class="add-form">
      <input
        type="text"
        v-model="newTodoText"
        placeholder="What needs to be done?"
        required
      />
      <button type="submit" class="btn btn-add">Add</button>
    </form>

    <div class="filters">
      <button
        type="button"
        class="filter-btn"
        :class="{ active: store.filter === 'all' }"
        @click="store.setFilter('all')"
      >
        All ({{ store.totalCount }})
      </button>
      <button
        type="button"
        class="filter-btn"
        :class="{ active: store.filter === 'active' }"
        @click="store.setFilter('active')"
      >
        Pending ({{ store.pendingCount }})
      </button>
      <button
        type="button"
        class="filter-btn"
        :class="{ active: store.filter === 'completed' }"
        @click="store.setFilter('completed')"
      >
        Completed ({{ store.completedCount }})
      </button>
    </div>

    <ul class="todo-list">
      <li v-for="item in store.filteredTodos" :key="item.id" class="todo-item">
        <label>
          <input
            type="checkbox"
            :checked="item.done"
            @change="store.toggleTodo(item.id)"
          />
          <span :class="{ completed: item.done }">{{ item.text }}</span>
        </label>
        <button
          type="button"
          class="btn-delete"
          @click="store.deleteTodo(item.id)"
        >
          ✕
        </button>
      </li>
    </ul>

    <div v-if="store.todos.length === 0" class="empty-state">
      No todos found. Add one above!
    </div>

    <div class="footer-actions" v-if="store.completedCount > 0">
      <button type="button" class="btn btn-clear" @click="store.clearCompleted()">
        Clear Completed
      </button>
    </div>
  </div>
</template>

<style scoped>
.todo-app {
  max-width: 450px;
  margin: 30px auto;
  font-family: Arial, sans-serif;
}

.add-form {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
}

.add-form input {
  flex: 1;
  padding: 8px;
  font-size: 14px;
}

.btn {
  padding: 8px 16px;
  cursor: pointer;
}

.btn-add {
  background-color: #27ae60;
  color: white;
  border: none;
}

.filters {
  display: flex;
  gap: 8px;
  margin-bottom: 15px;
}

.filter-btn {
  padding: 5px 10px;
  background-color: #eee;
  border: 1px solid #ccc;
  cursor: pointer;
}

.filter-btn.active {
  background-color: #2980b9;
  color: white;
  border-color: #2980b9;
}

.todo-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #eee;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.btn-delete {
  background: none;
  border: none;
  color: #e74c3c;
  cursor: pointer;
  font-size: 16px;
}

.empty-state {
  text-align: center;
  color: #888;
  padding: 20px 0;
}

.footer-actions {
  margin-top: 15px;
  text-align: right;
}

.btn-clear {
  background-color: #e74c3c;
  color: white;
  border: none;
}
</style>
