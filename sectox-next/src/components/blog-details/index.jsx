import Breadcrumb from "@/src/common/breadcrumbs/breadcrumb";
import HeaderOne from "@/src/layout/headers/header";
import React from "react";
import PostboxArea from "./postbox-area";
import Footer from "@/src/layout/footers/footer";

const BlogDetails = () => {
  return (
    <>
      <HeaderOne />
      <main>
        <Breadcrumb title="Blog Details" innertitle="News Details" />
        <PostboxArea />
      </main>
      <Footer />
    </>
  );
};

export default BlogDetails;
