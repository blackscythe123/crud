<template>
  <div class="department-view">
    <h2>Departments Management</h2>

    <section class="card">
      <h3>Add Department</h3>
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <label for="dept-name">Department Name</label>
          <input
            id="dept-name"
            v-model="form.name"
            type="text"
            required
            placeholder="e.g. Engineering"
          />
        </div>
        <div class="form-group">
          <label for="dept-code">Department Code</label>
          <input
            id="dept-code"
            v-model="form.code"
            type="text"
            required
            placeholder="e.g. ENG"
          />
        </div>
        <button type="submit" class="btn btn-primary">Add Department</button>
      </form>
    </section>

    <section class="card table-card">
      <h3>Department List</h3>
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
            <tr v-if="companyStore.departments.length === 0">
              <td colspan="4" class="empty">No departments found</td>
            </tr>
            <tr v-for="dept in companyStore.departments" :key="dept.id">
              <td>{{ dept.id }}</td>
              <td>{{ dept.name }}</td>
              <td><code>{{ dept.code }}</code></td>
              <td>
                <button @click="handleDelete(dept.id)" class="btn btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue'
import { useCompanyStore } from '../stores/companyStore'

const companyStore = useCompanyStore()

const form = reactive({
  name: '',
  code: ''
})

const handleSubmit = async () => {
  await companyStore.addDepartment({
    name: form.name,
    code: form.code
  })
  form.name = ''
  form.code = ''
}

const handleDelete = async (id) => {
  await companyStore.deleteDepartment(id)
}

onMounted(() => {
  companyStore.fetchDepartments()
})
</script>

<style scoped>
.department-view h2 {
  font-size: 22px;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.card {
  background: #ffffff;
  border: 1px solid #e1e4e8;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card h3 {
  font-size: 16px;
  margin-bottom: 16px;
  color: #333333;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  max-width: 400px;
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
}

.btn-primary {
  background-color: #0066cc;
  color: #ffffff;
  align-self: flex-start;
}

.btn-primary:hover {
  background-color: #0052a3;
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

.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
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
</style>
