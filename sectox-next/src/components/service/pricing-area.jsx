import Link from 'next/link';
import React from 'react';

const pricing_data = [
    {
        id: 1, 
        active_cls: "",
        sirial: "01",
        title: "Standard",
        price: "39.00",
        info: <>Teachings of the great explorer of the truth, the master-builder.</>,
        features: [
            "CCTV stands for closed-circuit TV",
            "Modern CCTV system work",
            "Type of system involved",
            "Defined by the types of camera",
        ]
    },
    {
        id: 2, 
        active_cls: "active-2",
        sirial: "02",
        title: "For Agency",
        price: "49.00",
        info: <>Teachings of the great explorer of the truth, the master-builder.</>,
        features: [
            "CCTV stands for closed-circuit TV",
            "Modern CCTV system work",
            "Type of system involved",
            "Defined by the types of camera",
        ]
    },
    {
        id: 3, 
        active_cls: "",
        sirial: "03",
        title: "For Office",
        price: "99.00",
        info: <>Teachings of the great explorer of the truth, the master-builder.</>,
        features: [
            "CCTV stands for closed-circuit TV",
            "Modern CCTV system work",
            "Type of system involved",
            "Defined by the types of camera",
        ]
    },
]

const PricingArea = () => {
    return (
        <>
            <div className="pricing-area pb-90">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-xl-12">
                        <div className="tp-section-box tp-section-box-2 p-relative mb-45">
                            <span className="tp-section-subtitle d-inline-block pre mb-10">pricing</span>
                            <h2 className="tp-section-title">
                                Price & Plans
                            </h2>
                        </div>
                        </div>
                    </div>
                    <div className="row align-items-end">
                        {pricing_data.map((item, i) => 
                             <div key={i} className="col-lg-4 col-md-6">
                                <div className={`tp-price tp-price-service ${item.active_cls} mb-30`}>
                                    {item.active_cls && <div className="tp-price-badge">
                                            <span>Best Price For Agency</span>
                                        </div>                                    
                                    }
                                    <div   className="tp-price-head p-relative">
                                        <div className="tp-price-bg-text">
                                            <span>{item.sirial}</span>
                                        </div>
                                        <div className="tp-price-content">
                                            <h6>{item.title}</h6>
                                            <h3 className="tp-price-value">${item.price}</h3>
                                            <p>{item.info}</p>
                                        </div>
                                    </div>
                                    <div className="tp-price-feature">
                                        <ul>
                                            {item.features?.map((feature, index) =>  <li key={index}><i className="fal fa-check"></i>{feature}</li>)} 
                                        </ul>
                                    </div>
                                    <div className="tp-price-btn">
                                        <Link href="/contact" className={`${item.active_cls ? "tp-btn" : "tp-white-btn"} w-100`}>Choose The Plan <i className="fal fa-long-arrow-right"></i></Link>
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

export default PricingArea;