import axios from '../utils/axios';

const borrowBook = (bookId) => {
  return axios.post('/borrowings/borrow', { bookId });
};

const returnBook = (borrowingId) => {
  return axios.post('/borrowings/return', { borrowingId });
};

const getUserBorrowings = () => {
  return axios.get('/borrowings/my-borrowings');
};

export default {
  borrowBook,
  returnBook,
  getUserBorrowings
};