import ContactForm from '@/src/forms/contact-form';
import React from 'react';

const ContactArea = () => {
    return (
        <>
            <div className="contact-page pt-115 pb-115">
                <div className="container">
                <div className="contact-bg grey-bg">
                    <div className="row">
                        <div className="col-xxl-6 col-xl-7 col-lg-6">
                            <div className="contact-map">
                            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.4853986111284!2d106.7693381760201!3d10.850637657818462!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752763f23816ab%3A0x282f711441b6916f!2sHCMC%20University%20of%20Technology%20and%20Education!5e0!3m2!1sen!2s!4v1699535946455!5m2!1sen!2s" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                            </div>
                        </div>
                        <div className="col-xxl-6 col-xl-5 col-lg-6">
                        <div className="contact-us">
                            <div className="tp-section-box tp-section-box-2  p-relative">
                                <span className="tp-section-subtitle right d-inline-block">Liên hệ</span>
                                <h2 className="tp-section-title mb-35">
                                    Góp ý để chúng tôi cải thiện tốt hơn
                                </h2>
                            </div>
                            <div className="contact">
                                <div className="contact__form">
                                    <ContactForm /> 
                                    <p className="ajax-response"></p>
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

export default ContactArea;
