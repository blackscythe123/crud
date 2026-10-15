<script setup>
import { useToastStore } from '../stores/toastStore'

const toastStore = useToastStore()
</script>

<template>
  <div v-if="toastStore.visible" :class="['toast-banner', toastStore.type]">
    <span>{{ toastStore.message }}</span>
    <button class="close-btn" @click="toastStore.hide">&times;</button>
  </div>
</template>

<style scoped>
.toast-banner {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 12px 18px;
  border-radius: 4px;
  color: #fff;
  z-index: 9999;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
  font-family: sans-serif;
  font-size: 14px;
}

.toast-banner.success {
  background-color: #2e7d32;
}

.toast-banner.error {
  background-color: #d32f2f;
}

.close-btn {
  background: transparent;
  border: none;
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  line-height: 1;
}
</style>
