import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";
import Footer from "./components/Footer";
const App = () => {
  return (
    <>
      {/* <Header /> */}
      <Container
        style={{ minHeight: "calc(100vh - (2rem + 12px))", marginTop: "8rem" }}
      >
        <Outlet />
      </Container>

      <Footer />
    </>
  );
};

export default App;
