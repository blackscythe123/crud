import { defineStore } from 'pinia'

export const useMemoryStore = defineStore('memory', {
  state: () => ({
    symbols: ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊'],
    cards: [],
    flippedCards: [],
    moves: 0,
    matches: 0,
    isLocked: false
  }),
  getters: {
    isGameOver: (state) => state.matches === state.symbols.length
  },
  actions: {
    initGame() {
      const duplicated = [...this.symbols, ...this.symbols]
      duplicated.sort(() => 0.5 - Math.random())

      this.cards = duplicated.map((symbol, idx) => ({
        id: idx,
        symbol: symbol,
        isFlipped: false,
        isMatched: false
      }))

      this.flippedCards = []
      this.moves = 0
      this.matches = 0
      this.isLocked = false
    },

    flipCard(card) {
      if (this.isLocked || card.isFlipped || card.isMatched) return

      card.isFlipped = true
      this.flippedCards.push(card)

      if (this.flippedCards.length === 2) {
        this.moves++
        this.checkMatch()
      }
    },

    checkMatch() {
      const [card1, card2] = this.flippedCards

      if (card1.symbol === card2.symbol) {
        card1.isMatched = true
        card2.isMatched = true
        this.matches++
        this.flippedCards = []
      } else {
        this.isLocked = true
        setTimeout(() => {
          card1.isFlipped = false
          card2.isFlipped = false
          this.flippedCards = []
          this.isLocked = false
        }, 800)
      }
    }
  }
})
