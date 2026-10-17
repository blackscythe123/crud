<script setup>
import { ref } from 'vue'

const props = defineProps(['employees', 'departments'])
const emit = defineEmits(['create', 'delete', 'patch'])

const name = ref('')
const email = ref('')
const departmentId = ref('')
const salary = ref('')

function handleSubmit() {
  if (!name.value || !email.value || !departmentId.value || salary.value === '') return
  emit('create', {
    name: name.value.trim(),
    email: email.value.trim(),
    departmentId: departmentId.value,
    salary: Number(salary.value)
  })
  name.value = ''
  email.value = ''
  departmentId.value = ''
  salary.value = ''
}

function handleDelete(id) {
  emit('delete', id)
}

function getDepartmentLabel(deptId) {
  const dept = props.departments?.find(d => d.id === deptId)
  return dept ? `${dept.name} (${dept.code})` : deptId
}
</script>

<template>
  <section class="section">
    <h2>Employees</h2>
    <form class="form" @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="emp-name">Employee Name</label>
        <input id="emp-name" v-model="name" type="text" placeholder="e.g. John Doe" required>
      </div>
      <div class="form-group">
        <label for="emp-email">Email</label>
        <input id="emp-email" v-model="email" type="email" placeholder="e.g. john@example.com" required>
      </div>
      <div class="form-group">
        <label for="emp-dept">Department</label>
        <select id="emp-dept" v-model="departmentId" required>
          <option value="" disabled>Select Department</option>
          <option v-for="dept in departments" :key="dept.id" :value="dept.id">
            {{ dept.name }} ({{ dept.code }})
          </option>
        </select>
      </div>
      <div class="form-group">
        <label for="emp-salary">Salary</label>
        <input id="emp-salary" v-model="salary" type="number" step="any" placeholder="e.g. 50000" required>
      </div>
      <button type="submit" class="btn btn-primary">Add Employee</button>
    </form>

    <div class="table-container">
      <p v-if="!employees || employees.length === 0" class="empty">No employees available.</p>
      <table v-else class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="emp in employees" :key="emp.id">
            <td>{{ emp.id }}</td>
            <td>{{ emp.name }}</td>
            <td>{{ emp.email }}</td>
            <td>{{ getDepartmentLabel(emp.departmentId) }}</td>
            <td>${{ Number(emp.salary).toLocaleString() }}</td>
            <td>
              <button class="btn btn-patch" @click="$emit('patch', emp.id, emp.salary)">Patch</button>
              <button class="btn btn-danger" @click="handleDelete(emp.id)">Delete</button>
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

.form-group input,
.form-group select {
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
