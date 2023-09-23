import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Offers from "../components/Offers";
import { useNavigate } from "react-router-dom";
const OfferScreen = () => {
  const [offers, setOffers] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await fetch(
          `http://localhost:6969/api/product/offer/${id}`
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
      <div className="flex flex-col gap-4">
        <ul className="list-group">
          {offers.length ? (
            offers.map((offer) => <Offers offer={offer} key={offer._id} />)
          ) : (
            <h1>No offer Found</h1>
          )}
        </ul>
        <div className="flex justify-end ">
          <button className="btn btn-primary" onClick={()=>{navigate("/userproducts")}}>Back</button>
        </div>
      </div>
    </>
  );
};
export default OfferScreen;
