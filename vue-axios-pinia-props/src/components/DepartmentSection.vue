<script setup>
import { ref } from 'vue'

const props = defineProps(['departments'])
const emit = defineEmits(['create', 'delete', 'patch'])

const name = ref('')
const code = ref('')

function handleSubmit() {
  if (!name.value || !code.value) return
  emit('create', {
    name: name.value.trim(),
    code: code.value.trim()
  })
  name.value = ''
  code.value = ''
}

function handleDelete(id) {
  emit('delete', id)
}
</script>

<template>
  <section class="section">
    <h2>Departments</h2>
    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="dept-name">Department Name</label>
        <input id="dept-name" v-model="name" type="text" placeholder="e.g. Engineering" required>
      </div>
      <div class="form-group">
        <label for="dept-code">Department Code</label>
        <input id="dept-code" v-model="code" type="text" placeholder="e.g. ENG" required>
      </div>
      <button type="submit" class="btn btn-primary">Add Department</button>
    </form>

    <div class="table-container">
      <p v-if="!departments || departments.length === 0" class="empty">No departments available.</p>
      <table v-else class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Code</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="dept in departments" :key="dept.id">
            <td>{{ dept.id }}</td>
            <td>{{ dept.name }}</td>
            <td>{{ dept.code }}</td>
            <td>
              <button class="btn btn-patch" @click="$emit('patch', dept.id, dept.code)">Patch</button>
              <button class="btn btn-danger" @click="handleDelete(dept.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<style scoped>
.section {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 24px;
}

.form {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  align-items: flex-end;
  margin-bottom: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 14px;
  font-weight: 600;
}

.form-group input {
  padding: 6px 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.btn {
  padding: 6px 14px;
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  background-color: #007bff;
  color: white;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0069d9;
}

.btn-danger {
  background-color: #dc3545;
  color: white;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
}

.btn-patch {
  background-color: #17a2b8;
  color: white;
  border-color: #17a2b8;
  margin-right: 6px;
}

.btn-patch:hover {
  background-color: #138496;
}

.table-container {
  overflow-x: auto;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
}

.data-table th {
  background-color: #f2f2f2;
}

.empty {
  color: #666;
  font-style: italic;
}
</style>
