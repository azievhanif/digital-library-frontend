import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import borrowingService from '../../services/borrowingService';

const BorrowingList = () => {
  const [borrowings, setBorrowings] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const loadBorrowings = async () => {
    try {
      const response = await borrowingService.getUserBorrowings();
      setBorrowings(response.data);
    } catch (err) {
      setError('Gagal memuat daftar peminjaman');
    }
  };

  const handleReturn = async (borrowingId) => {
    try {
      await borrowingService.returnBook(borrowingId);
      setSuccessMessage('Buku berhasil dikembalikan');
      loadBorrowings();
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal mengembalikan buku');
    }
  };

  useEffect(() => {
    loadBorrowings();
  }, []);

  return (
    <Container className="py-4">
      <h2 className="mb-4">Riwayat Peminjaman</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Judul Buku</th>
            <th>Tanggal Pinjam</th>
            <th>Tanggal Kembali</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {borrowings.map(borrowing => (
            <tr key={borrowing.id}>
              <td>{borrowing.Book.title}</td>
              <td>{new Date(borrowing.borrowDate).toLocaleDateString()}</td>
              <td>
                {borrowing.returnDate 
                  ? new Date(borrowing.returnDate).toLocaleDateString()
                  : '-'
                }
              </td>
              <td>
                <span className={`badge bg-${borrowing.status === 'active' ? 'warning' : 'success'}`}>
                  {borrowing.status === 'active' ? 'Dipinjam' : 'Dikembalikan'}
                </span>
              </td>
              <td>
                {borrowing.status === 'active' && (
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => handleReturn(borrowing.id)}
                  >
                    Kembalikan
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default BorrowingList;