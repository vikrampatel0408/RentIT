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
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
const Postform = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category,setCategory] = useState("");
  const [image,setImage] = useState("");
  const [price,setPrice]= useState("");
  const [productdata , setProductdata] = useState(null);
  const userData = Cookies.get("userData");
  const [userdata,setUserdata] = useState([]);
  
  const handlesubmit = async (e) => {
    e.preventDefault();
    const parsedUserData = JSON.parse(userData);
    setUserdata(parsedUserData);
    const id = parsedUserData._id;
    try {
      const response = await fetch("http://localhost:6969/api/product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description,category,image,id,price}),
      });
      if (response.ok) {
        const data = await response.json();
        setProductdata(data);
        toast.success("Product added Successfully")
        console.log(data)
        navigate("/dashboard");
      } else {
        console.error("Product added failed");
        toast.error("Product added failed")
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  
  return (
    <>
      <Header />
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol lg="9" className="my-5">
          <ToastContainer />
        <Form onSubmit={handlesubmit}>
          <MDBCard>
            <MDBCardBody className="px-4">
              <h1>Add Product</h1>
              <MDBRow className="align-items-center pt-4 pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Product name</h6>
                </MDBCol>

                <MDBCol md="9" className="pe-5">
                  <MDBInput label="Name" size="lg" id="form1" type="text"  value={name}
                  onChange={(e) => setName(e.target.value)} />
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
                  <MDBTextArea label="Product Description" id="textAreaExample" rows={3} value={description}
                  
                  onChange={(e) => setDescription(e.target.value)}
                  />
                </MDBCol>
              </MDBRow>

              <hr className="mx-n3" />

              <MDBRow className="align-items-center pt-4 pb-3">
                <MDBCol md="3" className="ps-5">
                  <h6 className="mb-0">Image</h6>
                </MDBCol>

                <MDBCol md="9" className="pe-5">
                  <MDBInput
                    label="image link"
                    size="lg"
                    
                    type="text"
                    value={image}
                  onChange={(e) => setImage(e.target.value)}
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
              <button className="form-control text-primary" style={{backgroundColor: "lightblue"}}>
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
