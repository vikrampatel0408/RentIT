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
import React, { useEffect, useState } from "react";
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
  const [userdata, setUserdata] = useState([]);

  const categoryOptions = [
    "Houses & Apartments",
    "Shops & Offices",
    "Lands & Plots",
    "Data entry & Back office",
    "Sales & Marketing",
    "BPO & Telecaller",
    "Driver",
    "Office Assistant",
    "Delivery & Collection",
    "Teacher",
    "Cook",
    "Receptionist & Front office",
    "Operator & Technician",
    "IT Engineer & Developer",
    "Hotel & Travel Executive",
    "Accountant",
    "Designer",
    "Other Jobs",
    "Motorcycles",
    "Scooters",
    "Spare Parts",
    "Bicycles",
    "Commercial & Other Vehicles",
    "Spare Parts",
    "TVs, Video - Audio",
    "Kitchen & Other Appliances",
    "Computers & Laptops",
    "Cameras & Lenses",
    "Games & Entertainment",
    "Fridges",
    "Computer Accessories",
    "Hard Disks, Printers & Monitors",
    "ACs",
    "Washing Machines",
    "Sofa & Dining",
    "Beds & Wardrobes",
    "Home Decor & Garden",
    "Kids Furniture",
    "Other Household Items",
    "Men",
    "Women",
    "Kids",
    "Books",
    "Gym & Fitness",
    "Musical Instruments",
    "Sports Equipment",
    "Other Hobbies",
    "Fishes & Aquarium",
    "Pet Food & Accessories",
    "Dogs",
    "Other Pets",
    "Education & Classes",
    "Tours & Travel",
    "Electronics Repair & Services",
    "Health & Beauty",
    "Home Renovation & Repair",
    "Cleaning & Pest Control",
    "Legal & Documentation Services",
    "Packers & Movers",
    "Other Services",
    "Car",
    "Bikes",
  ];
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
  const handleBackButtonClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const userDataFromCookie = Cookies.get("userData");
    if (userDataFromCookie) {
      try {
        const parsedUserData = JSON.parse(userDataFromCookie);
        setUserdata(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data from cookies:", error);
      }
    }
  }, []);
  const handlesubmit = async (e) => {
    e.preventDefault();
    if (price <= 0) {
      toast.error("Invalid price");
    }
    if (!userdata.phoneNumber) {
      toast.error("Please Do OTP Verification On Profile");
    } else {
      const id = userdata._id;
      const formData = new FormData();
      console.log(userdata.name);
      formData.append("ownerName", userdata.name);
      formData.append("name", name);
      formData.append("description", description);
      formData.append("file", file);
      formData.append("category", category);
      formData.append("id", id);
      formData.append("price", price);
      formData.append("days", days);

      try {
        const response = await axios.post(
          "http://localhost:6969/api/product/",
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
                        required
                        size="lg"
                        id="form1"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <hr className="mx-n3" />
                  <div className="d-flex align-items-center pt-4 pb-3">
                    <div className="col-md-3 ps-5">
                      <h6 className="mb-0">Category</h6>
                    </div>
                    <div className="col-md-9 pe-5">
                      <select
                        required
                        className="form-select form-select-lg"
                        value={category}
                        onChange={handleCategoryChange}
                      >
                        <option value="">Select a category</option>
                        {categoryOptions.map((option, index) => (
                          <option key={index} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <hr className="mx-n3" />

                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Description</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBTextArea
                        required
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
                  <hr className="mx-n3" />
                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Image</h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <input
                        required
                        type="file"
                        name="file"
                        onChange={(e) => {
                          setFile(e.target.files[0]);
                        }}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr className="mx-n3" />
                  <MDBRow className="align-items-center pt-4 pb-3">
                    <MDBCol md="3" className="ps-5">
                      <h6 className="mb-0">Price ₹ </h6>
                    </MDBCol>

                    <MDBCol md="9" className="pe-5">
                      <MDBInput
                        required
                        size="lg"
                        type="number"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </MDBCol>
                  </MDBRow>
                  <hr className="mx-n3" />
                  <button
                    className="form-control text-white mt-5 mb-3"
                    style={{ backgroundColor: "black" }}
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
