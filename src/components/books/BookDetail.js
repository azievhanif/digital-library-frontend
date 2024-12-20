import React from 'react';
import { Modal, Button, Row, Col, Badge } from 'react-bootstrap';
import { BsBookmark, BsPencil, BsTrash } from 'react-icons/bs';

const BookDetail = ({ book, show, onHide, onBorrow, onEdit, onDelete, currentUser }) => {
  const isAdmin = currentUser?.role === 'admin';

  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{book?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col md={4}>
            <img
              src={book?.coverImage || '/images/book-covers/default.png'}
              alt={book?.title}
              className="img-fluid rounded"
              style={{ width: '100%', height: 'auto' }}
            />
          </Col>
          <Col md={8}>
            <div className="mb-3">
              <h5>Detail Buku</h5>
              <table className="table table-borderless">
                <tbody>
                  <tr>
                    <td>Genre</td>
                    <td>: {book?.genre}</td>
                  </tr>
                  <tr>
                    <td>Status</td>
                    <td>
                      : <Badge bg={book?.status === 'available' ? 'success' : 'warning'}>
                          {book?.status === 'available' ? 'Tersedia' : 'Dipinjam'}
                        </Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="mb-3">
              <h5>Deskripsi</h5>
              <p>{book?.description}</p>
            </div>

            <div className="d-flex gap-2">
              {book?.status === 'available' && currentUser && !isAdmin && (
                <Button 
                  variant="primary" 
                  onClick={() => {
                    onBorrow(book.id);
                    onHide();
                  }}
                  className="d-flex align-items-center gap-2"
                >
                  <BsBookmark /> Pinjam Buku
                </Button>
              )}
              {isAdmin && (
                <>
                  <Button 
                    variant="warning"
                    onClick={() => {
                      onEdit(book);
                      onHide();
                    }}
                    className="d-flex align-items-center gap-2"
                  >
                    <BsPencil /> Edit
                  </Button>
                  <Button 
                    variant="danger"
                    onClick={() => {
                      onDelete(book.id);
                      onHide();
                    }}
                    className="d-flex align-items-center gap-2"
                  >
                    <BsTrash /> Hapus
                  </Button>
                </>
              )}
            </div>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default BookDetail;