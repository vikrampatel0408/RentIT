import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";

const LoginScreen = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        console.log(data);
        Cookies.set("userData", JSON.stringify(data), { expires: 7 });

        navigate("/dashboard");
      } else {
        if (response.status === 401) {
          toast.error("Invalid email or password");
        } else if (response.status === 400) {
          toast.error("Email Verification Not Done");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Header />
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
                  <MDBInput
                    required
                    wrapperClass="mb-4"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <MDBInput
                    required
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
                    >
                      Login
                    </button>
                  </div>
                </MDBCardBody>
              </MDBCard>
            </Form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default LoginScreen;
