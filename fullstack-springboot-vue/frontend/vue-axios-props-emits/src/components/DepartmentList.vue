<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Code</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="departments.length === 0">
          <td colspan="4" class="empty">No departments found</td>
        </tr>
        <tr v-for="dept in departments" :key="dept.id">
          <td>{{ dept.id }}</td>
          <td>{{ dept.name }}</td>
          <td><code>{{ dept.code }}</code></td>
          <td>
            <button @click="emit('patch-department', dept.id, dept.code)" class="btn">Patch</button>
            <button @click="emit('delete-department', dept.id)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps(['departments'])
const emit = defineEmits(['delete-department', 'patch-department'])
</script>

<style scoped>
.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-top: 8px;
}

th, td {
  text-align: left;
  padding: 8px 10px;
  border-bottom: 1px solid #eeeeee;
}

th {
  background-color: #fafbfc;
  color: #555555;
  font-weight: 600;
}

code {
  background: #f0f0f0;
  padding: 2px 4px;
  border-radius: 3px;
  font-size: 12px;
}

.empty {
  text-align: center;
  color: #888888;
  padding: 16px;
}

.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: background-color 0.15s ease;
}

.btn-danger {
  background-color: #d9383a;
  color: #ffffff;
  padding: 4px 8px;
  font-size: 12px;
}

.btn-danger:hover {
  background-color: #b8282a;
}
</style>
