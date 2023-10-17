import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import back from "../assets/back1.jpg";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
function Hero() {
  const navigate = useNavigate();
  const backgroundImageStyle = {
    backgroundImage: `url(${back})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
    height: "80vh",
  };

  const placeholders = [
    "PG in Ahmedabad",
    "iPhone 13",
    "Gym equipments",
    "Laptops for rent",
    "DSLR cameras",
    "Mountain bikes",
    "Vacation rentals",
    "Party venues",
  ];

  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPlaceholder((prev) => (prev + 1) % placeholders.length);
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handleSearch = (event) => {
    if (event.key === "Enter") {
      navigate(`/dashboard/${inputValue}`);
    }
  };

  const handleButtonClick = () => {
    if (inputValue) {
      navigate(`/dashboard/${inputValue}`);
    } else {
      navigate(`/dashboard/${placeholders[currentPlaceholder]}`);
    }
  };

  return (
    <div className="hero-container" style={backgroundImageStyle}>
      <div className="w-full h-full flex flex-col justify-center items-center backdrop-brightness-50">
        <Container>
          <div className="py-10 px-1 md:px-8 relative text-white text-left">
            <h1 className="text-6xl overflow-hidden">RentIT</h1>
            <h4 className="text-2xl md:text-3xl mt-4">
              Discover Your Perfect Rental Today
            </h4>
            <div className="w-11/12 md:w-3/4 lg:max-w-3xl mt-5">
              <div className="relative z-30  text-black">
                <div className="flex items-end">
                  <input
                    type="text"
                    placeholder={`Search ${placeholders[currentPlaceholder]}`}
                    className="mt-2 shadow-md focus:outline-none rounded-3 py-3 px-6 block w-full"
                    onKeyPress={handleSearch}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                  />
                  <button
                    className="ml-2 py-3 px-4 bg-black text-white rounded-xl d-flex align-items-center"
                    onClick={handleButtonClick}
                  >
                    <FaSearch className="mr-3 " /> Search
                  </button>
                </div>
                <div className="text-left absolute top-10 rounded-t-none rounded-b-2xl shadow bg-white divide-y w-full max-h-40 overflow-auto"></div>
              </div>
            </div>
          </div>
        </Container>
        <p className="text-sm absolute bottom-0 left-0 ml-4 mb-4">
          <span className="text-gray-200">
            <Link
              to={
                "https://unsplash.com/photos/a-sandy-beach-with-green-moss-growing-on-it-Nou7tNHlf40"
              }
              target="_blank"
              className="no-underline text-gray-200"
            >
              Photo
            </Link>{" "}
          </span>
          <span className="text-gray-400">by </span>
          <span className="text-gray-200">
            <Link
              to={"https://unsplash.com/@byannel"}
              target="_blank"
              className="no-underline text-gray-200"
            >
              Anne Laure P
            </Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Hero;
