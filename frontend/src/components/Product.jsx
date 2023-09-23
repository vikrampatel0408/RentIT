import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const Product = ({ product, user, orders }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state;

  const { _id, image, category, name, price, sold } = product;
  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          {/* image */}
          <div className="w-[200px] mx-auto flex justify-center items-center">
            {!sold ?(
              <> 
              <img
                className="max-h-[160px] group-hover:scale-110 transition duration-300"
                src={image}
              />
              {orders ? <div
              className="text-3xl font-semibold text-gray-800 "
              style={{
                position: "absolute",
                bottom: "9px",
                right: "20%",
                transform: "translate(-50%,-50%)",
              }}
            >
              Pending
            </div>:<></> }
              
            </>
             ): (
              <>
                <img
                  className="max-h-[160px] group-hover:scale-110 transition duration-300"
                  style={{ filter: "grayscale(100%)" }}
                  src={image}
                />
                {!orders ? (
                  <div
                    className="text-3xl font-semibold text-gray-800 "
                    style={{
                      position: "absolute",
                      bottom: "9px",
                      right: "35%",
                      transform: "translate(-50%,-50%)",
                    }}
                  >
                    Sold
                  </div>
                ) : (
                  <div
                    className="text-3xl font-semibold text-gray-800 "
                    style={{
                      position: "absolute",
                      bottom: "9px",
                      right: "17%",
                      transform: "translate(-50%,-50%)",
                    }}
                  >
                    Accepted
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* buttons */}
        <div className="absolute top-6 -right-11 group-hover:right-5  flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          {!user ? (
            <Link
              to={`/product/${_id}`}
              className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
            >
              <BsEyeFill />
            </Link>
          ) : (
            <BsEyeFill />
          )}
        </div>
      </div>
      {/* category, title & price */}
      <div className="flex flex-col justify-center items-center">
        <div className="tex-sm capitalize text-gray-500 mb-1">{category}</div>
        {!user ? (
          <Link
            className="no-underline text-gray-800 "
            to={`/product/${_id}`}
            state={userData}
          >
            <h2 className="font-semibold mb-1 text-lg">{name}</h2>
          </Link>
        ) : (
          <h2 className="font-semibold mb-1 text-lg">{name}</h2>
        )}

        <h2 className="font-semibbold">₹{price}</h2>
      </div>
      {user && !sold && !orders ? (
        <div className="flex flex-row justify-center gap-2">
          <button
            type="button"
            className="btn btn-primary"
            width="100"
            onClick={() => navigate(`/offers/${_id}`)}
          >
            View offers
          </button>
          <button type="button" className="btn btn-primary" width="100">
            Mark as sold
          </button>
        </div>
      ) : (
        <h1></h1>
      )}
    </div>
  );
};

export default Product;
