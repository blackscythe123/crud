<script setup>
import { onMounted } from 'vue'
import { useMemoryStore } from './stores/memoryStore'

const store = useMemoryStore()

onMounted(() => {
  store.initGame()
})
</script>

<template>
  <div class="game-wrapper">
    <h1>Vue Pinia Memory Game</h1>

    <div class="stats">
      <span>Moves: {{ store.moves }}</span>
      <span>Matches: {{ store.matches }} / {{ store.symbols.length }}</span>
    </div>

    <button type="button" class="btn" @click="store.initGame()">Restart Game</button>

    <div v-if="store.isGameOver" class="win-banner">
      🎉 You won in {{ store.moves }} moves!
    </div>

    <div class="grid">
      <div
        v-for="card in store.cards"
        :key="card.id"
        class="card"
        :class="{ flipped: card.isFlipped, matched: card.isMatched }"
        @click="store.flipCard(card)"
      >
        {{ card.isFlipped || card.isMatched ? card.symbol : '?' }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.game-wrapper {
  max-width: 360px;
  margin: 30px auto;
  text-align: center;
  font-family: Arial, sans-serif;
}

.stats {
  display: flex;
  justify-content: space-around;
  font-size: 18px;
  font-weight: bold;
  margin: 15px 0;
}

.btn {
  padding: 8px 16px;
  background-color: #2980b9;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-bottom: 20px;
}

.win-banner {
  padding: 10px;
  background-color: #d4edda;
  color: #155724;
  margin-bottom: 15px;
  border-radius: 4px;
  font-weight: bold;
}

.grid {
  display: grid;
  grid-template-columns: repeat(4, 75px);
  gap: 10px;
  justify-content: center;
}

.card {
  width: 75px;
  height: 75px;
  background-color: #34495e;
  color: white;
  font-size: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  cursor: pointer;
  user-select: none;
}

.card.flipped {
  background-color: #ecf0f1;
  color: #2c3e50;
}

.card.matched {
  background-color: #2ecc71;
  color: white;
}
</style>
