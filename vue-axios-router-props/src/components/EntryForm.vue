<script setup>
import { reactive, watch } from 'vue'

const props = defineProps(['fields'])
const emit = defineEmits(['submit-data'])

const formData = reactive({})

const getFieldName = (field) => {
  if (typeof field === 'string') return field
  return field.name || field.key || ''
}

const getFieldLabel = (field) => {
  if (typeof field === 'string') {
    return field.charAt(0).toUpperCase() + field.slice(1)
  }
  return field.label || field.name || field.key || ''
}

const getFieldType = (field) => {
  if (typeof field === 'object' && field.type) return field.type
  return 'text'
}

const initFormData = () => {
  if (Array.isArray(props.fields)) {
    props.fields.forEach(field => {
      const name = getFieldName(field)
      if (name && !(name in formData)) {
        formData[name] = ''
      }
    })
  }
}

watch(() => props.fields, () => {
  initFormData()
}, { immediate: true, deep: true })

const handleSubmit = () => {
  emit('submit-data', { ...formData })
  Object.keys(formData).forEach(key => {
    formData[key] = ''
  })
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="entry-form">
    <div v-for="field in fields" :key="getFieldName(field)" class="form-group">
      <label :for="getFieldName(field)">{{ getFieldLabel(field) }}</label>
      <select
        v-if="typeof field === 'object' && field.type === 'select'"
        :id="getFieldName(field)"
        v-model="formData[getFieldName(field)]"
        :required="field.required !== false"
      >
        <option value="" disabled>{{ field.placeholder || 'Select an option' }}</option>
        <option v-for="opt in field.options" :key="opt.value" :value="opt.value">
          {{ opt.label }}
        </option>
      </select>
      <input
        v-else
        :id="getFieldName(field)"
        v-model="formData[getFieldName(field)]"
        :type="getFieldType(field)"
        :placeholder="typeof field === 'object' && field.placeholder ? field.placeholder : ''"
        :required="typeof field === 'object' && field.required === false ? false : true"
      />
    </div>
    <button type="submit" class="btn-submit">Submit</button>
  </form>
</template>

<style scoped>
.entry-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background-color: #f7fafc;
  padding: 16px;
  border-radius: 6px;
  border: 1px solid #e2e8f0;
  margin-bottom: 20px;
}
.form-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
label {
  font-size: 13px;
  font-weight: 600;
  color: #4a5568;
}
input, select {
  padding: 8px 10px;
  border: 1px solid #cbd5e0;
  border-radius: 4px;
  font-size: 14px;
}
.btn-submit {
  align-self: flex-start;
  background-color: #3182ce;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
}
.btn-submit:hover {
  background-color: #2b6cb0;
}
</style>
