<template>
  <div class="employee-view">
    <h2>Employees Management</h2>

    <section class="card">
      <h3>Add Employee</h3>
      <form @submit.prevent="handleSubmit" class="form">
        <div class="form-group">
          <label for="emp-name">Full Name</label>
          <input
            id="emp-name"
            v-model="form.name"
            type="text"
            required
            placeholder="e.g. Jane Doe"
          />
        </div>
        <div class="form-group">
          <label for="emp-email">Email Address</label>
          <input
            id="emp-email"
            v-model="form.email"
            type="email"
            required
            placeholder="e.g. jane@example.com"
          />
        </div>
        <div class="form-group">
          <label for="emp-dept">Department</label>
          <select id="emp-dept" v-model="form.departmentId" required>
            <option value="" disabled>Select Department</option>
            <option v-for="dept in companyStore.departments" :key="dept.id" :value="dept.id">
              {{ dept.name }} ({{ dept.code }})
            </option>
          </select>
        </div>
        <div class="form-group">
          <label for="emp-salary">Salary</label>
          <input
            id="emp-salary"
            v-model.number="form.salary"
            type="number"
            min="0"
            step="any"
            required
            placeholder="e.g. 75000"
          />
        </div>
        <button type="submit" class="btn btn-primary">Add Employee</button>
      </form>
    </section>

    <section class="card table-card">
      <h3>Employee List</h3>
      <div class="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Salary</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="companyStore.employees.length === 0">
              <td colspan="6" class="empty">No employees found</td>
            </tr>
            <tr v-for="emp in companyStore.employees" :key="emp.id">
              <td>{{ emp.id }}</td>
              <td>{{ emp.name }}</td>
              <td>{{ emp.email }}</td>
              <td>{{ companyStore.getDepartmentName(emp.departmentId) }}</td>
              <td>${{ Number(emp.salary).toLocaleString() }}</td>
              <td>
                <button @click="handleDelete(emp.id)" class="btn btn-danger">Delete</button>
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
  email: '',
  departmentId: '',
  salary: ''
})

const handleSubmit = async () => {
  await companyStore.addEmployee({
    name: form.name,
    email: form.email,
    departmentId: Number(form.departmentId),
    salary: Number(form.salary)
  })
  form.name = ''
  form.email = ''
  form.departmentId = ''
  form.salary = ''
}

const handleDelete = async (id) => {
  await companyStore.deleteEmployee(id)
}

onMounted(() => {
  companyStore.fetchEmployees()
  companyStore.fetchDepartments()
})
</script>

<style scoped>
.employee-view h2 {
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

.empty {
  text-align: center;
  color: #888888;
  padding: 16px;
}
</style>
