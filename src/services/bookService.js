import axios from '../utils/axios';

const searchBooks = (params) => {
  return axios.get('/books', { params });
};

const createBook = (bookData) => {
  return axios.post('/books', bookData);
};

const updateBook = (id, bookData) => {
  return axios.put(`/books/${id}`, bookData);
};

const deleteBook = (id) => {
  return axios.delete(`/books/${id}`);
};

export default {
  searchBooks,
  createBook,
  updateBook,
  deleteBook
};