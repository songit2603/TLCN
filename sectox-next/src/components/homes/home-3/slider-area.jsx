import Link from 'next/link';
import React, { useRef } from 'react';
import Slider from 'react-slick';

const slider_data = [
    {
        id: 1,
        bg_img: "/assets/img/slider/slider3.jpg",
        bg_title: "CCTV",
        subtitle: "Best cctv solution in us",
        title: "Secure Your Family  From All Issues",
    },

    {
        id: 2,
        bg_img: "/assets/img/slider/slider4.jpg",
        bg_title: "CCTV",
        subtitle: "Best cctv solution in us",
        title: "Secure Your Family  From All Issues",
    },

]

const setting = {
    fade:true,
    slidesToShow: 1,
    arrows: false,
    responsive: [
        {
            breakpoint: 992,
            settings: {
                arrows: false,
            }
        },
        {
            breakpoint: 768,
            settings: {
                arrows: false,
            }
        },
        {
            breakpoint: 480,
            settings: {
                arrows: false,
            }
        }
    ]
}

const SliderArea = () => {
  const sliderRef = useRef(null);
    return (
        <>
            <div className="tp-slider-area">    
                <div className="slider-active slider-arrow-3-style p-relative"> 
                    <button type="button" onClick={() => sliderRef.current?.slickPrev()} className="slick-prev slick-arrow"><i className="flaticon-left-arrow"></i> </button>
                    <button type="button" onClick={() => sliderRef.current?.slickNext()} className="slick-next slick-arrow"><i className="flaticon-right-arrow"></i> </button>
                    <Slider {...setting} ref={sliderRef} > 
                        {slider_data.map((item, i)  => 
                            <div key={i} > 
                                <div className="tp-slider-item p-relative tp-slider-height tp-slider-overlay-3 d-flex align-items-center"
                                    style={{backgroundImage: `url(${item.bg_img})`}}>
                                    <div className="container">
                                    <div className="row text-center">
                                        <div className="col-xl-8 m-auto">
                                            <div className="tp-slider-content tp-slider-content-two tp-slider-content-three">
                                                <div className="tp-slider-big-text d-none d-xl-block">
                                                <h2>{item.bg_title}</h2>
                                                </div>
                                                <span className="tp-slider-sub-title p-0">{item.subtitle}</span>
                                                <h2 className="tp-slider-title">{item.title}</h2>
                                            </div>
                                            <div className="tp-slide-btn-box-3 d-flex flex-wrap justify-content-center">
                                                <div className="slider-btn">
                                                <Link href="/contact" className="tp-btn-white">Get In Touch</Link>
                                                </div>
                                                <div className="slider-btn">
                                                <Link href="/services-details" className="tp-btn">Our Services</Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    </div>
                                </div> 
                             </div>
                        )} 
                    </Slider>
                </div> 
            </div> 
        </>
    );
};

export default SliderArea;