import { defineStore } from 'pinia'

export const useSymposiumStore = defineStore('symposium', {
  state: () => ({
    events: [
      { id: 'EVT-1', title: 'CodeSprint Hackathon', category: 'Technical', fee: 100 },
      { id: 'EVT-2', title: 'Web Design Challenge', category: 'Technical', fee: 50 },
      { id: 'EVT-3', title: 'Tech Quiz Mania', category: 'Technical', fee: 30 },
      { id: 'EVT-4', title: 'Gaming Tournament', category: 'Non-Technical', fee: 50 }
    ],
    registrations: [
      {
        id: 1,
        studentName: 'John Doe',
        college: 'SSN College of Engineering',
        email: 'john@example.com',
        eventId: 'EVT-1',
        eventTitle: 'CodeSprint Hackathon'
      }
    ]
  }),
  getters: {
    totalRegistrations: (state) => state.registrations.length,
    registrationsByEvent: (state) => (eventId) => {
      return state.registrations.filter((reg) => reg.eventId === eventId)
    }
  },
  actions: {
    registerStudent(student) {
      const matchedEvent = this.events.find((e) => e.id === student.eventId)
      this.registrations.push({
        id: Date.now(),
        studentName: student.studentName.trim(),
        college: student.college.trim(),
        email: student.email.trim(),
        eventId: student.eventId,
        eventTitle: matchedEvent ? matchedEvent.title : ''
      })
    },
    deleteRegistration(id) {
      this.registrations = this.registrations.filter((reg) => reg.id !== id)
    }
  }
})
