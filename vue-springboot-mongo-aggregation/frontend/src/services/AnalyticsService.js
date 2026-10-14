import axios from 'axios';

const API_URL = 'http://localhost:8080/api/analytics';

export default {
  getCategorySummary() {
    return axios.get(`${API_URL}/category-summary`);
  }
};
