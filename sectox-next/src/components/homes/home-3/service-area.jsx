import Link from 'next/link';
import React from 'react';



const service_content = {
   service_data : [
      {
         id: 1,
         tab_id:"nav-camera",
         active: "show active",
         aria_labelledby: "nav-camera-tab",
         img: "/assets/img/services/sv-7.jpg",
         price: "59",
         title: "Individual CCTV Solution",
         description: <>Stands for Closed Circuit Television. It is a video system that consists of
         strategically placed video cameras around an area that records footage, and is then transmitted to
         a display monitor(s) for real-time viewing as well as footage playback.</>,
         fetures: [
            "Departure of the expert",
            "Configure software",
            "24/7 Support",
            "Remote Administration",
            "Special applicationt",
         ]
      },
      {
         id: 2,
         tab_id:"nav-cctv",
         active: "",
         aria_labelledby: "nav-cctv-tab",
         img: "/assets/img/services/sv-8.jpg",
         price: "35",
         title: "Commercial CCTV System",
         description: <>Stands for Closed Circuit Television. It is a video system that consists of
         strategically placed video cameras around an area that records footage, and is then transmitted to
         a display monitor(s) for real-time viewing as well as footage playback.</>,
         fetures: [
            "Departure of the expert",
            "Configure software",
            "24/7 Support",
            "Remote Administration",
            "Special applicationt",
         ]
      },
      {
         id: 3,
         tab_id:"nav-security",
         active: "",
         aria_labelledby: "nav-security-tab",
         img: "/assets/img/services/sv-9.jpg",
         price: "45",
         title: "Office & Industrial Security",
         description: <>Stands for Closed Circuit Television. It is a video system that consists of
         strategically placed video cameras around an area that records footage, and is then transmitted to
         a display monitor(s) for real-time viewing as well as footage playback.</>,
         fetures: [
            "Departure of the expert",
            "Configure software",
            "24/7 Support",
            "Remote Administration",
            "Special applicationt",
         ]
      },
      {
         id: 4,
         tab_id:"nav-cyber",
         active: "",
         aria_labelledby: "nav-cyber-tab",
         img: "/assets/img/services/sv-10.jpg",
         price: "42",
         title: "School & Hospital Security",
         description: <>Stands for Closed Circuit Television. It is a video system that consists of
         strategically placed video cameras around an area that records footage, and is then transmitted to
         a display monitor(s) for real-time viewing as well as footage playback.</>,
         fetures: [
            "Departure of the expert",
            "Configure software",
            "24/7 Support",
            "Remote Administration",
            "Special applicationt",
         ]
      },
   ]
} 
const {service_data}  = service_content


const ServiceArea = () => {
    return (
        <>
   <div className="service-area">
      <div className="service-tab-bg pt-115" style={{backgroundImage: `url(/assets/img/services/tab-bg.jpg)`}}>
         <div className="container">
               <div className="tp-section-box tp-section-box-2 p-relative mb-45 text-center">
                  <span className="tp-section-subtitle d-inline-block pre mb-10">services</span>
                  <h2 className="tp-section-title">
                     What We Provide
                  </h2>
               </div>
               <div className="service-tab-info">
                  <nav>
                     <div className="nav tp-service-tab justify-content-center mb-35" id="nav-tab" role="tablist">
                        <button className="nav-links active" id="nav-camera-tab" data-bs-toggle="tab" data-bs-target="#nav-camera"
                           type="button" role="tab" aria-controls="nav-camera" aria-selected="false">IP Camera</button>

                        <button className="nav-links" id="nav-cctv-tab" data-bs-toggle="tab" data-bs-target="#nav-cctv"
                           type="button" role="tab" aria-controls="nav-cctv" aria-selected="false">IP CCTV</button>

                        <button className="nav-links" id="nav-security-tab" data-bs-toggle="tab" data-bs-target="#nav-security"
                           type="button" role="tab" aria-controls="nav-security" aria-selected="false">Duet Security</button>

                        <button className="nav-links" id="nav-cyber-tab" data-bs-toggle="tab" data-bs-target="#nav-cyber"
                           type="button" role="tab" aria-controls="nav-cyber" aria-selected="false">Cyber Security</button>
                     </div>
                  </nav>
                  <div className="tab-content" id="nav-tabContent">
                     {service_data.map((item, i)  => 
                        <div key={i} className={`tab-pane fade ${item.active}`} id={item.tab_id} role="tabpanel" aria-labelledby={item.aria_labelledby}
                              tabIndex="0">
                              <div className="slider-tab-main white-bg">
                                 <div className="row">
                                    <div className="col-lg-5 col-12 sv-tab-img">
                                       <div className="tp-service-tab-img">
                                          <img src={item.img} alt="theme-pure" />
                                       </div>
                                    </div>
                                    <div className="col-lg-7 col-12 sv-tab-content">
                                       <div className="tp-service-tab-content pt-30 pl-25">
                                          <div className="tab-circle">
                                             <h4><span>$</span>{item.price}</h4>
                                             <h3 className="sv-tab-titile">{item.title}</h3>
                                             <p>{item.description}</p>
                                          </div>
                                          <div className="tp-sv-feature-list mb-40">
                                             <ul>
                                                {item.fetures.map((feture, index) => 
                                                   <li key={index}><i className="fal fa-check"></i>{feture}</li>                                                
                                                )} 
                                             </ul>
                                          </div>
                                          <div className="services-tab-btn">
                                             <Link href="/services-details" className="tp-btn">Read More</Link>
                                          </div>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>                     
                     )} 

                  </div>
               </div>
         </div>
      </div>
   </div>
        </>
    );
};

export default ServiceArea;