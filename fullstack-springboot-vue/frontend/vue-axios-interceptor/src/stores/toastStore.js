import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => ({
    message: '',
    type: 'success',
    visible: false
  }),
  actions: {
    show(message, type = 'success') {
      this.message = message
      this.type = type
      this.visible = true
      setTimeout(() => {
        this.hide()
      }, 3000)
    },
    hide() {
      this.visible = false
      this.message = ''
    }
  }
})
