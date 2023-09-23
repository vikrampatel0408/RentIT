import React, { useContext } from "react";

const Offers = ({offer}) => {
  return (
    <li className="list-group-item">
        <div className="flex flex-row justify-between text-lg capitalize  mb-1">
      <span >User: {offer.username}</span>
        <span >Price: {offer.offerprice}</span>
      <button className="btn btn-primary">
        Accept
      </button>
      <button className="btn btn-danger">
        Reject
      </button>
      
      </div>
    </li>
  );
};

export default Offers