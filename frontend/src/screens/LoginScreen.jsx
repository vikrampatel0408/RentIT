import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.css";
import Form from "react-bootstrap/Form";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
import { TailSpin } from "react-loader-spinner";
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

  const [loading, setLoading] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        "https://rentit-api.onrender.com/api/users/auth",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Cookies.set("userData", JSON.stringify(data), { expires: 7 });
        setLoading(false);
        navigate("/dashboard");
      } else {
        if (response.status === 401) {
          setLoading(false);
          toast.error("Invalid email or password");
        } else if (response.status === 400) {
          setLoading(false);
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
              <span className="text-primary">RentIt</span>
              <br />
              For Everything
            </h1>

            <ToastContainer />
          </MDBCol>
          <MDBCol md="6">
            <Form onSubmit={handleSubmit}>
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
                      className="form-control"
                      style={{
                        backgroundColor: "#212529",
                        color: "white",
                        display: "flex", 
                        justifyContent: "center",
                      }}
                    >
                      {loading ? (
                        <TailSpin
                          color="#fff"
                          className="flex justify-center items-center"
                          height={30}
                          width={30}
                        />
                      ) : (
                        "Login"
                      )}
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
