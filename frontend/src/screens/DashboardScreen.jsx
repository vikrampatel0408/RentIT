import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product";
import { TailSpin } from "react-loader-spinner";
import Cookies from "js-cookie";
import Fuse from "fuse.js";
import App from "../App";
import Header from "../components/Header";
const DashboardScreen = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [fuse, setFuse] = useState(null);

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
        const response = await fetch("http://localhost:6969/api/product/allproduct");
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

  useEffect(() => {
    if (products.length > 0) {
      const options = {
        keys: ["title", "category"],
        threshold: 0.4,
      };

      const t = new Fuse(products, options);
      setFuse(t);
    }
  }, [products]);

  useEffect(() => {
    const filterProducts = () => {
      if (!fuse) return;
      const results = fuse.search(searchInput);
      const filtered = results.map(({ item }) => item);
      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [searchInput, fuse]);

  const handleSellClick = () => {
    console.log("button click " + userData);
    console.log(userData);
    navigate("/addproduct");
  };

  return (
    <>
      <Header />
      <section className="py-20">
        <div className="container mx-auto">
          <div className="container mx-auto bg-gray-500 rounded-lg p-14">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                filterProducts();
              }}
            >
              <h1 className="text-center font-semibold  text-white text-4xl">
                Find the perfect item
              </h1>

              <div className="sm:flex items-center bg-white rounded-lg overflow-hidden px-2 py-1 justify-between">
                <input
                  className="text-base text-gray-400 flex-grow outline-none px-2"
                  type="text"
                  placeholder="Enter item's name or category"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <div className="sm:flex items-center px-2 rounded-lg space-x-4 mx-auto ">
                  <button
                    type="submit"
                    className="bg-gray-500 text-white text-base rounded-lg px-4 py-2 font-thin"
                  >
                    Search
                  </button>
                </div>
              </div>
            </form>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            width="100"
            onClick={handleSellClick}
          >
            Sell it
          </button>

          <h2 className="text-3xl font-semibold mb-10 text-center py-6">
            Explore Items
          </h2>
          {loading ? (
            <section className="h-screen flex justify-center">
              <TailSpin
                height="80"
                width="80"
                color="grey"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              />
            </section>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
              {(searchInput ? filteredProducts : products).map((product) => (
                <Product product={product} key={product.id} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DashboardScreen;
