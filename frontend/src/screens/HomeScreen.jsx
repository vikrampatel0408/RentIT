import React from "react";
import { useLocation } from "react-router-dom";
import Home from "../components/Home.jsx";

const HomeScreen = () => {
  const location = useLocation();
  return (
    <>
      <Home />
    </>
  );
};

export default HomeScreen;
