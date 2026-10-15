<script setup>
const props = defineProps(['title', 'subtitle', 'id'])
const emit = defineEmits(['remove'])

const handleRemove = () => {
  emit('remove', props.id)
}
</script>

<template>
  <div class="data-card">
    <div class="card-info">
      <h4>{{ title }}</h4>
      <p>{{ subtitle }}</p>
    </div>
    <button class="btn-remove" @click="handleRemove">Delete</button>
  </div>
</template>

<style scoped>
.data-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #e2e8f0;
  border-radius: 6px;
  padding: 12px 16px;
  margin-bottom: 10px;
  background-color: #fff;
}
.card-info h4 {
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #2d3748;
}
.card-info p {
  margin: 0;
  font-size: 14px;
  color: #718096;
}
.btn-remove {
  background-color: #e53e3e;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 13px;
}
.btn-remove:hover {
  background-color: #c53030;
}
</style>
