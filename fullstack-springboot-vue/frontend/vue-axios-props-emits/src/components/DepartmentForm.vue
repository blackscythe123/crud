<template>
  <form @submit.prevent="handleSubmit" class="form">
    <div class="form-group">
      <label for="dept-name">Department Name</label>
      <input
        id="dept-name"
        v-model="deptForm.name"
        type="text"
        required
        placeholder="e.g. Engineering"
      />
    </div>
    <div class="form-group">
      <label for="dept-code">Department Code</label>
      <input
        id="dept-code"
        v-model="deptForm.code"
        type="text"
        required
        placeholder="e.g. ENG"
      />
    </div>
    <button type="submit" class="btn btn-primary">Add Department</button>
  </form>
</template>

<script setup>
import { reactive } from 'vue'

const emit = defineEmits(['create-department'])

const deptForm = reactive({
  name: '',
  code: ''
})

const handleSubmit = () => {
  emit('create-department', {
    name: deptForm.name,
    code: deptForm.code
  })
  deptForm.name = ''
  deptForm.code = ''
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

.form-group input {
  padding: 8px 10px;
  border: 1px solid #cccccc;
  border-radius: 4px;
  font-size: 14px;
  background-color: #ffffff;
}

.form-group input:focus {
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
