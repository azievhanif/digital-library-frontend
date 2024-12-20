import React, { useState } from 'react';
import { Card, Badge } from 'react-bootstrap';
import authService from '../../services/authService';
import BookDetail from './BookDetail';

const BookCard = ({ book, onBorrow, onEdit, onDelete }) => {
  const [showModal, setShowModal] = useState(false);
  const currentUser = authService.getCurrentUser();

  return (
    <>
      <Card 
        className="h-100 book-card shadow-sm" 
        onClick={() => setShowModal(true)}
        style={{ cursor: 'pointer' }}
      >
        <div className="position-relative">
          <Card.Img 
            variant="top" 
            src={book.coverImage || '/images/book-covers/default.png'} 
            className="card-img"
            style={{ height: '200px', objectFit: 'cover' }}
          />
          <Badge 
            bg={book.status === 'available' ? 'success' : 'warning'}
            className="position-absolute top-0 end-0 m-2"
          >
            {book.status === 'available' ? 'Tersedia' : 'Dipinjam'}
          </Badge>
        </div>
        <Card.Body>
          <Card.Title className="h5 mb-2">{book.title}</Card.Title>
          <Card.Text className="text-truncate" style={{ maxHeight: '3rem' }}>
            {book.description}
          </Card.Text>
          <div className="mt-auto">
            <span className="badge bg-light text-dark">{book.genre}</span>
          </div>
        </Card.Body>
      </Card>

      <BookDetail
        show={showModal}
        onHide={() => setShowModal(false)}
        book={book}
        onBorrow={onBorrow}
        onEdit={onEdit}
        onDelete={onDelete}
        currentUser={currentUser}
      />
    </>
  );
};

export default BookCard;