import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import Header from "../components/Header";
import Cookies from "js-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Postform = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState(null);
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("");
  const [productdata, setProductdata] = useState(null);
  const userData = Cookies.get("userData");
  const [userdata, setUserdata] = useState([]);
  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const handlesubmit = async (e) => {
    e.preventDefault();
    const parsedUserData = JSON.parse(userData);
    if (!parsedUserData.phoneNumber) {
      toast.error("Please Do OTP Verification On Profile");
    } else {
      setUserdata(parsedUserData);
      const id = parsedUserData._id;

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("file", file);
      formData.append("category", category);
      formData.append("id", id);
      formData.append("price", price);
      formData.append("days", days);
      try {
        const response = await axios.post(
          "https://rent-it-api.vercel.app/api/product/",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response);
        if (response.status === 200) {
          const data = response.data;
          setProductdata(data);
          console.log(data);
          navigate("/dashboard");
        } else {
          console.error("Error in post product");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <ToastContainer />

      <Header />
      <div className="flex items-center mb-4">
        <BiArrowBack
          className="cursor-pointer text-3xl text-gray-500 hover:text-gray-700"
          onClick={handleBackButtonClick}
        />
      </div>
      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="9" className="my-5">
            <Form onSubmit={handlesubmit} encType="multipart/form-data">
              <MDBCard>
                <MDBCardBody className="px-4">
                  <h1>Add Product</h1>
                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Product name</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBInput
                        label="Name"
                        size="lg"
                        id="form1"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />
                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Category</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBInput
                        label="House,books,etc"
                        size="lg"
                        type="text"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Description</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBTextArea
                        label="Product Description"
                        id="textAreaExample"
                        rows={3}
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Days</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBInput
                        size="lg"
                        type="number"
                        value={days}
                        onChange={(e) => setDays(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Image</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <input
                        type="file"
                        name="file"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                        }}
                      />
                    </MDBCol>
                  </MDBRow>
                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Price</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBInput
                        label="Enter price in ruppees"
                        size="lg"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />
                  <button
                    className="form-control text-primary"
                    style={{ backgroundColor: "lightblue" }}
                  >
                    Add Product
                  </button>
                </MDBCardBody>
              </MDBCard>
            </Form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

export default Postform;
