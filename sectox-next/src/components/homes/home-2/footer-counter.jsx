import React from 'react';


const footter_counter ={
    logo: "/assets/img/logo/logo2.png",
    counter_info: [
        {id: 1, cls: "text-md-right", count: 820, info: <>Happy Users <br /> Around The World</>,},
        {id: 2, cls: "", count: 120, info: <>Projects <br /> Already Done</>,},
        {id: 3, cls: "", count: 20, info: <>Get Rewards <br /> From Other Story</>,},
    ]
}
const {logo, counter_info}  = footter_counter
const FooterCounter = () => {
    return (
        <> 
            <div className="tp-footer-counter-area theme-bg pt-25">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-xl-3 col-lg-6 col-md-6  text-lg-start">
                        <div className="tp-counter-logo">
                            <img src={logo} alt="theme-pure" />
                        </div>
                        </div>
                        {counter_info.map((item, i)  => 
                            <div key={i} className={`col-xl-3 col-lg-6 col-md-6 ${item.cls}`}>
                                <div className="footer-counter-content d-md-flex align-items-center mb-30">
                                    <h2>{item.count}</h2>
                                    <div className="counter-text">
                                        <h3>{item.info}</h3>
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

export default FooterCounter;