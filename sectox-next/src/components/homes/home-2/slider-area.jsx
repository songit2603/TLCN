import Link from 'next/link';
import React, { useRef } from 'react';
import Slider from 'react-slick';

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

const slider_data = [
    {
        id: 1,
        col: "col-xxl-6 col-xl-7 col-lg-8 col-md-12", 
        bg_img: "/assets/img/slider/banner-2.jpg",
        sub_title: "Solid solution for your home & office",
        title: "Secure Your Office & House",
        info: <>Teaching of the great explorer of the truth, the master-builder of{" "} <br /> human happiness. No one rejects, dislikes </>, 
        slider_service_title:  <> <b>Installation</b> <br /> Free Service </> ,
      },
      {
        id: 2,
        col: "col-xxl-6 col-xl-7 col-lg-8", 
        bg_img: "/assets/img/slider/slider-2-1.jpg",
        sub_title: "Solid solution for your home & office",
        title: "Secure Your Office & House",
        info: <>Teaching of the great explorer of the truth, the master-builder of{" "} <br /> human happiness. No one rejects, dislikes </>, 
        slider_service_title:  <> <b>Installation</b> <br /> Free Service </> ,
      },
]
const SliderArea = () => {
  const sliderRef = useRef(null);

    return (
        <>
            <div className="tp-slider-area">
                <div className="slider-active slider-arrow-style p-relative">
                    <button type="button" onClick={() => sliderRef.current?.slickPrev()} className="slick-prev slick-arrow" >
                        <i className="flaticon-left-arrow"></i>
                    </button>
                    <button type="button" onClick={() => sliderRef.current?.slickNext()} className="slick-next slick-arrow" >
                        <i className="flaticon-right-arrow"></i>
                    </button>
                    <Slider {...setting} ref={sliderRef} >
                        {slider_data.map((item, i) => 
                            <div key={i}> 
                                <div className="tp-slider-item tp-slider-height tp-slider-overlay-2 d-flex align-items-center"
                                    style={{backgroundImage: `url(${item.bg_img})`}}>
                                    <div className="container">
                                    <div className="row justify-content-xxl-end">
                                        <div className={item.col}>
                                            <div className="tp-slider-content tp-slider-content-two ">
                                                <span className="tp-slider-sub-title p-0">{item.sub_title}</span>
                                                <h2 className="tp-slider-title">{item.title}</h2>
                                                <p>{item.info}</p>
                                                <div className="tp-slide-btn-box mt-45">
                                                <div className="slider-btn mr-30">
                                                    <Link  href="/contact" className="tp-btn-white">Get In Touch</Link>
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
                            </div>
                        )}
                    </Slider> 
                </div>
            </div>
        </>
    );
};

export default SliderArea;