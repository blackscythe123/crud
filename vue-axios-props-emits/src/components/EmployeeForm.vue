<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="form-group">
      <label for="emp-name">Full Name</label>
      <input
        id="emp-name"
        v-model="empForm.name"
        type="text"
        required
        placeholder="e.g. Jane Doe"
      />
    </div>
    <div class="form-group">
      <label for="emp-email">Email Address</label>
      <input
        id="emp-email"
        v-model="empForm.email"
        type="email"
        required
        placeholder="e.g. jane@example.com"
      />
    </div>
    <div class="form-group">
      <label for="emp-dept">Department</label>
      <select id="emp-dept" v-model="empForm.departmentId" required>
        <option value="" disabled>Select Department</option>
        <option v-for="dept in departments" :key="dept.id" :value="dept.id">
          {{ dept.name }} ({{ dept.code }})
        </option>
      </select>
    </div>
    <div class="form-group">
      <label for="emp-salary">Salary</label>
      <input
        id="emp-salary"
        v-model.number="empForm.salary"
        type="number"
        min="0"
        step="any"
        required
        placeholder="e.g. 75000"
      />
    </div>
    <button type="submit" class="btn btn-primary">Add Employee</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

defineProps(['departments'])
const emit = defineEmits(['create-employee'])

const empForm = reactive({
  name: '',
  email: '',
  departmentId: '',
  salary: ''
})

const handleSubmit = () => {
  emit('create-employee', {
    name: empForm.name,
    email: empForm.email,
    departmentId: empForm.departmentId,
    salary: Number(empForm.salary)
  })
  empForm.name = ''
  empForm.email = ''
  empForm.departmentId = ''
  empForm.salary = ''
}
</script>

<style scoped>
.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 13px;
  font-weight: 600;
  color: #444444;
}

.form-group input,
.form-group select {
  padding: 8px 10px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #ffffff;
}

.form-group input:focus,
.form-group select:focus {
  outline: none;
  border-color: #0066cc;
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

.btn-primary {
  background-color: #0066cc;
  color: #ffffff;
}

.btn-primary:hover {
  background-color: #0052a3;
}
</style>
