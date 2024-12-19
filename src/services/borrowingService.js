import axios from '../utils/axios';

const borrowingService = {
  borrowBook: (bookId) => {
    return axios.post('/borrowings/borrow', { bookId });
  },

  returnBook: (borrowingId) => {
    return axios.post('/borrowings/return', { borrowingId });
  },

  getUserBorrowings: () => {
    return axios.get('/borrowings/my-borrowings');
  }
};

export default borrowingService;