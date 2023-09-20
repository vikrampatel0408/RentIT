import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { TailSpin } from "react-loader-spinner";
import Header from "../components/Header";
const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userData = location.state;
  const handleBackButtonClick = () => {
    navigate(-1);
  };
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:6969/api/product/${id}`);
        if (response.ok) {
          const data = await response.json();
          setProduct(data.product);
        } else {
          console.error("Failed to fetch product");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return (
      <section className="h-screen flex justify-center items-center">
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
    );
  }

  const { name, price, description, image } = product;

  return (
    <>
      <Header />

      <section className="pt-[450px] md:pt-32 pb-[400px] md:pb-12 lg:py-32 h-screen flex items-center pt-0">
        <div className="container mx-auto">
          <button
            className="bg-primary py-1 px-3 text-white"
            onClick={handleBackButtonClick}
          >
            Back
          </button>

          <div className="flex flex-col lg:flex-row items-center">
            <div className="flex flex-1 justify-center items-center mb-8 lg:mb-0">
              <img className="max-w-[200px] lg:max-w-xs" src={image} alt="" />
            </div>

            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-[26px] font-medium mb-2 max-w-[450px] mx-auto lg:mx-0">
                {name}
              </h1>
              <div className="text-2xl text-red-500 font-medium mb-6">
                ₹ {price}
              </div>
              <p className="mb-8">{description}</p>
              <button className="bg-primary py-4 px-8 text-white">Buy</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetails;
