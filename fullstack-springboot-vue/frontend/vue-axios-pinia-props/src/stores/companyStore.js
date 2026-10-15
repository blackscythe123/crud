import { defineStore } from 'pinia'
import api from '../services/api'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    departments: [],
    employees: []
  }),
  actions: {
    async fetchDepartments() {
      const response = await api.get('/departments')
      this.departments = response.data
    },
    async createDepartment(department) {
      const response = await api.post('/departments', department)
      this.departments.push(response.data)
    },
    async deleteDepartment(id) {
      await api.delete(`/departments/${id}`)
      this.departments = this.departments.filter(dept => dept.id !== id)
    },
    async fetchEmployees() {
      const response = await api.get('/employees')
      this.employees = response.data
    },
    async createEmployee(employee) {
      const response = await api.post('/employees', employee)
      this.employees.push(response.data)
    },
    async deleteEmployee(id) {
      await api.delete(`/employees/${id}`)
      this.employees = this.employees.filter(emp => emp.id !== id)
    }
  }
})
