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
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";

const Postform = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category,setCategory] = useState("");
  const [image,setImage] = useState("");
  const [productdata , setProductdata] = useState(null);
  const userData = location.state;
  const [userdata,setUserdata] = useState(userData);
  const handlesubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:6969/api/product/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, description,category,image,userData}),
      });
      if (response.ok) {
        const data = await response.json();
        setProductdata(data);
        console.log(data)
      } else {
        console.error("Login failed");
      }
    } catch (error) {
      console.log(error);
    }
  };
 
  
  return (
    <MDBContainer fluid>
      <MDBRow className="d-flex justify-content-center align-items-center">
        <MDBCol lg="9" className="my-5">
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
  );
};

export default Postform;
