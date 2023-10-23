import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
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
  const searchItem = useParams("searchItem").searchItem;

  useEffect(() => {
    if (searchItem) {
      setSearchInput(searchItem);
    }
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
          "https://rentit-api.onrender.com/api/product/allproduct"
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

  useEffect(() => {
    if (products.length > 0) {
      const options = {
        keys: ["name", "category"],
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
  const handleBackButtonClick = () => {
    navigate(-1);
  };
  const handleSellClick = () => {
    console.log("button click " + userData);
    console.log(userData);
    navigate("/addproduct");
  };

  return (
    <>
      <Header />
      {searchItem ? (
        <div className="flex items-center mb-4">
          <BiArrowBack
            className="cursor-pointer text-3xl text-gray-500 hover:text-gray-700"
            onClick={handleBackButtonClick}
          />
        </div>
      ) : null}

      <section className="py-20">
        {searchItem ? (
          <></>
        ) : (
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
                  value={searchItem === "" ? "" : searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
              </div>
            </form>
          </div>
        )}
        <div className="container mx-auto">
          {userData._id ? (
            <div class="group fixed bottom-0 right-0 p-2 flex items-end justify-end w-24 h-24 z-50 m-5">
              <div class="text-white shadow-xl flex items-center justify-center p-3 rounded-full bg-gray-500 z-50 absolute">
                <button
                  type="button"
                  onClick={handleSellClick}
                  title="Add Item"
                >
                  <FaPlus className="text-3xl" />
                </button>
              </div>
            </div>
          ) : null}

          <h2 className="text-3xl font-semibold mb-10 text-center py-6">
            Explore Items
          </h2>
          {loading ? (
            <section className="h-screen flex justify-center">
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
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 lg:mx-8 gap-[30px] max-w-sm mx-auto md:max-w-none md:mx-0">
              {(searchInput ? filteredProducts : products).map((product) =>
                !product.sold ? (
                  <Product user={false} product={product} key={product.id} />
                ) : (
                  <></>
                )
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DashboardScreen;
