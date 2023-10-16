import { Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import { useState } from "react";

import Footer from "./components/Footer";

const App = () => {
  const location = useLocation();

  const isHomeRoute = location.pathname === "/";

  return (
    <div>
      {isHomeRoute ? (
        <div style={{ marginTop: "2.5rem" }}>
          <Outlet />
        </div>
      ) : (
        <Container
          style={{
            minHeight: "calc(100vh - (2rem + 12px))",
            marginTop: "8rem",
          }}
        >
          <Outlet />
        </Container>
      )}

      <Footer />
    </div>
  );
};

export default App;
