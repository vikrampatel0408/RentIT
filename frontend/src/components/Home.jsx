import { Container, Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom"; // Import useLocation
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useEffect } from "react"; // Import useEffect for navigation
import Services from "./Services";

import back from "../assets/back.jpg";
import Hero from "./Hero";
const Home = () => {
  return (
    <div className=" py-5">
      <Hero />
      <Services />
    </div>
  );
};

export default Home;
