import Wrapper from "../../layout/wrapper";
import SEO from "../../common/seo";
import ShopDetails from "../../components/shop-details";
import React, { useEffect} from "react";
import { useRouter } from 'next/router';

const index = () => {
  return (
    <Wrapper>
      {}
      <SEO pageTitle={"Sectox - CCTV & Security"} />
      <ShopDetails />
    </Wrapper>
  );
};

export default index;
