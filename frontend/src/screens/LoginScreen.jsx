import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const invalidemail = () => toast("Wow so easy!");

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
        navigate("/dashboard", { state: data });
      } else {
        console.error("Login failed");
        toast.error("Invalid email or password");
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

          <p className="px-3" style={{ color: "hsl(217, 10%, 50.8%)" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet,
            itaque accusantium odio, soluta, corrupti aliquam quibusdam tempora
            at cupiditate quis eum maiores libero veritatis? Dicta facilis sint
            aliquid ipsum atque?
          </p>
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

                <div className="d-flex justify-content-center mb-4">
                  <MDBCheckbox
                    name="flexCheck"
                    value=""
                    id="flexCheckDefault"
                    label="Subscribe to our newsletter"
                  />
                </div>
                <div>
                  <button
                    className="form-control text-primary"
                    // style={{ backgroundColor: "" }}
                  >
                    Login
                  </button>
                  {/* <MDBBtn className="w-100 mb-4" size="md">
                    Login
                  </MDBBtn> */}
                </div>

                <div className="text-center"></div>
              </MDBCardBody>
            </MDBCard>
          </Form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginScreen;
