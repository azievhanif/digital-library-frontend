import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="home-page" style={{ }}>
      <section className="hero-section py-5" style={{ 
        background: 'linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)',
        minHeight: '100vh' }}>
        <Container className="py-5">
          <Row className="align-items-center">
            <Col lg={6} className="text-white">
              <h1 className="display-4 fw-bold mb-4">Bookgedebooks: Your Gateway to a World of Knowledge</h1>
              <p className="lead mb-4">
              Explore thousands of digital books, accessible anytime and anywhere. Dive into your next great read today!
              </p>
              <Button 
                as={Link} 
                to="/books" 
                variant="light" 
                size="lg" 
                className="me-3"
              >
                Start now
              </Button>
            </Col>
            <Col lg={6} className="mt-4 mt-lg-0">
              <div className="position-relative">
                <img 
                  src="/book-collage.png" 
                  alt="Featured Books" 
                  className="img-fluid rounded"
                  style={{ opacity: 0.9 }}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default HomePage;