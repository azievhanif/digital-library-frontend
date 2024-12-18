import React, { useState, useEffect } from 'react';
import { Container, Card, Alert } from 'react-bootstrap';
import authService from '../../services/authService';

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  if (!user) {
    return (
      <Container className="py-4">
        <Alert variant="danger">User tidak ditemukan</Alert>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Profil Saya</h2>
      <Card>
        <Card.Body>
          <Card.Title>{user.name}</Card.Title>
          <Card.Text>
            <strong>Email:</strong> {user.email}<br />
            <strong>Role:</strong> {user.role}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;