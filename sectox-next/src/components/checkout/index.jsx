import HeaderOne from "@/src/layout/headers/header";
import React from "react";
import CheckoutArea from "./checkout-area";
import Footer from "@/src/layout/footers/footer";

const Checkout = () => {
  return (
    <>
      <HeaderOne />
      <CheckoutArea />
      <Footer />   
    </>
  );
};

export default Checkout;
