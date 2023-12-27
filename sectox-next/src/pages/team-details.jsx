import React from "react";
import Wrapper from "../layout/wrapper";
import SEO from "../common/seo";
import TeamDetails from "../components/team-details";

const index = () => {
  return (
    <Wrapper>
      <SEO pageTitle={"Sectox - CCTV & Security"} />
      <TeamDetails />
    </Wrapper>
  );
};

export default index;
