import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon,
} from "mdb-react-ui-kit";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Form from "react-bootstrap/Form";
function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch("http://localhost:6969/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
      console.log(response)
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setUserData(data);
        navigate("/dashboard", { state: data });
      } else {
        console.error("SignUp failed");
        toast.error("User already exists");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <MDBContainer fluid className="p-4">
      <MDBRow>
        <MDBCol
          md="6"
          className="text-center text-md-start d-flex flex-column justify-content-center"
        >
          <h1 className="my-5 display-3 fw-bold ls-tight px-3">
            RentIt <br />
            <span className="text-primary">For Everything</span>
          </h1>

          <ToastContainer />
        </MDBCol>
        <MDBCol md="6">
          <Form onSubmit={handlesubmit}>
            <MDBCard className="my-5">
              <MDBCardBody className="p-5">
                <MDBRow>
                  <MDBCol>
                    <MDBInput
                      wrapperClass="mb-4"
                      placeholder="Name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>

                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <MDBInput
                  wrapperClass="mb-4"
                  placeholder="Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />

                <div>
                  <button
                    className="form-control "
                    style={{ backgroundColor: "#212529", color: "white" }}
                    type="submit"
                  >
                    Sign Up
                  </button>
                </div>
                <div className="text-center"></div>
              </MDBCardBody>
            </MDBCard>
          </Form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

export default RegisterScreen;
