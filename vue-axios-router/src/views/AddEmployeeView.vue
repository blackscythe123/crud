<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '../services/api'

const router = useRouter()
const departments = ref([])
const loading = ref(false)
const submitting = ref(false)
const errorMessage = ref('')

const form = reactive({
  name: '',
  email: '',
  departmentId: '',
  salary: ''
})

async function fetchDepartments() {
  loading.value = true
  try {
    const res = await api.get('/departments')
    departments.value = res.data
    if (departments.value.length > 0) {
      form.departmentId = departments.value[0].id
    }
  } catch (err) {
    errorMessage.value = err.message || 'Failed to fetch departments'
  } finally {
    loading.value = false
  }
}

async function handleAddEmployee() {
  if (!form.name.trim() || !form.email.trim() || !form.salary) return
  submitting.value = true
  errorMessage.value = ''
  try {
    await api.post('/employees', {
      name: form.name.trim(),
      email: form.email.trim(),
      departmentId: form.departmentId,
      salary: Number(form.salary)
    })
    router.push('/employees')
  } catch (err) {
    errorMessage.value = err.message || 'Failed to add employee'
  } finally {
    submitting.value = false
  }
}

function handleCancel() {
  router.push('/employees')
}

onMounted(() => {
  fetchDepartments()
})
</script>

<template>
  <div class="add-employee-view">
    <h2>Add Employee</h2>

    <div v-if="loading" class="state-msg">Loading department list...</div>
    <div v-if="errorMessage" class="state-msg error">{{ errorMessage }}</div>

    <div class="card">
      <form @submit.prevent="handleAddEmployee" class="emp-form">
        <div class="form-group">
          <label for="emp-name">Full Name</label>
          <input
            id="emp-name"
            v-model="form.name"
            type="text"
            placeholder="John Doe"
            required
          />
        </div>

        <div class="form-group">
          <label for="emp-email">Email Address</label>
          <input
            id="emp-email"
            v-model="form.email"
            type="email"
            placeholder="john.doe@example.com"
            required
          />
        </div>

        <div class="form-group">
          <label for="emp-dept">Department</label>
          <select
            v-if="departments.length > 0"
            id="emp-dept"
            v-model="form.departmentId"
            required
          >
            <option
              v-for="dept in departments"
              :key="dept.id"
              :value="dept.id"
            >
              {{ dept.name }} ({{ dept.code }})
            </option>
          </select>
          <input
            v-else
            id="emp-dept"
            v-model="form.departmentId"
            type="text"
            placeholder="Department ID / Code"
            required
          />
        </div>

        <div class="form-group">
          <label for="emp-salary">Annual Salary ($)</label>
          <input
            id="emp-salary"
            v-model="form.salary"
            type="number"
            min="0"
            step="100"
            placeholder="75000"
            required
          />
        </div>

        <div class="form-actions">
          <button type="submit" class="btn primary" :disabled="submitting">
            {{ submitting ? 'Saving...' : 'Save Employee' }}
          </button>
          <button type="button" class="btn secondary" @click="handleCancel">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.add-employee-view {
  max-width: 600px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

h2 {
  margin: 0;
  color: #2c3e50;
}

.card {
  background: #ffffff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 24px;
}

.emp-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

label {
  font-size: 13px;
  font-weight: bold;
  color: #555;
}

input,
select {
  padding: 10px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

input:focus,
select:focus {
  outline: none;
  border-color: #3498db;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 10px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  font-weight: bold;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn.primary {
  background: #27ae60;
  color: #fff;
}

.btn.primary:hover:not(:disabled) {
  background: #219150;
}

.btn.secondary {
  background: #ecf0f1;
  color: #2c3e50;
}

.btn.secondary:hover {
  background: #bdc3c7;
}

.state-msg {
  padding: 10px;
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.state-msg.error {
  background-color: #fde8e8;
  color: #c0392b;
  border-color: #f5c6cb;
}
</style>
