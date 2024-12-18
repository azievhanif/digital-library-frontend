import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const BookSearch = ({ onSearch }) => {
  const [searchParams, setSearchParams] = useState({
    query: '',
    genre: '',
    status: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
    onSearch({
      ...searchParams,
      [name]: value
    });
  };

  return (
    <Form className="mb-4">
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Cari judul atau deskripsi..."
              name="query"
              value={searchParams.query}
              onChange={handleChange}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Select
              name="genre"
              value={searchParams.genre}
              onChange={handleChange}
            >
              <option value="">Semua Genre</option>
              <option value="Fiction">Fiksi</option>
              <option value="Non-Fiction">Non-Fiksi</option>
              <option value="Science">Sains</option>
              <option value="Technology">Teknologi</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group className="mb-3">
            <Form.Select
              name="status"
              value={searchParams.status}
              onChange={handleChange}
            >
              <option value="">Semua Status</option>
              <option value="available">Tersedia</option>
              <option value="borrowed">Dipinjam</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default BookSearch;