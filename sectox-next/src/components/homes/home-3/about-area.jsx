import Link from "next/link";
import React from "react";

const about_content = {
    images: [
        {id: 1, cls_1: "ab-1st-img",  cls_2: "ab-main-img", img: "/assets/img/about/about-main-2.jpg"},
        {id: 2, cls_1: "",  cls_2: "ab-sec-img", img: "/assets/img/about/about-main-img.jpg"},
        {id: 3, cls_1: "",  cls_2: "ab-third-img d-none d-md-block", img: "/assets/img/about/ab-main-small.jpg"},
    ],
    subtitle: "About Us",
    title: "Get Best CCTV Solutions For House",
    description: <>Bandwidth has historically been very unequally distributed worldwide, with increasing concentration in the digital age.</>,

    title_1: "Private & Personal Security",
    title_2: "We believe the value that our functions add to abusiness.",
    des_1: "Bank & Institutions Solution",
    des_2: "We believe the value that our functions add to abusiness.",
    avata: "/assets/img/about/ab-small3.png",
    name: "Salim Rana",
    job_title: "Head Of Idea",

}
const {images, subtitle, title, description, title_1, title_2, des_1, des_2, avata, name, job_title}  = about_content


const AboutArea = () => {
  return (
    <>
      <div className="tp-about-area pt-120 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="tp-about-wapper3 mb-30">
                {images.map((item, i) => 
                    <div key={i} className={item.cls_2}>
                        <img
                        className={item.cls_1}
                        src={item.img}
                        alt="theme-pure"
                        />
                    </div>                
                )} 
              </div>
            </div>
            <div className="col-xl-6 col-lg-6">
              <div className="tp-ab-wrapper-3 pt-55 pl-50 mb-30">
                <div className="tp-section-box tp-section-box-2 mb-40  p-relative">
                  <span className="tp-section-subtitle right d-inline-block">
                    {subtitle}
                  </span>
                  <h2 className="tp-section-title mb-20">
                    {title}
                  </h2>
                  <p className="p-text">{description}</p>
                </div>
                <div className="tp-ab-fe-box mb-40">
                  <div className="about-feature-list d-flex align-items-center mb-20">
                    <div className="about-icon mr-25">
                      <i className="flaticon-web-security"></i>
                    </div>
                    <div className="about-feature-text">
                      <h5 className="m-0 mb-5">{title_1}</h5>
                      <p className="m-0">{des_1}</p>
                    </div>
                  </div>
                  <div className="about-feature-list d-flex align-items-center">
                    <div className="about-icon mr-25">
                      <i className="flaticon-school"></i>
                    </div>
                    <div className="about-feature-text">
                      <h5 className="m-0 mb-5">{title_2}</h5>
                      <p className="m-0">{des_2}</p>
                    </div>
                  </div>
                </div>
                <div className="tp-about-fea-signature d-flex align-items-center">
                  <div className="mr-30 mb-10">
                    <Link className="tp-btn-border" href="/about"> Learn More <i className="fal fa-long-arrow-right"></i>
                    </Link>
                  </div>
                  <div className="about-signature d-flex align-items-center mb-10">
                    <img src={avata} alt="theme-pure" />
                    <div className="ab-meta-content ml-15">
                      <h6 className="m-0 ab-meta-title">{name}</h6>
                      <span className="ab-meta-subtitle">{job_title}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutArea;
