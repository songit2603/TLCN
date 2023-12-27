import Link from "next/link";
import React from "react"; 
import Footer from "../layout/footers/footer"; 
import SEO from "../common/seo";
import HeaderOne from "../layout/headers/header";

const index = () => {
  return (
    <>
      <SEO pageTitle={"Oops.! Page Not Found!"} />
      <HeaderOne />
      <div id="smooth-wrapper error_page">
        <div id="smooth-content">
          <main>
            <div className="tp-error-area tp-error-ptb p-relative">
              <div className="container">
                <div className="row">
                  <div className="col-xl-12">
                    <div className="tp-error-content-box text-center mb-40">
                      <img src="/assets/img/text-404.png" alt="theme-pure" />
                    </div>
                    <div className="tp-error-text-box text-center">
                      <h4 className="error-title-sm">Trang không tìm thấy!</h4>
                      <p>Có vẻ trang bạn cần tìm không tồn tại!</p>
                      <Link
                        className="slider-btn"
                        href="/shop"
                      >
                        <span> Tiếp tục mua sắm</span>
                        <b></b>
                      </Link> 
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default index;
