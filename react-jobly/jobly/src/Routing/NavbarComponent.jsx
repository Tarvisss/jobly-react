import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
// since im using react-bootstrap im using as so that i can do my routing on the client side 
function NavbarComponent() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className="d-flex justify-content-between">

          <Navbar.Brand as={Link} to="/">Jobly</Navbar.Brand>

          <Nav className="ms-auto"> 
            <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            <Nav.Link as={Link} to="/companies">Companies</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavbarComponent;
