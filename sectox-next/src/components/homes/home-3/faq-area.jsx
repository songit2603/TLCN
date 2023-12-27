import React from 'react';


const faq_content = {
    img: "/assets/img/bg/faq-bg.jpg",
    subtitle: "faq",
    title: "Have To Protect All  Over The Globe.",
    faq_data: [
        {
            id: 1,
            question: "Coordinate movement with breath to flow?",
            answer:  <>Our fitness clubs offer a variety of yoga classes that range from
                        beginner to advanced. With Zium access your favorite class or
                        test out a PURE Yoga class anytime, anywhere.</>,
            accordion_id: "One", 
            show: "show",
          },
          {
            id: 2,
            question: "What is the difference between a DVR and NVR?",
            answer:  <>Our fitness clubs offer a variety of yoga classes that range from
                        beginner to advanced. With Zium access your favorite class or
                        test out a PURE Yoga class anytime, anywhere.</>,
            accordion_id: "Two", 
            show: "",
          },
          {
            id: 3,
            question: "The cameras, monitors and/or video recorders?",
            answer:  <>Our fitness clubs offer a variety of yoga classes that range from
                        beginner to advanced. With Zium access your favorite class or
                        test out a PURE Yoga class anytime, anywhere.</>,
            accordion_id: "Three", 
            show: "",
          },
    ]
}
const {img, subtitle, title,faq_data}  = faq_content

const FaqArea = () => { 
    return (
        <>
            <div className="tp-faq-area pt-115 pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-6 col-lg-12 text-center text-xl-start col-12">
                        <div className="tp-about-wapper3">
                            <img src={img} alt="theme-pure" />
                        </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-12">
                        <div className="tp-faq-wrapper pt-50 pl-60 mb-40 p1-40">
                            <div className="tp-section-box tp-section-box-2  p-relative">
                                <span className="tp-section-subtitle right d-inline-block">{subtitle}</span>
                                <h2 className="tp-section-title mb-30">
                                    {title}
                                </h2>
                            </div>

                            <div className="tp-custom-accordio">
                                <div className="accordion" id="accordionExample">
                                    {faq_data.map((item, i) => 
                                        <div key={i} className="accordion-items">
                                            <h2 className="accordion-header" id={`heading${item.accordion_id}`}>
                                                <button 
                                                    className="accordion-buttons collapsed" 
                                                    type="button" 
                                                    data-bs-toggle="collapse"
                                                    data-bs-target={`#collapse${item.accordion_id}`} 
                                                    aria-expanded="true" 
                                                    aria-controls={`collapse${item.accordion_id}`}
                                                    >
                                                    {item.question}
                                                </button>
                                            </h2>
                                            <div 
                                                id={`collapse${item.accordion_id}`} 
                                                className={`accordion-collapse collapse ${item.show}`} 
                                                aria-labelledby={`heading${item.accordion_id}`}
                                                data-bs-parent="#accordionExample"
                                                >
                                                <div className="accordion-body">
                                                     {item.answer}
                                                </div>
                                            </div>
                                        </div> 
                                    )} 
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div> 

            <div className="container">
                <hr className="bdr-color" />
            </div>
        </>
    );
};

export default FaqArea;