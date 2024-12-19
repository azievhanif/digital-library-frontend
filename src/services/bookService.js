import axios from '../utils/axios';

const bookService = {
  searchBooks: (params) => {
    return axios.get('/books', { params });
  },

  createBook: (bookData) => {
    return axios.post('/books', bookData);
  },

  updateBook: (id, bookData) => {
    return axios.put(`/books/${id}`, bookData);
  },

  deleteBook: (id) => {
    return axios.delete(`/books/${id}`);
  }
};

export default bookService;