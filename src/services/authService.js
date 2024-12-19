import axios from '../utils/axios';

const authService = {
  register: (name, email, password) => {
    return axios.post('/users/register', { name, email, password });
  },

  login: (email, password) => {
    return axios.post('/users/login', { email, password })
      .then(response => {
        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response;
      });
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem('user'));
  }
};

export default authService;