import React from 'react';


const service_data = [
    {
        id: 1, 
        icon: "flaticon-secure",
        title: "Smart Systems",
        description: <>We believe the value that our functions add to a business.</>,
    },
    {
        id: 2, 
        icon: "flaticon-security-camera",
        title: "Video Intercoms",
        description: <>We believe the value that our functions add to a business.</>,
    },
    {
        id: 3, 
        icon: "flaticon-settings",
        title: "Smart Systems",
        description: <>We believe the value that our functions add to a business.</>,
    },
    {
        id: 4, 
        icon: "flaticon-star-1",
        title: "Camcorders Kits",
        description: <>We believe the value that our functions add to a business.</>,
    },
]

const ServiceArea = () => {
    return (
        <>
            <div className="tp-process-area grey-bg pt-115 pb-90 ">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-xl-12">
                        <div className="tp-section-box tp-section-box-2 p-relative mb-45">
                            <span className="tp-section-subtitle d-inline-block pre mb-10">Services</span>
                            <h2 className="tp-section-title">
                                What We Provide
                            </h2>
                        </div>
                        </div>
                    </div>
                    <div className="row counter-row">
                        {service_data.map((item, i)  => 
                            <div key={i} className=" col-xxl-3 col-xl-3 col-lg-6 col-md-6 mb-30">
                                <div className="tpprocess-hm-4 p-relative">
                                    <div className="process-content"></div>
                                    <span className="flaticon-secure"><i className={item.icon}></i></span>
                                    <div className="tp-process-contnt-4">
                                        <h6>{item.title}</h6>
                                        <p className="m-0">{item.description}</p>
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