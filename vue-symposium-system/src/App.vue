<script setup>
import { ref } from 'vue'
import { useSymposiumStore } from './stores/symposiumStore'

const store = useSymposiumStore()

const formData = ref({
  studentName: '',
  college: '',
  email: '',
  eventId: ''
})

function handleSubmit() {
  if (!formData.value.studentName || !formData.value.college || !formData.value.email || !formData.value.eventId) {
    return
  }
  store.registerStudent({ ...formData.value })
  formData.value = {
    studentName: '',
    college: '',
    email: '',
    eventId: ''
  }
}
</script>

<template>
  <div class="symposium-container">
    <header class="header">
      <h1>Symposium Management System</h1>
      <div class="counter-badge">
        Total Registrations: <strong>{{ store.totalRegistrations }}</strong>
      </div>
    </header>

    <section class="section">
      <h2>Event Catalog</h2>
      <div class="event-grid">
        <div v-for="event in store.events" :key="event.id" class="event-card">
          <div class="event-category">{{ event.category }}</div>
          <h3 class="event-title">{{ event.title }}</h3>
          <p class="event-fee">Registration Fee: ₹{{ event.fee }}</p>
          <p class="event-stats">Enrolled: {{ store.registrationsByEvent(event.id).length }}</p>
        </div>
      </div>
    </section>

    <section class="section">
      <h2>Register Participant</h2>
      <form @submit.prevent="handleSubmit" class="registration-form">
        <div class="form-group">
          <label for="studentName">Student Name</label>
          <input
            id="studentName"
            v-model="formData.studentName"
            type="text"
            placeholder="Enter full name"
            required
          />
        </div>

        <div class="form-group">
          <label for="college">College</label>
          <input
            id="college"
            v-model="formData.college"
            type="text"
            placeholder="Enter college name"
            required
          />
        </div>

        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            v-model="formData.email"
            type="email"
            placeholder="Enter email address"
            required
          />
        </div>

        <div class="form-group">
          <label for="eventSelect">Select Event</label>
          <select id="eventSelect" v-model="formData.eventId" required>
            <option value="" disabled>-- Select an Event --</option>
            <option v-for="event in store.events" :key="event.id" :value="event.id">
              {{ event.title }} (₹{{ event.fee }})
            </option>
          </select>
        </div>

        <button type="submit" class="btn-submit">Register</button>
      </form>
    </section>

    <section class="section">
      <h2>Registered Participants</h2>
      <table class="participants-table" v-if="store.registrations.length > 0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>College</th>
            <th>Email</th>
            <th>Event</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="reg in store.registrations" :key="reg.id">
            <td>{{ reg.id }}</td>
            <td>{{ reg.studentName }}</td>
            <td>{{ reg.college }}</td>
            <td>{{ reg.email }}</td>
            <td>{{ reg.eventTitle }}</td>
            <td>
              <button
                type="button"
                class="btn-delete"
                @click="store.deleteRegistration(reg.id)"
              >
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else class="empty-state">No participants registered yet.</p>
    </section>
  </div>
</template>

<style scoped>
.symposium-container {
  max-width: 900px;
  margin: 30px auto;
  padding: 0 20px;
  font-family: Arial, sans-serif;
  color: #333;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ddd;
  padding-bottom: 15px;
  margin-bottom: 25px;
}

.header h1 {
  margin: 0;
  font-size: 24px;
}

.counter-badge {
  background-color: #2563eb;
  color: #fff;
  padding: 8px 14px;
  border-radius: 4px;
  font-size: 14px;
}

.section {
  margin-bottom: 30px;
}

.section h2 {
  font-size: 18px;
  margin-bottom: 12px;
  border-bottom: 1px solid #eee;
  padding-bottom: 6px;
}

.event-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.event-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 15px;
  background-color: #fafafa;
}

.event-category {
  font-size: 12px;
  text-transform: uppercase;
  color: #666;
  font-weight: bold;
}

.event-title {
  margin: 8px 0;
  font-size: 16px;
}

.event-fee {
  margin: 4px 0;
  font-size: 14px;
  color: #16a34a;
  font-weight: bold;
}

.event-stats {
  margin: 4px 0 0;
  font-size: 12px;
  color: #777;
}

.registration-form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px 20px;
  background-color: #f9f9f9;
  padding: 18px;
  border: 1px solid #ddd;
  border-radius: 6px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.form-group label {
  font-size: 13px;
  font-weight: bold;
}

.form-group input,
.form-group select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 14px;
}

.btn-submit {
  grid-column: span 2;
  padding: 10px;
  background-color: #2563eb;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
}

.btn-submit:hover {
  background-color: #1d4ed8;
}

.participants-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.participants-table th,
.participants-table td {
  border: 1px solid #ddd;
  padding: 8px 12px;
  text-align: left;
  font-size: 14px;
}

.participants-table th {
  background-color: #f1f5f9;
}

.btn-delete {
  background-color: #ef4444;
  color: white;
  border: none;
  padding: 4px 8px;
  border-radius: 3px;
  cursor: pointer;
}

.btn-delete:hover {
  background-color: #dc2626;
}

.empty-state {
  color: #777;
  font-style: italic;
  padding: 10px 0;
}
</style>
