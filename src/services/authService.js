import axios from '../utils/axios';

const register = (name, email, password) => {
  return axios.post('/users/register', { name, email, password });
};

const login = (email, password) => {
  return axios.post('/users/login', { email, password });
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

export default {
  register,
  login,
  logout,
  getCurrentUser,
};