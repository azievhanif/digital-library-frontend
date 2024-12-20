import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Components
import NavigationBar from './components/layout/Navbar';
import PrivateRoute from './components/layout/PrivateRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import BookList from './components/books/BookList';
import BorrowingList from './components/borrowing/BorrowingList';
import Profile from './components/profile/Profile';
import HomePage from './components/home/HomePage';

function App() {
  return (
    <Router>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<BookList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/borrowings"
          element={
            <PrivateRoute>
              <BorrowingList />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;