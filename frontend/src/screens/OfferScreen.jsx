import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Offers from "../components/Offers";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { BiArrowBack } from "react-icons/bi";
const OfferScreen = () => {
  const [offers, setOffers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const handleBackButtonClick = () => {
    navigate(-1);
  };
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(
          `https://rent-it-api.vercel.app/api/product/offer/${id}`
        );
        if (response.ok) {
          const data = await response.json();

          setOffers(data.offers);
        } else {
          console.error("Failed to fetch offers");
        }
      } catch (error) {
        console.error("Error fetching offers :", error);
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
      <ToastContainer />
      <div className="flex flex-col gap-4">
        <ul className="list-group">
          {offers.length ? (
            offers.map((offer) => (
              <Offers productid={id} offer={offer} key={offer._id} />
            ))
          ) : (
            <h1>No offer Found</h1>
          )}
        </ul>
      </div>
    </>
  );
};
export default OfferScreen;
