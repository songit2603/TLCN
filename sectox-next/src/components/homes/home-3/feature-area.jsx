import Link from 'next/link';
import React from 'react';


const feature_data = [
    {
        id: 1, 
        icon: "flaticon-spy-camera",
        title: "Full-Time Device Protection"
    },
    {
        id: 2, 
        icon: "flaticon-secure",
        title: "Live Footage Collection"
    },
    {
        id: 3, 
        icon: "flaticon-global",
        title: "Drone CCTV Discussion"
    },
    {
        id: 4, 
        icon: "flaticon-database",
        title: "Hacker & Custom Solution"
    },
]

const FeatureArea = () => {
    return (
        <>
    <div className="feature-third-area feature-bg-img pt-110 pb-110" style={{backgroundImage: `url(/assets/img/feature/feature-bg.jpg)`}}>
      <div className="container">
         <div className="row justify-content-lg-end">
            <div className="col-xxl-6 col-xl-7 col-lg-8">
               <div className="tp-section-box tp-section-box-2 p-relative mb-45">
                  <span className="tp-section-subtitle d-inline-block right mb-10">features</span>
                  <h2 className="tp-section-title">
                     Opting For Security &
                     Making You Free
                  </h2>
               </div>
               <div className="row">
                  {feature_data.map((item, i)  => 
                    <div key={i} className="col-lg-6 col-md-6">
                        <div className="fea-list d-flex align-items-center mb-30">
                        <i className={item.icon}></i>
                        <div className="fea-ctn pl-20">
                            <h5 className="m-0">{item.title}</h5>
                        </div>
                        </div>
                    </div>
                  )} 
                  <div className="fea-button pt-20">
                     <Link className="tp-btn mr-25" href="/contact">Get In Touch <i className="fal fa-long-arrow-right"></i></Link>
                     <Link className="tp-black-btn-2" href="/contact">7 Day Free Trail</Link>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
        </>
    );
};

export default FeatureArea;