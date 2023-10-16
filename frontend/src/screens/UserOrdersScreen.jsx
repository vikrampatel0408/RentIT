import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Header from "../components/Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { FaExclamationCircle } from "react-icons/fa";
import { TailSpin } from "react-loader-spinner";

const UserOrdersScreen = () => {
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
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

    const fetchOrders = async () => {
      try {
        const response = await fetch(
          `https://rentit-api.onrender.com/api/product/userorders/${id}`
        );
        if (response.ok) {
          const data = await response.json();

          setProducts(data.product);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false); 
      }
    };

    fetchOrders();
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
      <div className="bg-gray-100 p-3 rounded-lg text-center text-gray-600 flex items-center">
        <FaExclamationCircle className="text-2xl mr-2" />
        <span>
          If you don't find your order here, it may mean your offer has been
          rejected. Please make another offer.
        </span>
      </div>

      {loading ? ( 
        <div>
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
        </div>
      ) : (
        <div className="gap-4 mt-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {products.length ? (
              products.map((product) => (
                <Product
                  user={true}
                  orders={true}
                  product={product}
                  key={product._id}
                />
              ))
            ) : (
              <h1>No Product Found</h1>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserOrdersScreen;
