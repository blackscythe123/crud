import { defineStore } from 'pinia'
import api from '../services/api'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    departments: [
      { id: 1, name: 'Engineering', code: 'ENG', budget: 150000 },
      { id: 2, name: 'Marketing', code: 'MKT', budget: 80000 },
      { id: 3, name: 'Human Resources', code: 'HR', budget: 60000 }
    ],
    employees: [
      { id: 1, name: 'Alice Smith', email: 'alice@example.com', role: 'Lead Architect', department: 'Engineering' },
      { id: 2, name: 'Bob Jones', email: 'bob@example.com', role: 'Marketing Specialist', department: 'Marketing' },
      { id: 3, name: 'Charlie Brown', email: 'charlie@example.com', role: 'HR Coordinator', department: 'Human Resources' }
    ],
    loading: false,
    error: null
  }),
  getters: {
    totalDepartments: (state) => state.departments.length,
    totalEmployees: (state) => state.employees.length,
    totalBudget: (state) => state.departments.reduce((sum, d) => sum + Number(d.budget || 0), 0)
  },
  actions: {
    async fetchDepartments() {
      this.loading = true
      try {
        const response = await api.getDepartments()
        this.departments = response.data
        this.error = null
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async addDepartment(dept) {
      try {
        const response = await api.createDepartment(dept)
        this.departments.push(response.data)
      } catch (err) {
        const newDept = { ...dept, id: dept.id || Date.now() }
        this.departments.push(newDept)
      }
    },
    async removeDepartment(id) {
      try {
        await api.deleteDepartment(id)
        this.departments = this.departments.filter(d => d.id !== id)
      } catch (err) {
        this.departments = this.departments.filter(d => d.id !== id)
      }
    },
    async fetchEmployees() {
      this.loading = true
      try {
        const response = await api.getEmployees()
        this.employees = response.data
        this.error = null
      } catch (err) {
        this.error = err.message
      } finally {
        this.loading = false
      }
    },
    async addEmployee(emp) {
      try {
        const response = await api.createEmployee(emp)
        this.employees.push(response.data)
      } catch (err) {
        const newEmp = { ...emp, id: emp.id || Date.now() }
        this.employees.push(newEmp)
      }
    },
    async removeEmployee(id) {
      try {
        await api.deleteEmployee(id)
        this.employees = this.employees.filter(e => e.id !== id)
      } catch (err) {
        this.employees = this.employees.filter(e => e.id !== id)
      }
    }
  }
})
