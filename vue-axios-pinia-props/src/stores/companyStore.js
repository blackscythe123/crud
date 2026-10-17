import { defineStore } from 'pinia'
import api from '../services/api'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    departments: [],
    employees: [],
    loading: false,
    error: null
  }),
  getters: {
    totalDepartments: (state) => state.departments.length,
    totalEmployees: (state) => state.employees.length,
    totalPayroll: (state) => state.employees.reduce((sum, emp) => sum + (Number(emp.salary) || 0), 0)
  },
  actions: {
    async fetchDepartments() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/departments')
        this.departments = response.data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
      } finally {
        this.loading = false
      }
    },
    async createDepartment(data) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('/departments', data)
        this.departments.push(response.data)
        return response.data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },
    async deleteDepartment(id) {
      this.loading = true
      this.error = null
      try {
        await api.delete(`/departments/${id}`)
        this.departments = this.departments.filter(dept => dept.id !== id)
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },
    async fetchEmployees() {
      this.loading = true
      this.error = null
      try {
        const response = await api.get('/employees')
        this.employees = response.data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
      } finally {
        this.loading = false
      }
    },
    async createEmployee(data) {
      this.loading = true
      this.error = null
      try {
        const response = await api.post('/employees', data)
        this.employees.push(response.data)
        return response.data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },
    async deleteEmployee(id) {
      this.loading = true
      this.error = null
      try {
        await api.delete(`/employees/${id}`)
        this.employees = this.employees.filter(emp => emp.id !== id)
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },
    async patchDepartment(id, data) {
      this.loading = true
      this.error = null
      try {
        const response = await api.patch(`/departments/${id}`, data)
        const idx = this.departments.findIndex(dept => dept.id === id)
        if (idx !== -1) this.departments[idx] = response.data
        return response.data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    },
    async patchEmployee(id, data) {
      this.loading = true
      this.error = null
      try {
        const response = await api.patch(`/employees/${id}`, data)
        const idx = this.employees.findIndex(emp => emp.id === id)
        if (idx !== -1) this.employees[idx] = response.data
        return response.data
      } catch (err) {
        this.error = err.response?.data?.message || err.message
        throw err
      } finally {
        this.loading = false
      }
    }
  }
})
