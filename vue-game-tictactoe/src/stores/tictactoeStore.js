import { defineStore } from 'pinia'

export const useTicTacToeStore = defineStore('tictactoe', {
  state: () => ({
    board: Array(9).fill(''),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    winningConditions: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ]
  }),
  actions: {
    checkWin() {
      for (const [a, b, c] of this.winningConditions) {
        if (this.board[a] && this.board[a] === this.board[b] && this.board[b] === this.board[c]) {
          this.winner = this.currentPlayer
          return true
        }
      }
      return false
    },
    checkDraw() {
      if (!this.board.includes('')) {
        this.isDraw = true
        return true
      }
      return false
    },
    makeMove(index) {
      if (this.board[index] !== '' || this.winner || this.isDraw) {
        return
      }

      this.board[index] = this.currentPlayer

      if (this.checkWin()) {
        return
      }

      if (this.checkDraw()) {
        return
      }

      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
    },
    resetBoard() {
      this.board = Array(9).fill('')
      this.currentPlayer = 'X'
      this.winner = null
      this.isDraw = false
    }
  }
})
