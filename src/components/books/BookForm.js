import React, { useState, useEffect } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

const BookForm = ({ show, onHide, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    genre: '',
    status: 'available'
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        title: '',
        description: '',
        genre: '',
        status: 'available'
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Edit Buku' : 'Tambah Buku Baru'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Judul</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Deskripsi</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Genre</Form.Label>
            <Form.Select
              name="genre"
              value={formData.genre}
              onChange={handleChange}
              required
            >
              <option value="">Pilih Genre</option>
              <option value="Fiction">Fiksi</option>
              <option value="Non-Fiction">Non-Fiksi</option>
              <option value="Science">Sains</option>
              <option value="Technology">Teknologi</option>
            </Form.Select>
          </Form.Group>

          <div className="d-flex justify-content-end gap-2">
            <Button variant="secondary" onClick={onHide}>
              Batal
            </Button>
            <Button variant="primary" type="submit">
              {initialData ? 'Simpan Perubahan' : 'Tambah Buku'}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default BookForm;