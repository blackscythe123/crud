<script setup>
import { useTicTacToeStore } from './stores/tictactoeStore'

const store = useTicTacToeStore()
</script>

<template>
  <div class="game-container">
    <h1>Vue Tic Tac Toe</h1>

    <div class="status">
      <span v-if="store.winner">Player {{ store.winner }} Wins! 🎉</span>
      <span v-else-if="store.isDraw">Game Draw! 🤝</span>
      <span v-else>Player {{ store.currentPlayer }}'s Turn</span>
    </div>

    <div class="board">
      <button
        v-for="(cell, index) in store.board"
        :key="index"
        type="button"
        class="cell"
        :disabled="cell !== '' || !!store.winner || store.isDraw"
        @click="store.makeMove(index)"
      >
        {{ cell }}
      </button>
    </div>

    <button type="button" class="btn-reset" @click="store.resetBoard">Reset Game</button>
  </div>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  margin: 0;
  background-color: #f5f5f5;
}

.game-container {
  text-align: center;
  background: #ffffff;
  padding: 30px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

h1 {
  margin-top: 0;
}

.status {
  margin: 15px 0;
  font-size: 20px;
  font-weight: bold;
}

.board {
  display: grid;
  grid-template-columns: repeat(3, 80px);
  gap: 8px;
  margin: 20px auto;
  width: 256px;
}

.cell {
  width: 80px;
  height: 80px;
  background-color: #f9f9f9;
  border: 2px solid #555;
  font-size: 36px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
}

.cell:hover:not(:disabled) {
  background-color: #eee;
}

.cell:disabled {
  cursor: not-allowed;
}

.btn-reset {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.btn-reset:hover {
  background-color: #555;
}
</style>
