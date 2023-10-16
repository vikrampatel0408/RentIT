import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Offers from "../components/Offers";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BiArrowBack } from "react-icons/bi";
import { FaExclamationCircle } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";
const OfferScreen = () => {
  const [offers, setOffers] = useState([]);
  const [loding, setLoading] = useState(true);
  const { id } = useParams();
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate(-1);
  };
  useEffect(() => {
    const userDataFromCookie = Cookies.get("userData");
    if (userDataFromCookie) {
      try {
        const parsedUserData = JSON.parse(userDataFromCookie);
        setUserData(parsedUserData);
        var id = parsedUserData._id;
      } catch (error) {
        console.error("Error parsing user data from cookies:", error);
      }
    }
  }, []);
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(
          `https://rentit-api.onrender.com/api/product/offer/${id}`
        );
        if (response.ok) {
          const data = await response.json();

          setOffers(data.offers);
        } else {
          console.error("Failed to fetch offers");
        }
      } catch (error) {
        console.error("Error fetching offers :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOffers();
  }, []);
  return (
    <>
      <Header />
      <div className="flex items-center mb-4">
        <BiArrowBack
          className="cursor-pointer text-3xl text-gray-500 hover:text-gray-700"
          onClick={handleBackButtonClick}
        />
      </div>
      <div className="bg-blue-100 p-3 rounded-lg text-center text-blue-800 flex ">
        <FaExclamationCircle className="text-2xl mr-2" />
        <span>
          Great news! When you accept this offer, your product will find its new
          home, and you'll receive the details of the buyer, including their
          name, phone number, and email. This will make it super easy for you to
          connect and continue the conversation.
        </span>
      </div>

      <ToastContainer />
      {loding ? (
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
        <div className="flex flex-col gap-4 mt-4">
          <ul className="list-group">
            {offers.length ? (
              offers.map((offer) => (
                <Offers
                  productid={id}
                  offer={offer}
                  userData={userData}
                  key={offer._id}
                />
              ))
            ) : (
              <h1>No offer Found</h1>
            )}
          </ul>
        </div>
      )}
    </>
  );
};
export default OfferScreen;
