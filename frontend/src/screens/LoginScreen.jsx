import React from "react";
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:6969/api/users/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Login failed");
      }
    } catch (error) {}
  };
  return (
    <div style={{ display: "block", width: 700, padding: 30 }}>
      <h4>Sign In</h4>
      <br />
      <Form onSubmit={handlesubmit}>
        {/* <Form.Group>
          <Form.Label>Enter your full name:</Form.Label>
          <Form.Control type="text" placeholder="Enter your full name" />
        </Form.Group> */}
        <Form.Group>
          <Form.Label>Enter your email address:</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter your your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Enter your password:</Form.Label>
          <Form.Control
            type="string"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Click here to submit form
        </Button>
      </Form>
      {userData && (
        <div>
          <h5>Logged in successfully!</h5>
          <p>User ID: {userData.id}</p>
          <p>User Name: {userData.name}</p>
        </div>
      )}
    </div>
  );
};

export default LoginScreen;
