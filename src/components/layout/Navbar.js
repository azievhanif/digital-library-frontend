import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { BsBook, BsBoxArrowRight, BsPerson } from 'react-icons/bs';
import authService from '../../services/authService';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = authService.getCurrentUser();
  const isMember = currentUser?.role === 'member';

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const isHomePage = location.pathname === '/';

  return (
    <Navbar 
      bg={isHomePage ? 'transparent' : 'white'} 
      variant={isHomePage ? 'dark' : 'light'}
      expand="lg" 
      className={`${isHomePage ? '' : 'shadow-sm'} py-3`}
      fixed={isHomePage ? 'top' : undefined}
    >
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <BsBook className="me-2" size={24} />
          <span className="fw-bold">Bookgedebooks</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/books" className="mx-2">Books</Nav.Link>
            {currentUser && (
              <>
                {isMember && (
                  <Nav.Link as={Link} to="/borrowings" className="mx-2">
                    Peminjaman
                  </Nav.Link>
                )}
              </>
            )}
          </Nav>
          <Nav className="d-flex align-items-center">
            {currentUser ? (
              <>
                <Nav.Link as={Link} to="/profile" className="mx-2">
                  <BsPerson size={20} className="me-1" />
                  Profil
                </Nav.Link>
                <Button 
                  variant="primary" 
                  onClick={handleLogout}
                  className="d-flex align-items-center"
                >
                  <BsBoxArrowRight className="me-1" /> Logout
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="mx-2">Login</Nav.Link>
                <Button 
                  as={Link} 
                  to="/register" 
                  variant="primary"
                >
                  Register
                </Button>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavigationBar;