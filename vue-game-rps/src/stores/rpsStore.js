import { defineStore } from 'pinia'

export const useRpsStore = defineStore('rps', {
  state: () => ({
    choices: ['Rock', 'Paper', 'Scissors'],
    playerScore: 0,
    computerScore: 0,
    ties: 0,
    playerChoice: null,
    computerChoice: null,
    resultMessage: 'Make your choice to play!'
  }),
  actions: {
    playRound(choice) {
      this.playerChoice = choice
      const randomIndex = Math.floor(Math.random() * this.choices.length)
      this.computerChoice = this.choices[randomIndex]

      if (this.playerChoice === this.computerChoice) {
        this.ties++
        this.resultMessage = "It's a tie!"
      } else if (
        (this.playerChoice === 'Rock' && this.computerChoice === 'Scissors') ||
        (this.playerChoice === 'Paper' && this.computerChoice === 'Rock') ||
        (this.playerChoice === 'Scissors' && this.computerChoice === 'Paper')
      ) {
        this.playerScore++
        this.resultMessage = 'You win!'
      } else {
        this.computerScore++
        this.resultMessage = 'Computer wins!'
      }
    },
    resetGame() {
      this.playerScore = 0
      this.computerScore = 0
      this.ties = 0
      this.playerChoice = null
      this.computerChoice = null
      this.resultMessage = 'Make your choice to play!'
    }
  }
})
