import { defineStore } from 'pinia'

export const useLibraryStore = defineStore('library', {
  state: () => ({
    books: [
      { id: 1, title: 'Clean Code', author: 'Robert C. Martin', isbn: '978-0132350884', copies: 3, category: 'Computer Science' },
      { id: 2, title: 'JavaScript: The Good Parts', author: 'Douglas Crockford', isbn: '978-0596517748', copies: 2, category: 'Web Dev' },
      { id: 3, title: 'Introduction to Algorithms', author: 'CLRS', isbn: '978-0262033848', copies: 1, category: 'Algorithms' }
    ],
    members: [
      { id: 'MEM-101', name: 'David Miller', email: 'david@example.com', membershipType: 'Premium', borrowedBooks: [] }
    ],
    borrowedRecords: [
      { id: 1, memberId: 'MEM-101', bookTitle: 'Clean Code', issueDate: '2026-10-01', returnDue: '2026-10-15', fine: 0, returned: false }
    ]
  }),
  getters: {
    availableBooks: (state) => state.books.filter((b) => b.copies > 0),
    activeLoansCount: (state) => state.borrowedRecords.filter((r) => !r.returned).length,
    totalFines: (state) => state.borrowedRecords.reduce((sum, r) => sum + (r.fine || 0), 0)
  },
  actions: {
    registerMember(member) {
      const newMember = {
        id: member.id || `MEM-${100 + this.members.length + 1}`,
        name: member.name,
        email: member.email,
        membershipType: member.membershipType || 'Standard',
        borrowedBooks: []
      }
      this.members.push(newMember)
      return newMember
    },
    issueBook(bookId, memberId) {
      const book = this.books.find((b) => b.id === Number(bookId))
      const member = this.members.find((m) => m.id === memberId)
      if (!book || book.copies <= 0 || !member) {
        return false
      }
      book.copies--
      const today = new Date()
      const issueDate = today.toISOString().split('T')[0]
      const due = new Date(today)
      due.setDate(due.getDate() + 14)
      const returnDue = due.toISOString().split('T')[0]

      const record = {
        id: Date.now(),
        memberId: member.id,
        bookTitle: book.title,
        issueDate,
        returnDue,
        fine: 0,
        returned: false
      }
      this.borrowedRecords.push(record)
      if (!member.borrowedBooks) {
        member.borrowedBooks = []
      }
      member.borrowedBooks.push(book.title)
      return true
    },
    returnBook(recordId, daysLate = 0) {
      const record = this.borrowedRecords.find((r) => r.id === Number(recordId))
      if (!record || record.returned) {
        return false
      }
      const late = Math.max(0, Number(daysLate) || 0)
      record.fine = late * 2
      record.returned = true

      const book = this.books.find((b) => b.title === record.bookTitle)
      if (book) {
        book.copies++
      }

      const member = this.members.find((m) => m.id === record.memberId)
      if (member && Array.isArray(member.borrowedBooks)) {
        const index = member.borrowedBooks.indexOf(record.bookTitle)
        if (index !== -1) {
          member.borrowedBooks.splice(index, 1)
        }
      }
      return true
    }
  }
})
