<script setup>
import { ref, computed } from 'vue'
import { useFoodStore } from '../stores/foodStore'

const store = useFoodStore()
const selectedCategory = ref('All')

const filteredItems = computed(() => {
  if (selectedCategory.value === 'All') {
    return store.menuItems
  }
  return store.menuItems.filter((item) => item.category === selectedCategory.value)
})

const selectCategory = (category) => {
  selectedCategory.value = category
}
</script>

<template>
  <div class="menu-container">
    <h2>Menu</h2>
    
    <div class="category-tabs">
      <button
        v-for="cat in store.categories"
        :key="cat"
        :class="{ active: selectedCategory === cat }"
        class="tab-btn"
        @click="selectCategory(cat)"
      >
        {{ cat }}
      </button>
    </div>

    <div class="menu-grid">
      <div v-for="item in filteredItems" :key="item.id" class="menu-card">
        <div class="card-header">
          <h3>{{ item.name }}</h3>
          <span class="category-tag">{{ item.category }}</span>
        </div>
        <p class="description">{{ item.description }}</p>
        <div class="card-footer">
          <span class="price">${{ item.price.toFixed(2) }}</span>
          <button class="add-btn" @click="store.addToCart(item)">Add to Order</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.menu-container {
  padding: 1rem 0;
}

.category-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  background-color: #f8f9fa;
  cursor: pointer;
  border-radius: 4px;
}

.tab-btn.active {
  background-color: #007bff;
  color: #fff;
  border-color: #007bff;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.menu-card {
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #fff;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.card-header h3 {
  margin: 0;
  font-size: 1.1rem;
}

.category-tag {
  font-size: 0.75rem;
  background-color: #e9ecef;
  padding: 0.2rem 0.5rem;
  border-radius: 3px;
  color: #495057;
}

.description {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  flex-grow: 1;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-weight: bold;
  font-size: 1.1rem;
  color: #28a745;
}

.add-btn {
  padding: 0.4rem 0.8rem;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.add-btn:hover {
  background-color: #218838;
}
</style>
