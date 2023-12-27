import React from "react";
import Wrapper from "../layout/wrapper";
import SEO from "../common/seo";
import LoginPage from "../components/login";

const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Sectox - CCTV & Security"} />
      <LoginPage />
    </Wrapper>
  );
};

export default index;