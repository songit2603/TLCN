import React from "react";
import Wrapper from "../layout/wrapper";
import SEO from "../common/seo";
import Checkout from "../components/checkout";

const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Sectox - CCTV & Security"} />
      <Checkout />
    </Wrapper>
  );
};

export default index;
