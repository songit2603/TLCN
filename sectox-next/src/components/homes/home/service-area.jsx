import service_data from "@/src/data/service-data";
import Link from "next/link";
import React from "react";

const ServiceArea = () => {
  return (
    <>
      <div className="service-area pt-110 pb-25">
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <div className="tp-section-box p-relative mb-60">
                <h3 className="tp-big-text">Services</h3>
                <span className="tp-section-subtitle d-inline-block mb-10">
                  Services
                </span>
                <h2 className="tp-section-title">What We Do</h2>
              </div>
            </div>
          </div>
          <div className="row">
            {service_data.slice(0,3).map((item, i) => (
              <div key={i} className="col-lg-4 col-md-6">
                <div className="tpservices mb-30">
                  <div className="tpservices__thumb">
                    <div className="fix">
                      <a href="#">
                        <img src={item.img} alt="theme-pure" />
                      </a>
                    </div>
                  </div>
                  <div className="tpservices__content">
                    <i className={item.icon}></i>
                    <h3 className="tpservices__title">{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                  <div className="tpservices__btn">
                    <Link className="tp-btn w-100" href="/services-details">
                      Service Details
                      <i className="fal fa-long-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceArea;
