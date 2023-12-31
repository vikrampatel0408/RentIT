import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Product = ({ product, user, orders }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleMarkSold = async (req, res) => {
    const response = await fetch(
      `https://rentit-api.onrender.com/api/product/marksold/${product._id}`
    );
    if (response.ok) {
      toast.success("Product Sold");
      navigate(-1);
    }
  };

  const { _id, image, category, name, price, sold } = product;
  return (
    <div>
      <div className="border border-[#e4e4e4] h-[300px] mb-4 relative overflow-hidden group transition">
        {user.name}
        <div className="w-full h-full flex justify-center items-center">
          {/* image */}
          <div className="w-[200px] mx-auto flex justify-center items-center">
            {!sold ? (
              <>
                <img
                  className="max-h-[160px] group-hover:scale-110 transition duration-300"
                  src={image}
                />
                {orders ? (
                  <div
                    className="text-3xl font-semibold text-gray-800 "
                    style={{
                      position: "absolute",
                      bottom: "9px",
                      right: "20%",
                      transform: "translate(-50%,-50%)",
                    }}
                  >
                    Pending
                  </div>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <div className="justify-center items-center">
                <img
                  className="max-h-[160px] group-hover:scale-110 transition duration-300"
                  style={{ filter: "grayscale(100%)" }}
                  src={image}
                />
                {!orders ? (
                  <div className="text-3xl font-semibold text-gray-800  items-center text-center mt-5">
                    <h4>Sold</h4>
                  </div>
                ) : (
                  <div
                    className="text-3xl font-semibold text-gray-800 items-center "
                    style={{
                      position: "absolute",
                      bottom: "9px",
                      right: "17%",
                      transform: "translate(-50%,-50%)",
                    }}
                  >
                    <h4>Accepted</h4>
                  </div>
                )}
              </div>
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
          <Link className="no-underline text-gray-800 " to={`/product/${_id}`}>
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
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm p-2  mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={() => navigate(`/offers/${_id}`)}
          >
            View offers
          </button>

          <button
            type="button"
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm p-2  mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            onClick={handleMarkSold}
          >
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
