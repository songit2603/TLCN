import pricing_data from '@/src/data/pricing-data';
import Link from 'next/link';
import React from 'react';

const PricingArea = () => {
    return (
        <>
            <div className="pricing-area black-bg pb-85">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-12">
                        <div className="tp-section-box tp-section-white tp-price-title z-index p-relative mb-45">
                            <h3 className="tp-big-text">Plans</h3>
                            <span className="tp-section-subtitle d-inline-block mb-10">Pricing</span>
                            <h2 className="tp-section-title">
                                Price & Plans
                            </h2>
                        </div>
                        </div>
                    </div>
                    <div className="row align-items-end">
                        {pricing_data.map((item, i ) => 
                            <div key={i} className="col-lg-4 col-md-6">
                                <div className={`tp-price ${item.active} mb-30`}>
                                    {item.badge && 
                                        <div className="tp-price-badge">
                                            <span>{item.badge}</span>
                                        </div>
                                    }
                                        <div className="tp-price-head p-relative">
                                            <div className="tp-price-bg-text">
                                                <span>{item.id}</span>
                                            </div>
                                            <div className="tp-price-content">
                                                <h6 className={item.theme_color}>{item.title}</h6>
                                                <h3 className="tp-price-value">${item.price}</h3>
                                                <p>{item.description}</p>
                                            </div>
                                        </div>
                                        <div className="tp-price-feature">
                                            <ul>
                                                {item.features?.map((feature, index)  => 
                                                    <li key={index} className={feature.inactive_cls}>
                                                        <i className="fal fa-check"></i>{feature.feature}
                                                    </li>   
                                                )} 
                                            </ul>
                                        </div>
                                        <div className="tp-price-btn">
                                            <Link href="/contact" className="tp-black-btn w-100">
                                                Choose The Plan 
                                            <i className="fal fa-long-arrow-right"></i>
                                            </Link>
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