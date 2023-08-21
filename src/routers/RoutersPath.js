import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AllFoods from "../pages/AllFoods";
import Contact from "../pages/ContactPage";
import FoodDetails from "../pages/FoodDetails";
import Home from "../pages/Home";
import Login from "../pages/LoginPage";
import Register from "../pages/RegisterPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import RegisterPage from "../pages/RegisterPage";
import ContactPage from "../pages/ContactPage";
import SuccessMessage from "../components/Checkout/SuccessMessage";
import PastOrders from "../components/PastOrders/PastOrders";

function RoutersPath() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home"> </Navigate>}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/foods" element={<AllFoods></AllFoods>}></Route>
      <Route
        path="/foods/:foodDetailId"
        element={<FoodDetails></FoodDetails>}
      ></Route>
      <Route path="/cart" element={<CartPage></CartPage>}></Route>
      <Route path="/checkout" element={<CheckoutPage></CheckoutPage>}></Route>
      <Route
        path="/checkout/payment"
        element={<SuccessMessage></SuccessMessage>}
      ></Route>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/register" element={<RegisterPage></RegisterPage>}></Route>
      <Route path="/contact" element={<ContactPage></ContactPage>}></Route>
      <Route path="/orders" element={<PastOrders></PastOrders>}></Route>
    </Routes>
  );
}

export default RoutersPath;
