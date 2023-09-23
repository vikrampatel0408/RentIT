import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { Slider } from "@material-tailwind/react";
import Header from "../components/Header";
import Cookies from "js-cookie";
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  
  const handleBackButtonClick = () => {
    navigate(-1);
  };
  const [product, setProduct] = useState(null);
  const [offerprice, setOfferprice] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:6969/api/product/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);
          setOfferprice(data.product.price);
        } else {
          console.error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
        <TailSpin
          height="80"
          width="80"
          color="grey"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </section>
    );
  }
  const handleOfferClick = () => {
    const postOffer = async () => {
      try {
        const userDataFromCookie = Cookies.get("userData");
        if (userDataFromCookie) {
          try {
            const parsedUserData = JSON.parse(userDataFromCookie);
           var userid = parsedUserData._id;
           var username =  parsedUserData.name;
          } catch (error) {
            console.error("Error parsing user data from cookies:", error);
          }
        }
        const response = await fetch(
          `http://localhost:6969/api/product/offer/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ offerprice ,userid,username}),
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log("success");
          navigate("/dashboard");
        } else {
          console.error("Failed to post offer");
        }
      } catch (error) {
        console.error("Error post offer :", error);
      }
    };
    postOffer();
  };
  const { name, price, description, image } = product;

  return (
    <>
      <Header />

      <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center pt-0">
        <div className="container mx-auto">
          <button className="btn btn-primary" onClick={handleBackButtonClick}>
            Back
          </button>

          <div className="flex flex-col lg:flex-row items-center ">
            <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
              <img className="max-w-[200px] lg:max-w-xs" src={image} alt="" />
            </div>

            <div className="flex-1 text-center lg:text-left justify-between ">
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                {name}
              </h1>
              <div className="text-2xl text-red-500 font-medium mb-6">
                ₹ {offerprice ? offerprice : price}
              </div>
              <p className="mb-8">{description}</p>
              <div className="flex flex-col">
                <input
                  type="range"
                  onChange={(e) => setOfferprice(e.target.value)}
                  min={1}
                  max={price}
                  step={1}
                  value={offerprice ? offerprice : price}
                ></input>
              </div>
              <button className="btn btn-primary" onClick={handleOfferClick}>
                Make an offer
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
