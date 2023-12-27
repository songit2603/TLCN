import React from 'react';

const process_data = [
    {id: 1, icon: "flaticon-cloud", title: "Drone CCTV Discussion"},
    {id: 2, icon: "flaticon-security-camera", title: "Live Footage Collection"},
    {id: 3, icon: "flaticon-settings", title: "Monitor From Anywhere"},
    {id: 4, icon: "flaticon-approved", title: "Hacker & Custom Solution"},
    {id: 5, icon: "flaticon-guard", title: "Desk & HDD Solution"},
    {id: 6, icon: "flaticon-drone-3", title: "Flight Mode Activated"}, 
]

const ProcessArea = () => {
    return (
        <>
         <div className="tp-process-area pt-115 pb-110">
            <div className="container">
                <div className="row text-center">
                    <div className="col-xl-12">
                    <div className="tp-section-box tp-section-box-2 p-relative mb-50">
                        <span className="tp-section-subtitle d-inline-block pre mb-10">process</span>
                        <h2 className="tp-section-title">
                            How We Work Here
                        </h2>
                    </div>
                    </div>
                </div>
                <div className="row counter-row">
                    {process_data.map((item, i) => 
                        <div key={i} className="col-xl-2 col-lg-4 col-md-4">
                            <div className="tp-process-item-2 text-center mb-30">
                                <div className="counter-content"></div>
                                <h5>{item.title}</h5>
                                <i className={item.icon}></i>
                            </div>
                        </div>
                    )} 
                </div>
                <div className="process-bottom-text text-center">
                    <h3 className="tp-pro-text mt-50 mb-35">Providing Smart Security For The Smart Generation.</h3>
                    <div className="process-btn">
                    <a className="tp-btn" href="#">Commercial CCTV System <i className="fal fa-long-arrow-right"></i></a>
                    <a className="tp-black-btn-2 " href="#">Residential CCTV System</a>
                    </div>
                </div>
            </div>
        </div>            
        </>
    );
};

export default ProcessArea;