import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import UserContext from '../Authorization/UserContext';
import { useContext } from 'react';
// since im using react-bootstrap im using as so that i can do my routing on the client side 
function NavbarComponent() {
  // retrieve the currUser from localStorage to ad dynamic link for the user
  const {currentUser} = useContext(UserContext);
  // const userInfo = localStorage.getItem('currUser');
  // const parsedUserInfo = JSON.parse(userInfo);
  // const username = parsedUserInfo ? parsedUserInfo.username : null;

      function loggedInNav() {
        return(
        <>
        <Navbar bg="dark" data-bs-theme="dark">
          <Container className="d-flex justify-content-between">
        
            <Navbar.Brand as={Link} to="/">Jobly</Navbar.Brand>
        
            <Nav className="ms-auto"> 
              <Nav.Link as={Link} to="/jobs">Jobs</Nav.Link>
              <Nav.Link as={Link} to="/companies">Companies</Nav.Link>
              {currentUser && currentUser.username &&(
              <Nav.Link as={Link} to={`/users/${currentUser.username}`}>User Profile</Nav.Link>
            )}
              </Nav>
          </Container>
        </Navbar>
      </>
      );
    }

    function loggedOutNav() {
      return(
      <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container className="d-flex justify-content-between">
      
          <Navbar.Brand as={Link} to="/">Jobly</Navbar.Brand>
      
          <Nav className="ms-auto"> 
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
    );
  }
  
  return(
    <nav>
      {currentUser && currentUser.username ? loggedInNav() : loggedOutNav()}
    </nav>
  )
}

export default NavbarComponent;
