import testimonial_data from '@/src/data/testimonial-data';
import React from 'react';
import Slider from 'react-slick';


const setting = {
    slidesToShow: 3,
    arrows: false ,
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
    return (
        <>
           <div className="testimonial-area pt-120 pb-120 grey-bg">
      <div className="container">
         <div className="row text-center">
            <div className="col-12">
               <div className="tp-section-box tp-section-gray z-index p-relative mb-60">
                  <h3 className="tp-big-text tp-price-big tp-testimonial-big">Feedback</h3>
                  <span className="tp-section-subtitle d-inline-block mb-10">testimonial</span>
                  <h2 className="tp-section-title tp-price tp-section-title2">
                     Users Feedbacks
                  </h2>
               </div>
            </div>
         </div>
         <div className="tp-testimonial-active slider-space-30">
            <Slider  {...setting} >
                {testimonial_data.slice(0, 5).map((item, i) =>  
                    <div key={i} className="tp-test-slide">
                        <div className="tp-testimonial text-center">
                        <div className="quote-icon">
                            <img src="/assets/img/testimonial/quote.png" alt="theme-pure" />
                        </div>
                        <h4>{item.title}</h4>
                        <div className="testimonial-img">
                            <img src={item.author_img} alt="theme-pure" />
                            <i className="fal fa-quote-left"></i>
                        </div>
                        <div className="testimonial-meta">
                            <h5 className="reviewer-name">{item.name}</h5>
                            <span className="reviewer-position">{item.job_title}</span>
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