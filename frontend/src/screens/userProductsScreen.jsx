import React, { useState, useEffect } from "react";
import Product from "../components/Product";
const userProductsScreen = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const userDataFromCookie = Cookies.get("userData");
    if (userDataFromCookie) {
      try {
        const parsedUserData = JSON.parse(userDataFromCookie);
        setUserData(parsedUserData);
      } catch (error) {
        console.error("Error parsing user data from cookies:", error);
      }
    }
  }, [navigate, setUserData]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:6969/api/product/userproduct"
        );
        if (response.ok) {
          const data = await response.json();

          setProducts(data.allProduct);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
        {(searchInput ? filteredProducts : products).map((product) => (
          <Product product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default userProductsScreen;