<script setup>
defineProps({
  items: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['delete-item', 'patch-item'])

const getColKey = (col) => (typeof col === 'object' && col.key ? col.key : col)
const getColLabel = (col) => (typeof col === 'object' && col.label ? col.label : col)

const handleDelete = (id) => {
  emit('delete-item', id)
}
</script>

<template>
  <div class="entity-table-container">
    <h3 v-if="title" class="table-title">{{ title }}</h3>
    <table v-if="items && items.length > 0" class="entity-table">
      <thead>
        <tr>
          <th v-for="col in columns" :key="getColKey(col)">
            {{ getColLabel(col) }}
          </th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td v-for="col in columns" :key="getColKey(col)">
            {{ item[getColKey(col)] }}
          </td>
          <td>
            <button @click="$emit('patch-item', item)" class="btn-patch">Patch</button>
            <button class="btn-delete" @click="handleDelete(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else class="empty-msg">No records found.</p>
  </div>
</template>

<style scoped>
.entity-table-container {
  margin-top: 16px;
}
.table-title {
  margin-bottom: 12px;
  font-size: 1.2rem;
}
.entity-table {
  width: 100%;
  border-collapse: collapse;
}
.entity-table th,
.entity-table td {
  border: 1px solid #d0d7de;
  padding: 10px 12px;
  text-align: left;
}
.entity-table th {
  background-color: #f6f8fa;
  font-weight: 600;
}
.btn-patch {
  background-color: #0969da;
  color: #ffffff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
  margin-right: 6px;
}
.btn-patch:hover {
  background-color: #0856b3;
}
.btn-delete {
  background-color: #cf222e;
  color: #ffffff;
  border: none;
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.85rem;
}
.btn-delete:hover {
  background-color: #a40e26;
}
.empty-msg {
  color: #57606a;
  padding: 12px 0;
}
</style>
