import HeaderOne from "@/src/layout/headers/header";
import React from 'react';
import ShopDetailsArea from "./shop-details-area";
import Footer from "@/src/layout/footers/footer";


const ShopDetails = () => {
  return (
    <>
      <HeaderOne />
      <ShopDetailsArea />
      <Footer />
    </>
  );
};

export default ShopDetails;
