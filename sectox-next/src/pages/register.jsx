import React from "react";
import Wrapper from "../layout/wrapper";
import SEO from "../common/seo";
import RegisterPage from "../components/register";

const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Sectox - CCTV & Security"} />
      <RegisterPage />
    </Wrapper>
  );
};

export default index;