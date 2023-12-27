import Breadcrumb from "@/src/common/breadcrumbs/breadcrumb";
import Footer from "@/src/layout/footers/footer";
import HeaderOne from "@/src/layout/headers/header";
import React from "react";
import FaqArea from "./faq-area";
import FactArea from "../homes/home/fact-area";
import FeatureArea from "../homes/home/feature-area";

const Faq = () => {
  return (
    <>
      <HeaderOne /> 
      <Breadcrumb title="faq" innertitle="Faq Page" />
      <FaqArea />
      <FactArea /> 
      <FeatureArea style_faq={true} /> 
      <Footer />
    </>
  );
};

export default Faq;
