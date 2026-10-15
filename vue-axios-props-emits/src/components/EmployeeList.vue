<template>
  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Department</th>
          <th>Salary</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="employees.length === 0">
          <td colspan="6" class="empty">No employees found</td>
        </tr>
        <tr v-for="emp in employees" :key="emp.id">
          <td>{{ emp.id }}</td>
          <td>{{ emp.name }}</td>
          <td>{{ emp.email }}</td>
          <td>{{ getDepartmentName(emp.departmentId) }}</td>
          <td>${{ Number(emp.salary).toLocaleString() }}</td>
          <td>
            <button @click="emit('delete-employee', emp.id)" class="btn btn-danger">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps(['employees', 'departments'])
const emit = defineEmits(['delete-employee'])

const getDepartmentName = (deptId) => {
  if (!props.departments) return `Dept #${deptId}`
  const dept = props.departments.find((d) => String(d.id) === String(deptId))
  return dept ? dept.name : `Dept #${deptId}`
}
</script>

<style scoped>
.table-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  font-size: 13px;
  margin-top: 8px;
}

th, td {
  text-align: left;
  padding: 8px 10px;
  border-bottom: 1px solid #eeeeee;
}

th {
  background-color: #fafbfc;
  color: #555555;
  font-weight: 600;
}

.empty {
  text-align: center;
  color: #888888;
  padding: 16px;
}

.btn {
  padding: 8px 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  transition: background-color 0.15s ease;
}

.btn-danger {
  background-color: #d9383a;
  color: #ffffff;
  padding: 4px 8px;
  font-size: 12px;
}

.btn-danger:hover {
  background-color: #b8282a;
}
</style>
