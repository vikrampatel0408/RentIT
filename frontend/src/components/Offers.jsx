import React, { useContext } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Offers = ({ offer, productid }) => {
  const navigate = useNavigate();
  const handleRejectOffer = async () => {
    try {
      const offerId = offer._id;
      const response = await fetch(
        `https://rent-it-api.vercel.app/api/product/offer/reject/${productid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            offerId,
            productid,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Offer Rejected");
        navigate(-1);
      } else {
        console.error("Failed to fetch offers");
        toast.error("Invalid Offer");
      }
    } catch (error) {
      console.error("Error fetching offers :", error);
    }
  };
  const acceptOffer = async () => {
    try {
      var offer_id = offer._id;
      const response = await fetch(
        `https://rent-it-api.vercel.app/api/product/offer/accept/${productid}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            offer_id,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        toast.success("Offer Accepted");
        navigate(-1);
      } else {
        console.error("Failed to fetch offers");
        toast.error("Invalid Offer");
      }
    } catch (error) {
      console.error("Error fetching offers :", error);
    }
  };

  return (
    <li className="list-group-item">
      <div className="flex flex-row justify-between text-lg capitalize  mb-1">
        <span>User: {offer.username}</span>
        <span>Price: {offer.offerprice}</span>
        <button className="btn btn-primary" onClick={acceptOffer}>
          Accept
        </button>
        <button className="btn btn-danger" onClick={handleRejectOffer}>
          Reject
        </button>
      </div>
    </li>
  );
};

export default Offers;
