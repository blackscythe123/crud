<template>
  <div class="game-container">
    <h1>Vue Whack A Mole</h1>

    <div class="status-bar">
      <span>Score: {{ store.score }}</span>
      <span>Time Left: {{ store.timeLeft }}s</span>
    </div>

    <button class="start-btn" :disabled="store.isPlaying" @click="store.startGame()">
      Start Game
    </button>

    <div class="grid">
      <div
        v-for="i in 9"
        :key="i - 1"
        class="hole"
        @click="store.whackMole(i - 1)"
      >
        <span v-if="store.activeHoleIndex === i - 1" class="mole">🐹</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMoleStore } from './stores/moleStore'

const store = useMoleStore()
</script>

<style>
body {
  margin: 0;
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f0f2f5;
}

.game-container {
  text-align: center;
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  width: 320px;
}

h1 {
  margin-top: 0;
  margin-bottom: 16px;
  font-size: 24px;
}

.status-bar {
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
  font-size: 16px;
  font-weight: bold;
}

.start-btn {
  padding: 10px 20px;
  font-size: 16px;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-bottom: 20px;
}

.start-btn:disabled {
  background-color: #a8d5c2;
  cursor: not-allowed;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.hole {
  width: 80px;
  height: 80px;
  background-color: #795548;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  user-select: none;
}

.mole {
  font-size: 40px;
}
</style>
