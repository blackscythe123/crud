<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  fields: {
    type: Array,
    required: true
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['submit-form'])

const formData = reactive({})

const initForm = () => {
  for (const key of Object.keys(formData)) {
    delete formData[key]
  }
  props.fields.forEach(field => {
    formData[field.key] = ''
  })
}

watch(() => props.fields, initForm, { immediate: true })

const handleSubmit = () => {
  emit('submit-form', { ...formData })
  initForm()
}
</script>

<template>
  <div class="entity-form-container">
    <h3 v-if="title" class="form-title">{{ title }}</h3>
    <form @submit.prevent="handleSubmit" class="entity-form">
      <div v-for="field in fields" :key="field.key" class="form-group">
        <label :for="field.key">{{ field.label }}</label>
        <input
          :id="field.key"
          v-model="formData[field.key]"
          :type="field.type || 'text'"
          :placeholder="field.placeholder || ''"
          required
        />
      </div>
      <button type="submit" class="btn-submit">Submit</button>
    </form>
  </div>
</template>

<style scoped>
.entity-form-container {
  background-color: #f6f8fa;
  border: 1px solid #d0d7de;
  border-radius: 6px;
  padding: 16px;
  margin-bottom: 24px;
}
.form-title {
  margin-bottom: 12px;
  font-size: 1.1rem;
}
.entity-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.form-group label {
  font-weight: 600;
  font-size: 0.9rem;
}
.form-group input {
  padding: 8px 10px;
  border: 1px solid #d0d7de;
  border-radius: 4px;
  font-size: 0.95rem;
}
.btn-submit {
  align-self: flex-start;
  background-color: #1f883d;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 600;
  font-size: 0.9rem;
}
.btn-submit:hover {
  background-color: #1a7f37;
}
</style>
