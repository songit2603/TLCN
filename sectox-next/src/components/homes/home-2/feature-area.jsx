import service_data from '@/src/data/service-data';
import React from 'react';

const FeatureArea = () => {
    return (
        <>
           <div className="tp-process-area grey-bg pt-110 pb-90">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                        <div className="tp-section-box tp-section-box-2 p-relative mb-45">
                            <span className="tp-section-subtitle d-inline-block right mb-10">Services</span>
                            <h2 className="tp-section-title">
                                What We Provide
                            </h2>
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        {service_data.slice(6, 10).map((item, i)  => 
                            <div key={i} className=" col-xl-3 col-lg-6 col-md-6 mb-30">
                                <div className="tpprocess">
                                    <div className="tpprocess__content">
                                        <h3>{item.sirial}</h3>
                                        <h6 className="tpprocess__title">{item.title}</h6>
                                        <p>{item.description}</p>
                                    </div>
                                    <div className="tpprocess__circle">
                                        <div className="tp-c-icon">
                                            <i className={item.icon}></i>
                                        </div>
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

export default FeatureArea;