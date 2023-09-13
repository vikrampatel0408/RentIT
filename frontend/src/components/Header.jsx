import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  const userData = location.state;
  const navigate = useNavigate();

  const handleNavbarBrandClick = () => {
    console.log("Before navigation: " + userData);
    if (userData) {
      navigate("/dashboard", { state: { userData } });
    } else {
      navigate("/");
    }
    console.log("After navigation: " + userData.name);
  };
  const handleprofile = () => {
    navigate("/profile", { state: { userData } });
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:6969/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        navigate("/login");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/" onClick={handleNavbarBrandClick}>
            <Navbar.Brand>RentIt</Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userData ? (
                <Nav.Link onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </Nav.Link>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <FaSignOutAlt /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              {userData && (
                <LinkContainer to={`/profile/${userData._id}`}>
                  <Nav.Link>{userData.name}</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
