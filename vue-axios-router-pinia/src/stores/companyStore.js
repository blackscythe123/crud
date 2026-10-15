import { defineStore } from 'pinia'
import api from '../services/api'

export const useCompanyStore = defineStore('company', {
  state: () => ({
    departments: [],
    employees: []
  }),
  getters: {
    totalDepts: (state) => state.departments.length,
    totalEmployees: (state) => state.employees.length,
    getDepartmentName: (state) => (deptId) => {
      const dept = state.departments.find((d) => d.id === deptId)
      return dept ? dept.name : `Dept #${deptId}`
    }
  },
  actions: {
    async fetchDepartments() {
      try {
        const response = await api.get('/departments')
        this.departments = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async addDepartment(dept) {
      try {
        const response = await api.post('/departments', dept)
        await this.fetchDepartments()
        return response.data
      } catch (error) {
        console.error(error)
      }
    },
    async deleteDepartment(id) {
      try {
        await api.delete(`/departments/${id}`)
        await this.fetchDepartments()
        await this.fetchEmployees()
      } catch (error) {
        console.error(error)
      }
    },
    async fetchEmployees() {
      try {
        const response = await api.get('/employees')
        this.employees = response.data
      } catch (error) {
        console.error(error)
      }
    },
    async addEmployee(emp) {
      try {
        const response = await api.post('/employees', emp)
        await this.fetchEmployees()
        return response.data
      } catch (error) {
        console.error(error)
      }
    },
    async deleteEmployee(id) {
      try {
        await api.delete(`/employees/${id}`)
        await this.fetchEmployees()
      } catch (error) {
        console.error(error)
      }
    }
  }
})
