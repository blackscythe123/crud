import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [
      { id: 1, text: 'Study Web Application Development', done: false },
      { id: 2, text: 'Complete Lab Assignment', done: true }
    ],
    filter: 'all'
  }),
  getters: {
    filteredTodos: (state) => {
      if (state.filter === 'active') {
        return state.todos.filter((t) => !t.done)
      }
      if (state.filter === 'completed') {
        return state.todos.filter((t) => t.done)
      }
      return state.todos
    },
    totalCount: (state) => state.todos.length,
    pendingCount: (state) => state.todos.filter((t) => !t.done).length,
    completedCount: (state) => state.todos.filter((t) => t.done).length
  },
  actions: {
    addTodo(text) {
      if (!text || !text.trim()) return
      this.todos.push({
        id: Date.now(),
        text: text.trim(),
        done: false
      })
    },
    toggleTodo(id) {
      const item = this.todos.find((t) => t.id === id)
      if (item) {
        item.done = !item.done
      }
    },
    deleteTodo(id) {
      this.todos = this.todos.filter((t) => t.id !== id)
    },
    setFilter(filterName) {
      this.filter = filterName
    },
    clearCompleted() {
      this.todos = this.todos.filter((t) => !t.done)
    }
  }
})
