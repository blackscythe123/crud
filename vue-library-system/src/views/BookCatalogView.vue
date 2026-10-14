<script setup>
import { ref, computed } from 'vue'
import { useLibraryStore } from '../stores/libraryStore'

const libraryStore = useLibraryStore()

const searchQuery = ref('')
const selectedCategory = ref('')
const selectedMemberId = ref({})
const notification = ref('')

const newBook = ref({
  title: '',
  author: '',
  isbn: '',
  category: 'Computer Science',
  copies: 1
})

const categories = ['Computer Science', 'Web Dev', 'Algorithms', 'Fiction', 'Science']

const filteredBooks = computed(() => {
  return libraryStore.books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      book.isbn.includes(searchQuery.value)
    const matchesCategory =
      !selectedCategory.value || book.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

function handleIssueBook(bookId) {
  const memberId = selectedMemberId.value[bookId]
  if (!memberId) {
    notification.value = 'Please select a member before issuing.'
    return
  }
  const success = libraryStore.issueBook(bookId, memberId)
  if (success) {
    notification.value = 'Book successfully issued!'
    selectedMemberId.value[bookId] = ''
  } else {
    notification.value = 'Unable to issue book. Check copy availability.'
  }
  setTimeout(() => {
    notification.value = ''
  }, 3000)
}

function handleAddBook() {
  if (!newBook.value.title || !newBook.value.author || !newBook.value.isbn) {
    return
  }
  libraryStore.books.push({
    id: Date.now(),
    title: newBook.value.title,
    author: newBook.value.author,
    isbn: newBook.value.isbn,
    category: newBook.value.category,
    copies: Number(newBook.value.copies) || 1
  })
  newBook.value = {
    title: '',
    author: '',
    isbn: '',
    category: 'Computer Science',
    copies: 1
  }
  notification.value = 'New book added to catalog.'
  setTimeout(() => {
    notification.value = ''
  }, 3000)
}
</script>

<template>
  <div class="catalog-page">
    <div class="stats-bar">
      <div class="stat-card">
        <span class="stat-num">{{ libraryStore.books.length }}</span>
        <span class="stat-label">Total Titles</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">{{ libraryStore.availableBooks.length }}</span>
        <span class="stat-label">Available Titles</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">{{ libraryStore.activeLoansCount }}</span>
        <span class="stat-label">Active Loans</span>
      </div>
      <div class="stat-card">
        <span class="stat-num">${{ libraryStore.totalFines }}</span>
        <span class="stat-label">Accrued Fines</span>
      </div>
    </div>

    <div v-if="notification" class="alert-box">
      {{ notification }}
    </div>

    <div class="controls-row">
      <input
        v-model="searchQuery"
        type="text"
        placeholder="Search title, author, or ISBN..."
        class="search-input"
      />
      <select v-model="selectedCategory" class="filter-select">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat" :value="cat">
          {{ cat }}
        </option>
      </select>
    </div>

    <div class="table-card">
      <h2>Book Inventory</h2>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Category</th>
            <th>Copies</th>
            <th>Availability</th>
            <th>Issue Book</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in filteredBooks" :key="book.id">
            <td>#{{ book.id }}</td>
            <td class="font-bold">{{ book.title }}</td>
            <td>{{ book.author }}</td>
            <td><code>{{ book.isbn }}</code></td>
            <td><span class="tag">{{ book.category }}</span></td>
            <td>
              <span class="copies-count" :class="{ 'zero-copies': book.copies === 0 }">
                {{ book.copies }}
              </span>
            </td>
            <td>
              <span :class="['status-badge', book.copies > 0 ? 'in-stock' : 'out-stock']">
                {{ book.copies > 0 ? 'In Stock' : 'Out of Stock' }}
              </span>
            </td>
            <td>
              <div class="issue-controls">
                <select v-model="selectedMemberId[book.id]" class="member-select" :disabled="book.copies === 0">
                  <option value="" disabled selected>Select Member</option>
                  <option v-for="member in libraryStore.members" :key="member.id" :value="member.id">
                    {{ member.name }} ({{ member.id }})
                  </option>
                </select>
                <button
                  class="btn-issue"
                  :disabled="book.copies === 0 || !selectedMemberId[book.id]"
                  @click="handleIssueBook(book.id)"
                >
                  Issue
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredBooks.length === 0">
            <td colspan="8" class="text-center">No books match your criteria.</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="form-card">
      <h3>Add New Book to Inventory</h3>
      <form class="add-form" @submit.prevent="handleAddBook">
        <div class="form-group">
          <label>Book Title</label>
          <input v-model="newBook.title" type="text" required placeholder="e.g. Design Patterns" />
        </div>
        <div class="form-group">
          <label>Author</label>
          <input v-model="newBook.author" type="text" required placeholder="e.g. Gang of Four" />
        </div>
        <div class="form-group">
          <label>ISBN</label>
          <input v-model="newBook.isbn" type="text" required placeholder="e.g. 978-0201633610" />
        </div>
        <div class="form-group">
          <label>Category</label>
          <select v-model="newBook.category">
            <option v-for="cat in categories" :key="cat" :value="cat">{{ cat }}</option>
          </select>
        </div>
        <div class="form-group">
          <label>Copies</label>
          <input v-model.number="newBook.copies" type="number" min="1" required />
        </div>
        <button type="submit" class="btn-submit">Add Book</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.catalog-page {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.stats-bar {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
  gap: 15px;
}

.stat-card {
  background: white;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-num {
  font-size: 24px;
  font-weight: 700;
  color: #1e293b;
}

.stat-label {
  font-size: 13px;
  color: #64748b;
  margin-top: 4px;
}

.alert-box {
  background-color: #e0f2fe;
  color: #0369a1;
  border: 1px solid #bae6fd;
  padding: 12px 16px;
  border-radius: 6px;
  font-size: 14px;
}

.controls-row {
  display: flex;
  gap: 12px;
}

.search-input {
  flex: 1;
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 14px;
}

.filter-select {
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 14px;
  background-color: white;
}

.table-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 20px;
  overflow-x: auto;
}

.table-card h2 {
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #1e293b;
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

.tag {
  background-color: #f1f5f9;
  color: #475569;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.copies-count {
  font-weight: 600;
  color: #0f172a;
}

.copies-count.zero-copies {
  color: #ef4444;
}

.status-badge {
  display: inline-block;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.status-badge.in-stock {
  background-color: #dcfce7;
  color: #166534;
}

.status-badge.out-stock {
  background-color: #fee2e2;
  color: #991b1b;
}

.issue-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.member-select {
  padding: 6px 8px;
  border: 1px solid #cbd5e1;
  border-radius: 4px;
  font-size: 13px;
  max-width: 150px;
}

.btn-issue {
  background-color: #2563eb;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
}

.btn-issue:disabled {
  background-color: #94a3b8;
  cursor: not-allowed;
}

.text-center {
  text-align: center;
  color: #64748b;
  padding: 20px 0;
}

.form-card {
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 20px;
}

.form-card h3 {
  margin: 0 0 16px 0;
  font-size: 16px;
  color: #1e293b;
}

.add-form {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
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
</style>
