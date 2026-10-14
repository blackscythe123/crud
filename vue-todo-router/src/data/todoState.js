import { reactive } from 'vue'

export const todoState = reactive({
  todos: [
    { id: 1, title: 'Install Node.js & Vue CLI', description: 'Ensure the environment is ready for WAD development', done: true },
    { id: 2, title: 'Build Vue Router Navigation', description: 'Implement multi-view routing and parameter handling', done: false },
    { id: 3, title: 'Prepare for Lab Exam', description: 'Review state management and component communications', done: false }
  ],

  addTodo(title, description) {
    if (!title || !title.trim()) return
    const newId = this.todos.length > 0 ? Math.max(...this.todos.map((t) => t.id)) + 1 : 1
    this.todos.push({
      id: newId,
      title: title.trim(),
      description: description ? description.trim() : '',
      done: false
    })
  },

  toggleTodo(id) {
    const item = this.todos.find((t) => t.id === Number(id))
    if (item) {
      item.done = !item.done
    }
  },

  deleteTodo(id) {
    const index = this.todos.findIndex((t) => t.id === Number(id))
    if (index !== -1) {
      this.todos.splice(index, 1)
    }
  },

  getTodoById(id) {
    return this.todos.find((t) => t.id === Number(id))
  }
})
