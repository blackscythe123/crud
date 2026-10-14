import { defineStore } from 'pinia'

export const useMoleStore = defineStore('mole', {
  state: () => ({
    score: 0,
    timeLeft: 30,
    isPlaying: false,
    activeHoleIndex: -1,
    timerInterval: null,
    moleTimeout: null
  }),
  actions: {
    startGame() {
      if (this.isPlaying) return
      this.stopGame()
      this.score = 0
      this.timeLeft = 30
      this.isPlaying = true
      this.peepMole()

      this.timerInterval = setInterval(() => {
        this.timeLeft--
        if (this.timeLeft <= 0) {
          this.stopGame()
        }
      }, 1000)
    },
    peepMole() {
      if (!this.isPlaying) return

      let nextHole
      do {
        nextHole = Math.floor(Math.random() * 9)
      } while (nextHole === this.activeHoleIndex)

      this.activeHoleIndex = nextHole
      const stayTime = Math.floor(Math.random() * 400) + 700

      clearTimeout(this.moleTimeout)
      this.moleTimeout = setTimeout(() => {
        if (!this.isPlaying) return
        this.activeHoleIndex = -1
        this.peepMole()
      }, stayTime)
    },
    whackMole(index) {
      if (this.isPlaying && index === this.activeHoleIndex) {
        this.score++
        this.activeHoleIndex = -1
        clearTimeout(this.moleTimeout)
        this.moleTimeout = setTimeout(() => {
          if (this.isPlaying) {
            this.peepMole()
          }
        }, 200)
      }
    },
    stopGame() {
      if (this.timerInterval) {
        clearInterval(this.timerInterval)
        this.timerInterval = null
      }
      if (this.moleTimeout) {
        clearTimeout(this.moleTimeout)
        this.moleTimeout = null
      }
      this.isPlaying = false
      this.activeHoleIndex = -1
    }
  }
})
