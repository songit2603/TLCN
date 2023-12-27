import Breadcrumb from "@/src/common/breadcrumbs/breadcrumb";
import HeaderOne from "@/src/layout/headers/header";
import React from "react";
import PortfolioDetailsArea from "./portfolio-details-area";
import Footer from "@/src/layout/footers/footer";

const PortfolioDetails = () => {
  return (
    <>
      <HeaderOne />
      <main>
        <Breadcrumb title="Portfolio Details" innertitle="Makloki Office CCTV Setup" />
        <PortfolioDetailsArea />
      </main>
      <Footer />
    </>
  );
};

export default PortfolioDetails;
