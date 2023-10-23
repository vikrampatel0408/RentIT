import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Header from "../components/Header";
import Cookies from "js-cookie";
import { BiArrowBack } from "react-icons/bi";
import { BiMinus, BiPlus } from "react-icons/bi";
import { toast, ToastContainer } from "react-toastify";
import { BsPerson } from "react-icons/bs";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  const [product, setProduct] = useState(null);
  const [offerprice, setOfferprice] = useState(0);
  const [userdata, setUserdata] = useState([]);

  useEffect(() => {
    const userDataFromCookie = Cookies.get("userData");

    try {
      const parsedUserData = JSON.parse(userDataFromCookie);
      if (!parsedUserData.phoneNumber) {
        toast.error("Please do OTP verification");
        navigate("/edit-profile");
        return;
      } else {
        setUserdata(parsedUserData);
        console.log(userdata);
      }
    } catch (error) {
      console.error("Error parsing user data from cookies:", error);
    }
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://rentit-api.onrender.com/api/product/${id}`
        );
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

  const handleOfferClick = () => {
    if (!userdata._id) {
      toast.error("Please log in to make an offer.");
      navigate("/login");
      return;
    }

    const postOffer = async () => {
      try {
        const response = await fetch(
          `https://rentit-api.onrender.com/api/product/offer/${id}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              offerprice,
              userid: userdata._id,
              username: userdata.name,
              userEmail: userdata.email,
              userPhoneNo: userdata.phoneNumber,
            }),
          }
        );
        if (response.ok) {
          console.log("success");
          toast.success("Offer is sent");
        } else {
          console.error("Failed to post offer");
          toast.error("Failed to send an offer");
        }
      } catch (error) {
        console.error("Error post offer:", error);
      }
    };
    postOffer();
  };

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
      {!product ? (
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
      ) : (
        <section className="pt-16 pb-12 lg:py-32 h-screen flex flex-col items-center bg-white shadow-lg my-9">
          <div className="container mx-auto">
            <div className="p-8 rounded-lg">
              <div className="flex flex-col lg:flex-row items-center">
                <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
                  <img
                    className="max-w-xs lg:max-w-xl rounded-lg object-cover"
                    src={product.image}
                    alt=""
                  />
                </div>

                <div className="flex-1 text-left m-8">
                  <div className="flex items-center mb-2">
                    <div className="bg-gray-200 rounded-full p-2">
                      <BsPerson size={30} className="text-gray-600" />
                    </div>
                    <p className="text-gray-600 text-2xl mt-2 ml-3">
                      {product.ownerName.split(" ")[0].charAt(0).toUpperCase() +
                        product.ownerName.split(" ")[0].slice(1)}
                    </p>
                  </div>

                  <h1 className="text-3xl font-semibold mb-2 max-w-[450px] mt-4">
                    {product.name}
                  </h1>
                  <div className="text-2xl font-semibold mb-6">
                    ₹ {product.price}
                  </div>
                  {product.days ? (
                    <p className="text-black">
                      For <span className="font-semibold">{product.days}</span>
                      {product.days === 1 ? <> Day</> : <> Days</>}
                    </p>
                  ) : (
                    <></>
                  )}

                  <div className="text-xl mb-6">About {product.name}</div>

                  <p className="text-gray-600 mb-8">{product.description}</p>

                  <label
                    htmlFor="offer-price"
                    className="block mb-2 text-sm font-medium text-gray-900"
                  >
                    Your Offer : ₹ {offerprice}
                  </label>
                  <div className="flex items-center ">
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
                      max={product.price}
                      step={1}
                      value={offerprice}
                      className="w-full h-2  rounded-lg appearance-none cursor-pointer bg-black "
                    />
                    <button
                      className="btn text-black ml-2 p-2"
                      onClick={() => setOfferprice(offerprice + 1)}
                      disabled={offerprice >= product.price}
                    >
                      <BiPlus size={24} />
                    </button>
                  </div>
                  <button
                    className={`${
                      userdata._id === product.user
                        ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                        : "bg-black text-white"
                    } py-2 px-4 rounded-md mt-4`}
                    onClick={handleOfferClick}
                    disabled={userdata._id === product.user}
                  >
                    Make an Offer
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default ProductDetails;
