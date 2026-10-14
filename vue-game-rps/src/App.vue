<template>
  <div class="container">
    <h1>Vue Rock Paper Scissors</h1>

    <div class="scoreboard">
      <div class="score-card">
        <span class="label">Player:</span>
        <span class="value">{{ store.playerScore }}</span>
      </div>
      <div class="score-card">
        <span class="label">Computer:</span>
        <span class="value">{{ store.computerScore }}</span>
      </div>
      <div class="score-card">
        <span class="label">Ties:</span>
        <span class="value">{{ store.ties }}</span>
      </div>
    </div>

    <div class="choices">
      <button @click="store.playRound('Rock')">✊ Rock</button>
      <button @click="store.playRound('Paper')">✋ Paper</button>
      <button @click="store.playRound('Scissors')">✌ Scissors</button>
    </div>

    <div class="results">
      <div v-if="store.playerChoice && store.computerChoice" class="matchup">
        <p>Player: <strong>{{ store.playerChoice }}</strong></p>
        <p>Computer: <strong>{{ store.computerChoice }}</strong></p>
      </div>
      <p class="message">{{ store.resultMessage }}</p>
    </div>

    <button class="reset-btn" @click="store.resetGame">Reset Game</button>
  </div>
</template>

<script setup>
import { useRpsStore } from './stores/rpsStore'

const store = useRpsStore()
</script>

<style scoped>
.container {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
  font-family: Arial, sans-serif;
}

.scoreboard {
  display: flex;
  justify-content: space-around;
  margin: 20px 0;
  padding: 12px;
  background: #f0f0f0;
  border-radius: 6px;
}

.score-card {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.label {
  font-weight: bold;
}

.value {
  font-size: 1.4rem;
}

.choices {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin: 20px 0;
}

button {
  padding: 10px 16px;
  font-size: 1rem;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 4px;
  background: #fff;
}

button:hover {
  background: #e9e9e9;
}

.results {
  margin: 20px 0;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background: #fafafa;
}

.matchup {
  display: flex;
  justify-content: space-around;
  margin-bottom: 10px;
}

.message {
  font-size: 1.2rem;
  font-weight: bold;
  margin: 5px 0 0;
}

.reset-btn {
  background: #e74c3c;
  color: #fff;
  border: none;
}

.reset-btn:hover {
  background: #c0392b;
}
</style>
