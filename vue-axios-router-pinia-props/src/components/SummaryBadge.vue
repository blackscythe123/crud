<script setup>
defineProps({
  count: {
    type: [Number, String],
    required: true
  },
  label: {
    type: String,
    required: true
  }
})
</script>

<template>
  <div class="summary-badge">
    <span class="count">{{ count }}</span>
    <span class="label">{{ label }}</span>
  </div>
</template>

<style scoped>
.summary-badge {
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #f0f4f8;
  border: 1px solid #d0d7de;
  border-radius: 8px;
  padding: 16px 24px;
  min-width: 140px;
}
.count {
  font-size: 2rem;
  font-weight: bold;
  color: #0969da;
}
.label {
  font-size: 0.9rem;
  color: #57606a;
  margin-top: 4px;
}
</style>
