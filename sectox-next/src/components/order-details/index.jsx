import HeaderOne from "@/src/layout/headers/header";
import React from "react";
import OrderDetailsArea from "./order-details-area";
import Footer from "@/src/layout/footers/footer";

const OrderDetails = () => {
  return (
    <>
      <HeaderOne />
      <OrderDetailsArea />
      <Footer />
    </>
  );
};

export default OrderDetails;
