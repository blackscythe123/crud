import axios from 'axios'

const apiClient = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

export default {
  getDepartments() {
    return apiClient.get('/departments')
  },
  createDepartment(data) {
    return apiClient.post('/departments', data)
  },
  deleteDepartment(id) {
    return apiClient.delete(`/departments/${id}`)
  },
  getEmployees() {
    return apiClient.get('/employees')
  },
  createEmployee(data) {
    return apiClient.post('/employees', data)
  },
  deleteEmployee(id) {
    return apiClient.delete(`/employees/${id}`)
  }
}
