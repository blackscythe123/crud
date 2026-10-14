<script setup>
import { ref } from 'vue'
import { useLibraryStore } from '../stores/libraryStore'

const libraryStore = useLibraryStore()

const newMember = ref({
  name: '',
  email: '',
  membershipType: 'Standard'
})

const successMessage = ref('')

function handleRegister() {
  if (!newMember.value.name || !newMember.value.email) {
    return
  }
  const registered = libraryStore.registerMember({
    name: newMember.value.name,
    email: newMember.value.email,
    membershipType: newMember.value.membershipType
  })
  successMessage.value = `Member registered successfully with ID: ${registered.id}`
  newMember.value = {
    name: '',
    email: '',
    membershipType: 'Standard'
  }
  setTimeout(() => {
    successMessage.value = ''
  }, 3500)
}
</script>

<template>
  <div class="membership-page">
    <div v-if="successMessage" class="alert-box">
      {{ successMessage }}
    </div>

    <div class="form-card">
      <h2>Register New Member</h2>
      <form class="member-form" @submit.prevent="handleRegister">
        <div class="form-group">
          <label>Full Name</label>
          <input
            v-model="newMember.name"
            type="text"
            required
            placeholder="e.g. Alice Walker"
          />
        </div>
        <div class="form-group">
          <label>Email Address</label>
          <input
            v-model="newMember.email"
            type="email"
            required
            placeholder="e.g. alice@example.com"
          />
        </div>
        <div class="form-group">
          <label>Membership Type</label>
          <select v-model="newMember.membershipType">
            <option value="Standard">Standard</option>
            <option value="Premium">Premium</option>
            <option value="Student">Student</option>
          </select>
        </div>
        <button type="submit" class="btn-submit">Register Member</button>
      </form>
    </div>

    <div class="table-card">
      <div class="card-header">
        <h2>Member Roster</h2>
        <span class="count-badge">{{ libraryStore.members.length }} Members</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Member ID</th>
            <th>Full Name</th>
            <th>Email</th>
            <th>Type</th>
            <th>Currently Borrowed Books</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="member in libraryStore.members" :key="member.id">
            <td><code>{{ member.id }}</code></td>
            <td class="font-bold">{{ member.name }}</td>
            <td>{{ member.email }}</td>
            <td>
              <span :class="['type-badge', member.membershipType.toLowerCase()]">
                {{ member.membershipType }}
              </span>
            </td>
            <td>
              <div v-if="member.borrowedBooks && member.borrowedBooks.length > 0" class="books-list">
                <span v-for="(b, i) in member.borrowedBooks" :key="i" class="book-tag">
                  {{ b }}
                </span>
              </div>
              <span v-else class="text-muted">None</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.membership-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.alert-box {
  background-color: #ecfdf5;
  color: #065f46;
  border: 1px solid #a7f3d0;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
}

.form-card,
.table-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 20px;
}

.form-card h2,
.table-card h2 {
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #1e293b;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.card-header h2 {
  margin: 0;
}

.count-badge {
  background: #f1f5f9;
  color: #475569;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 13px;
  font-weight: 500;
}

.member-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  align-items: flex-end;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 12px;
  font-weight: 600;
  color: #475569;
}

.form-group input,
.form-group select {
  padding: 8px 10px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 14px;
}

.btn-submit {
  background-color: #0f172a;
  color: white;
  border: none;
  padding: 9px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  font-weight: 500;
}

.btn-submit:hover {
  background-color: #1e293b;
}

.data-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  text-align: left;
}

.data-table th,
.data-table td {
  padding: 10px 12px;
  border-bottom: 1px solid #e2e8f0;
}

.data-table th {
  background-color: #f8fafc;
  color: #475569;
  font-weight: 600;
}

.font-bold {
  font-weight: 600;
}

.type-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  background-color: #e2e8f0;
  color: #334155;
}

.type-badge.premium {
  background-color: #fef3c7;
  color: #92400e;
}

.type-badge.student {
  background-color: #e0e7ff;
  color: #3730a3;
}

.books-list {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.book-tag {
  background-color: #f1f5f9;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  padding: 2px 6px;
  font-size: 12px;
}

.text-muted {
  color: #94a3b8;
  font-size: 13px;
}
</style>
