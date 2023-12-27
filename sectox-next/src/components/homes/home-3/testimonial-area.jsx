import testimonial_data from '@/src/data/testimonial-data';
import React, { useRef } from 'react';
import Slider from 'react-slick';


const setting = {
    slidesToShow: 3,
    arrows: false, 
    responsive: [
        {
            breakpoint: 992,
            settings: {
                arrows: false,
                slidesToShow: 2
            }
        },
        {
            breakpoint: 767,
            settings: {
                arrows: false,
                slidesToShow: 1
            }
        }
    ]
}
const TestimonialArea = () => {
    const sliderRef =useRef(null)
    return (
        <>
            <div className="testimonial-area pt-110 pb-120">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6">
                        <div className="tp-section-box tp-section-box-2 p-relative mb-45">
                            <span className="tp-section-subtitle d-inline-block right mb-10">testimonials</span>
                            <h2 className="tp-section-title">
                                User Feedbacks
                            </h2>
                        </div>
                        </div>
                        <div className="col-lg-6">
                        <div className="tp-test-arrow text-end mb-45">
                            <button onClick={() => sliderRef.current?.slickPrev()} type="button" className="slick-prev slick-arrow"><i className="far fa-long-arrow-alt-left"></i> </button>
                            <button onClick={() => sliderRef.current?.slickNext()} type="button" className="slick-next slick-arrow"><i className="far fa-long-arrow-alt-right"></i> </button>

                        </div>
                        </div>
                    </div>
                    <div  className="tp-testimonial-active tp-testimonial-white slider-space-30">
                        <Slider {...setting}  ref={sliderRef}>
                                {testimonial_data.map((item, i)  =>
                                <div key={i}>
                                    <div className="testi-item-list">
                                        <div className="tp-testimonial-item text-center">
                                            <div className="testi-img p-relative">
                                                <img src={item.author_img} alt="theme-pure" />
                                                <i className="fal fa-quote-right quote-style"></i>
                                            </div>
                                            <h4 className="testi-text">{item.title}</h4>
                                            <div className="testi-meta">
                                                <h5 className="reviewer-name">{item.name}</h5>
                                                <span className="reviewer-position">{item.job_title}</span>
                                            </div>
                                        </div>
                                    </div>    
                                </div>
                                )}
                        </Slider> 
                    </div>
                </div>
            </div> 
        </>
    );
};

export default TestimonialArea;