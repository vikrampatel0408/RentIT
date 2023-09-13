import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Product from "../components/Product";
import { TailSpin } from "react-loader-spinner";

const DashboardScreen = () => {
  const location = useLocation();
  const userData = location.state;
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (response.ok) {
          const data = await response.json();
          setProducts(data);
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
    filterProducts();
  }, [searchInput, products]);

  const filterProducts = () => {
    const filtered = products.filter((product) => {
      const searchTerm = searchInput.toLowerCase();
      const productName = product.title.toLowerCase();
      const category = product.category.toLowerCase();

      return productName.includes(searchTerm) || category.includes(searchTerm);
    });

    setFilteredProducts(filtered);
  };

  return (
    <>
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
          <h2 className="text-3xl font-semibold mb-10 text-center py-6">
            Explore Items
          </h2>
          {loading ? (
            <section className="h-screen flex justify-center items-center ">
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
