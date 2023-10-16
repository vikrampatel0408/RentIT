import React, { useState, useEffect } from "react";
import Product from "../components/Product";
import Header from "../components/Header";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { TailSpin } from "react-loader-spinner";
const UserProductsScreen = () => {
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

    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `https://rentit-api.onrender.com/api/product/userproducts/${id}`
        );
        if (response.ok) {
          const data = await response.json();

          setProducts(data.userproduct);
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
      <Header />
      <div className="flex items-center mb-4">
        <BiArrowBack
          className="cursor-pointer text-3xl text-gray-500 hover:text-gray-700"
          onClick={handleBackButtonClick}
        />
      </div>

      <div className="gap-4">
        {loading ? (
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
        ) : products.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
            {products.map((product) => (
              <Product user={true} product={product} key={product._id} />
            ))}
          </div>
        ) : (
          <h1>No Product Found</h1>
        )}
      </div>
    </>
  );
};

export default UserProductsScreen;
