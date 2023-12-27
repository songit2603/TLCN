import Breadcrumb from "@/src/common/breadcrumbs/breadcrumb";
import HeaderOne from "@/src/layout/headers/header";
import React from "react"; 
import AboutArea from "./about-area";
import ServiceArea from "./service-area";
import GallaryArea from "./gallary-area";
import OurHistory from "./our-history";
import FeatureArea from "./feature-area";
import BlogArea from "./blog-area";
import Footer from "@/src/layout/footers/footer";

const About = () => {
  return (
    <>
      <HeaderOne />
      <Breadcrumb  title="Về chúng tôi"  innertitle="Giới thiệu "  />
      <AboutArea />
      <ServiceArea />
      <GallaryArea />
      <OurHistory />
      <FeatureArea />
      <BlogArea />
      <Footer />
    </>
  );
};

export default About; 
