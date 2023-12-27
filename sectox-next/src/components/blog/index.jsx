import Breadcrumb from "@/src/common/breadcrumbs/breadcrumb";
import HeaderOne from "@/src/layout/headers/header";
import React from "react";
import PostboxArea from "./postbox-area";
import Footer from "@/src/layout/footers/footer";

const Blog = () => {
  return (
    <>
      <HeaderOne />
      <main>
        <Breadcrumb title="Bài viết"  innertitle="News Feeds" />
        <PostboxArea />
      </main>
      <Footer />
    </>
  );
};

export default Blog;
