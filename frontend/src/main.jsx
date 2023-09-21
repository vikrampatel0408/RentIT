import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen.jsx";
import RegisterScreen from "./screens/RegisterScreen.jsx";
import DashboardScreen from "./screens/DashboardScreen.jsx";
import ProductDetails from "./screens/ProductDetails.jsx";
import Postform from "./screens/Postform.jsx";
import ProfileScreen from "./screens/ProfileScreen.jsx";
import EditProfileScreen from "./screens/EditProfileScreen.jsx";
import UserProductsScreen from "./screens/userProductsScreen.jsx";
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/dashboard" element={<DashboardScreen />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/profile" element={<ProfileScreen />} />
      <Route path="/edit-profile" element={<EditProfileScreen />} />
      <Route path="/addproduct" element={<Postform />} />
      <Route path="/userproducts" element={<UserProductsScreen />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
