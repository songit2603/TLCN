import Breadcrumb from "@/src/common/breadcrumbs/breadcrumb";
import Footer from "@/src/layout/footers/footer";
import HeaderOne from "@/src/layout/headers/header";
import React from "react";
import PortfolioArea from "./portfolio-area";

const Portfolio = () => {
  return (
    <>
      <HeaderOne />
      <main>
      <Breadcrumb title="Portfolio" innertitle="Company Portfolio" />
      <PortfolioArea />
      </main>
      <Footer />
    </>
  );
};

export default Portfolio;
