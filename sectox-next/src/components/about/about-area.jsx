import Link from 'next/link';
import React from 'react';


const about_content = {
    img: "/assets/img/about/ab-hm-4.jpg",
    title: <>Good Experience <br /> In Last</>,
    year_count: "30",
    year: "Years",
    about: "About Us",
    about_title: " Magtnificient Quality Gives You an Edge",
    post_img: "/assets/img/about/ab-sm-4-4.jpg",
    post : <>In 2014 only 3 countries host 50% of the globally installed bandwidth potential.</>,
    author: <><b>Alonso D. Dowson</b> <i>-Head Of Idea</i></>,
    fetoure_1: "New Business Ideas create",
    fetoure_2: "Grow corporate financial system",


}  
const {img, title, year_count, year, about, about_title, post_img, post, author, fetoure_1, fetoure_2}  = about_content


const AboutArea = () => {
    return (
        <>
           <div className="tp-about-area pt-120 pb-120">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-5">
                        <div className="ab-wrapper-4 p-relative">
                            <div className="ab-right-img">
                                <img src={img} alt="theme-pure" />
                            </div>
                            <div className="tp-ab-left-meta">
                                <h3>{title}</h3>
                                <h4>{year_count}</h4>
                                <h5>{year}</h5>
                            </div>
                        </div>
                        </div>
                        <div className="col-xl-6 col-lg-7">
                        <div className="tp-about-info-wrapper pl-50">
                            <div className="tp-section-box tp-section-box-2  p-relative">
                                <span className="tp-section-subtitle right d-inline-block">{about}</span>
                                <h2 className="tp-section-title mb-15">
                                   {about_title}
                                </h2>
                            </div>
                            <hr className="mt-25 mb-30" />
                            <div className="tp-ab-meta">
                                <div className="about-meta-img d-flex">
                                    <img src={post_img} alt="theme-pure" />
                                    <div className="tp-ab-meta-text pl-30">
                                    <h4>{post}</h4>
                                    <span>{author}</span>
                                    </div>
                                </div>
                            </div>
                            <hr className="mt-30 mb-35" />
                            <div className="tp-ab-4-list">
                                <div className="tp-about-fea-item">
                                    <ul>
                                    <li><i className="fal fa-check"></i>{fetoure_1}</li>
                                    <li><i className="fal fa-check"></i>{fetoure_2}</li>
                                    </ul>
                                </div>
                            </div>
                            <Link className="tp-btn-border" href="/contact">Get Started Now</Link>
                        </div>
                        </div>
                    </div>
                </div>
            </div>  
        </>
    );
};

export default AboutArea;