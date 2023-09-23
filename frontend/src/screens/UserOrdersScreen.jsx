import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Header from "../components/Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const UserOrdersScreen = () => {
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();
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
          `http://localhost:6969/api/product/userorders/${id}`
        );
        if (response.ok) {
          const data = await response.json();

          setProducts(data.product);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchOrders();
  }, []);
  return (
    <>
      <Header />
      <div className="gap-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
          {products.length ? (
            products.map((product) => (
              <Product user={true} orders={true} product={product} key={product._id} />
            ))
          ) : (
            <h1>No Product Found</h1>
          )}
        </div>
        <div className="flex justify-end ">
          <button
            className="btn btn-primary"
            onClick={() => {
              navigate("/dashboard");
            }}
          >
            Back
          </button>
        </div>
      </div>
    </>
  );
};

export default UserOrdersScreen;
