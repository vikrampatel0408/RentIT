import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import { Slider } from "@material-tailwind/react";
import Header from "../components/Header";
import Cookies from "js-cookie";
import { BiArrowBack } from "react-icons/bi";
import { BiMinus, BiPlus } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
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
        const response = await fetch(`https://rentit-api.onrender.com/api/product/${id}`);
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
          height="50"
          width="50"
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
            if (!parsedUserData.phoneNumber) {
              toast.error("Please do OTP verification");
              navigate("/edit-profile");
              return;
            }
            var userid = parsedUserData._id;
            var username = parsedUserData.name;
            var userEmail = parsedUserData.email;
            var userPhoneNo = parsedUserData.phoneNumber;
          } catch (error) {
            console.error("Error parsing user data from cookies:", error);
          }
        } else {
          if (!userDataFromCookie) toast.error("User is not logged in.");
          navigate("/login");
          return;
        }
        const response = await fetch(
          `https://rentit-api.onrender.com/api/product/offer/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              offerprice,
              userid,
              username,
              userEmail,
              userPhoneNo,
            }),
          }
        );
        if (response.ok) {
          // const data = await response.json();
          console.log("success");
          toast.success("Offer is sent");
        } else {
          console.error("Failed to post offer");
          toast.error("falied to sent offer");
        }
      } catch (error) {
        console.error("Error post offer :", error);
      }
    };
    postOffer();
  };
  const { name, price, description, image, days } = product;

  return (
    <>
      <Header />
      <ToastContainer />
      <div className="flex items-center mb-4">
        <BiArrowBack
          className="cursor-pointer text-3xl text-gray-500 hover:text-gray-700"
          onClick={handleBackButtonClick}
        />
      </div>

      <section className="pt-16 pb-12 lg:py-32 h-screen flex items-center bg-white shadow-lg my-9 ">
        <div className="container mx-auto  ">
          <div className="p-8 rounded-lg ">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                <img
                  className="max-w-xs lg:max-w-xl rounded-lg object-cover"
                  src={`https://rentit-api.onrender.com/${image}`}
                  alt=""
                />
              </div>

              <div className="flex-1 text-center lg:text-left justify-between m-8">
                <h1 className="text-3xl font-semibold mb-2 max-w-[450px] mx-auto lg:mx-0">
                  {name}
                </h1>
                <div className="text-2xl font-semibold mb-6">₹ {price}</div>
                <p className="text-gray-600 mb-8">{description}</p>
                <p className="text-black">For {days} Days</p>

                <label
                  htmlFor="offer-price"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your Offer : ₹ {offerprice}
                </label>
                <div className="flex items-center">
                  <button
                    className="btn text-black ml-2 p-2"
                    onClick={() => setOfferprice(offerprice - 1)}
                    disabled={offerprice <= 1}
                  >
                    <BiMinus size={24} />
                  </button>
                  <input
                    id="offer-price"
                    type="range"
                    onChange={(e) => setOfferprice(parseInt(e.target.value))}
                    min={1}
                    max={price}
                    step={1}
                    value={offerprice}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                  />
                  <button
                    className="btn text-black ml-2 p-2"
                    onClick={() => setOfferprice(offerprice + 1)}
                    disabled={offerprice >= price}
                  >
                    <BiPlus size={24} />
                  </button>
                </div>
                <button
                  className="bg-black text-white py-2 px-4 rounded-md  mt-4"
                  onClick={handleOfferClick}
                >
                  Make an Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
