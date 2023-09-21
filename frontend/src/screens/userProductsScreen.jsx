import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Header from "../components/Header";
import Cookies from "js-cookie";

const UserProductsScreen = () => {
  const [products, setProducts] = useState([]);
  const [userData, setUserData] = useState([]);

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
    
    const fetchProducts = async () => {
      try {
        
        const response = await fetch(
          `http://localhost:6969/api/product/userproducts/${id}`
        );
        if (response.ok) {
          const data = await response.json();
          
          setProducts(data.userproduct);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
        {products.map((product) => (
          <Product product={product} key={product._id} />
        ))} 
      </div>
    </>
  );
};

export default UserProductsScreen;