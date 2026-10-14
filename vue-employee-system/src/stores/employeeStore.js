import { defineStore } from 'pinia'

export const useEmployeeStore = defineStore('employee', {
  state: () => ({
    employees: [
      { id: 1, name: 'Alice Smith', department: 'Engineering', experience: 4, baseSalary: 60000 },
      { id: 2, name: 'Bob Jones', department: 'HR', experience: 2, baseSalary: 45000 },
      { id: 3, name: 'Charlie Brown', department: 'Marketing', experience: 5, baseSalary: 52000 },
      { id: 4, name: 'Diana Prince', department: 'Finance', experience: 1, baseSalary: 58000 }
    ],
    departments: ['All', 'Engineering', 'HR', 'Marketing', 'Finance'],
    selectedDept: 'All'
  }),
  getters: {
    filteredEmployees(state) {
      if (state.selectedDept === 'All') {
        return state.employees
      }
      return state.employees.filter(emp => emp.department === state.selectedDept)
    },
    totalEmployees(state) {
      return state.employees.length
    },
    totalPayroll() {
      return this.employees.reduce((sum, emp) => sum + this.calculateNetSalary(emp), 0)
    },
    averageSalary() {
      if (this.totalEmployees === 0) return 0
      return this.totalPayroll / this.totalEmployees
    }
  },
  actions: {
    calculateBonus(emp) {
      return emp.experience >= 3 ? emp.baseSalary * 0.10 : emp.baseSalary * 0.05
    },
    calculateTax(emp) {
      return emp.baseSalary * 0.12
    },
    calculateNetSalary(emp) {
      const bonus = this.calculateBonus(emp)
      const tax = this.calculateTax(emp)
      return emp.baseSalary + bonus - tax
    },
    addEmployee(emp) {
      this.employees.push(emp)
    },
    deleteEmployee(id) {
      this.employees = this.employees.filter(emp => emp.id !== id)
    },
    setDepartment(dept) {
      this.selectedDept = dept
    }
  }
})
