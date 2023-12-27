import service_data from '@/src/data/service-data';
import Link from 'next/link';
import React from 'react';

const ServiceArea = () => {
    return (
        <>
            <div className="service-area grey-bg pt-110 pb-90">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-12">
                        <div className="tp-section-box tp-section-box-2 p-relative mb-45">
                            <span className="tp-section-subtitle d-inline-block pre mb-10">Services</span>
                            <h2 className="tp-section-title">
                                What We Provide
                            </h2>
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        {service_data.slice(3, 6).map((item, i) => 
                            <div key={i} className="col-lg-4 col-md-6">
                                <div className="tpsvbox mb-30">
                                    <div className="tpsvbox__thumb">
                                        <div className="fix"><a href="#"><img src={item.img} alt="theme-pure" /></a></div>
                                        <div className="tpsvbox__icon">
                                            <a href="#"><i className={item.icon}></i></a>
                                        </div>
                                    </div>
                                    <div className="tpsvbox__content text-center">
                                        <div className="tpsvbox__big-text">
                                            <h2>{item.sirial}</h2>
                                        </div>
                                        <h3 className="tpsvbox__title">
                                            <Link href="/services-details">{item.title}</Link>
                                        </h3>
                                        <p className="m-0">Service No {item.sirial}</p>
                                    </div>
                                </div>
                            </div>
                        )} 
                    </div>
                </div>
            </div> 
        </>
    );
};

export default ServiceArea;