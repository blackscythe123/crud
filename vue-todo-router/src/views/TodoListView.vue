<script setup>
import { todoState } from '../data/todoState'
</script>

<template>
  <div>
    <h2>Task List</h2>
    <ul class="task-list">
      <li v-for="item in todoState.todos" :key="item.id" class="task-item">
        <label>
          <input
            type="checkbox"
            :checked="item.done"
            @change="todoState.toggleTodo(item.id)"
          />
          <span :class="{ completed: item.done }">{{ item.title }}</span>
        </label>
        <div class="actions">
          <router-link :to="'/todo/' + item.id" class="btn-link">View Details</router-link>
          <button type="button" class="btn-del" @click="todoState.deleteTodo(item.id)">Delete</button>
        </div>
      </li>
    </ul>

    <div v-if="todoState.todos.length === 0" class="empty">
      No tasks available. Click "Add Task" to create one.
    </div>
  </div>
</template>

<style scoped>
.task-list {
  list-style: none;
  padding: 0;
  margin: 15px 0;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
}

.completed {
  text-decoration: line-through;
  color: #888;
}

.actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.btn-link {
  color: #2980b9;
  text-decoration: none;
  font-size: 13px;
}

.btn-del {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 3px;
  cursor: pointer;
}

.empty {
  text-align: center;
  color: #888;
  padding: 20px 0;
}
</style>
