import HeaderThree from "@/src/layout/headers/header-3";
import React from "react";
import SliderArea from "./slider-area";
import AboutArea from "./about-area";
import ServiceArea from "./service-area";
import TestimonialArea from "./testimonial-area";
import FeatureArea from "./feature-area";
import ProcessArea from "./process-area";
import ShopArea from "./shop-area";
import FaqArea from "./faq-area";
import TeamArea from "./team-area";
import VideoArea from "./video-area";
import BlogArea from "../home-2/blog-area";
import TopFooter from "./top-footer";
import Footer from "@/src/layout/footers/footer";

const HomeThree = () => {
  return (
    <>
      <HeaderThree />
      <SliderArea />
      <AboutArea />
      <ServiceArea />
      <TestimonialArea />
      <FeatureArea />
      <ProcessArea />
      <ShopArea />
      <FaqArea />
      <TeamArea />
      <VideoArea />
      <BlogArea /> 
      <TopFooter />
      <Footer />
    </>
  );
};

export default HomeThree;
