import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Alert, Button } from 'react-bootstrap';
import BookSearch from './BookSearch';
import BookCard from './BookCard';
import BookForm from './BookForm';
import bookService from '../../services/bookService';
import borrowingService from '../../services/borrowingService';
import authService from '../../services/authService';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const currentUser = authService.getCurrentUser();
  const isAdmin = currentUser?.role === 'admin';

  const loadBooks = async (searchParams = {}) => {
    try {
      const response = await bookService.searchBooks(searchParams);
      setBooks(response.data);
    } catch (err) {
      setError('Gagal memuat daftar buku');
    }
  };

  const handleBorrow = async (bookId) => {
    try {
      await borrowingService.borrowBook(bookId);
      setSuccessMessage('Buku berhasil dipinjam');
      loadBooks();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal meminjam buku');
    }
  };

  const handleDelete = async (bookId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus buku ini?')) {
      try {
        await bookService.deleteBook(bookId);
        setSuccessMessage('Buku berhasil dihapus');
        loadBooks();
      } catch (err) {
        setError('Gagal menghapus buku');
      }
    }
  };

  const handleEdit = (book) => {
    setSelectedBook(book);
    setShowForm(true);
  };

  const handleAdd = () => {
    setSelectedBook(null);
    setShowForm(true);
  };

  const handleFormSubmit = async (formData) => {
    try {
      if (selectedBook) {
        await bookService.updateBook(selectedBook.id, formData);
        setSuccessMessage('Buku berhasil diperbarui');
      } else {
        await bookService.createBook(formData);
        setSuccessMessage('Buku berhasil ditambahkan');
      }
      setShowForm(false);
      loadBooks();
    } catch (err) {
      setError(selectedBook ? 'Gagal memperbarui buku' : 'Gagal menambahkan buku');
    }
  };

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        setSuccessMessage('');
        setError('');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error]);

  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Daftar Buku</h2>
        {isAdmin && (
          <Button variant="primary" onClick={handleAdd}>
            Tambah Buku
          </Button>
        )}
      </div>

      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      
      <BookSearch onSearch={loadBooks} />
      
      <Row xs={1} md={2} lg={3} className="g-4">
        {books.map(book => (
          <Col key={book.id}>
            <BookCard
              book={book}
              onBorrow={handleBorrow}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Col>
        ))}
      </Row>

      <BookForm
        show={showForm}
        onHide={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
        initialData={selectedBook}
      />
    </Container>
  );
};

export default BookList;