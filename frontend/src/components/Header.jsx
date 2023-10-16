import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import {
  FaSignInAlt,
  FaSignOutAlt,
  FaHome,
  FaShoppingBag,
  FaClipboardList,
} from "react-icons/fa";
import { FaBell } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import logo from "../assets/logo2.svg";
import logo1 from "../assets/logo1.svg";

const Header = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://rentit-api.onrender.com/api/users/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        Cookies.remove("userData");
        setUserData(null);
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  useEffect(() => {
    const userDataFromCookie = Cookies.get("userData");
    if (userDataFromCookie) {
      try {
        const parsedUserData = JSON.parse(userDataFromCookie);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data from cookies:", error);
      }
    } else {
      setUserData(null);
    }
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        zIndex: 999,
        width: "100%",
        left: "0",
      }}
    >
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              {userData ? (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={logo1}
                    alt="Logo"
                    style={{
                      width: "40px",
                      padding: "6px",
                      marginLeft: "-3px",
                    }}
                  />

                  <span className="p-3">RentIT</span>
                </div>
              ) : (
                <>
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: "180px",
                      padding: "6px",
                      marginRight: "200px",
                      marginLeft: "-3rem",
                    }}
                  />
                </>
              )}
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              {userData ? (
                <>
                  <LinkContainer to="/userproducts">
                    <Nav.Link>
                      <span className="d-flex align-items-center">
                        <FaShoppingBag />
                        <span style={{ marginLeft: "10px" }}>My Products</span>
                      </span>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/userorders">
                    <Nav.Link>
                      <span className="d-flex align-items-center">
                        <FaClipboardList />
                        <span style={{ marginLeft: "10px" }}>My Orders</span>
                      </span>
                    </Nav.Link>
                  </LinkContainer>
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="link"
                      className="text-white"
                      id="dropdown-basic"
                      style={{ textDecoration: "none" }}
                    >
                      {userData.name[0].toUpperCase() + userData.name.slice(1)}
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item
                        onClick={() => {
                          navigate("/profile");
                        }}
                      >
                        Profile
                      </Dropdown.Item>
                      <Dropdown.Item onClick={handleLogout}>
                        Logout
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <span className="d-flex align-items-center">
                        <FaSignInAlt />
                        <span style={{ marginLeft: "10px" }}>Sign In</span>
                      </span>
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link>
                      <span className="d-flex align-items-center">
                        <FaSignOutAlt />
                        <span style={{ marginLeft: "10px" }}>Sign Up</span>
                      </span>
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
