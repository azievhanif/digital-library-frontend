import React from 'react';
import { Card, Button } from 'react-bootstrap';
import authService from '../../services/authService';

const BookCard = ({ book, onBorrow, onEdit, onDelete }) => {
  const currentUser = authService.getCurrentUser();
  const isAdmin = currentUser?.role === 'admin';

  return (
    <Card className="h-100">
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>{book.description}</Card.Text>
        <div className="d-flex justify-content-between align-items-center">
          <span className={`badge bg-${book.status === 'available' ? 'success' : 'warning'}`}>
            {book.status === 'available' ? 'Tersedia' : 'Dipinjam'}
          </span>
          <small className="text-muted">{book.genre}</small>
        </div>
        <div className="mt-3">
          {book.status === 'available' && currentUser && !isAdmin && (
            <Button variant="primary" onClick={() => onBorrow(book.id)}>
              Pinjam
            </Button>
          )}
          {isAdmin && (
            <>
              <Button variant="warning" className="me-2" onClick={() => onEdit(book)}>
                Edit
              </Button>
              <Button variant="danger" onClick={() => onDelete(book.id)}>
                Hapus
              </Button>
            </>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default BookCard;