import Link from 'next/link';
import React from 'react';


const team_details_conten = {
    img: "/assets/img/team/team-details-1.jpg",
    subtitle: "Founder",
    name: "Hexol D. Drownix",
    info : <>Bandwidth has historically been very unequally distributed worldwide, with
    increasing concentration in the digital age. Historically only 10 countries
    have hosted 70-75% of the global telecommunication capacity.</>,

    phone_title: "Phone Number",
    phone_number: "+(908)786789786",

    email_title: "Email Address",
    email: "info@webexample",

    office_location: "Office Location",
    address: "14/A, Kilix Home Tower, NYC",

    skill_thumb: "/assets/img/team/team-details-2.jpg",
    archivements_img : "/assets/img/team/team-details-3.jpg",
    archivements : "Great Archivements",
    archivements_info : <>Sed do eiusmod tempor incididunt ut labore et dolore magna aliq
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
    ut aliquip ex ea commodo consequat. Duis aute irure dolor in rep
    derit in voluptate velit esse cillum dolor.</>,
    certifi_img: ["1", "2", "3"]



}
const {img, subtitle, name, info, phone_title, phone_number, email_title, email, office_location, address, skill_thumb,archivements_img, archivements, archivements_info, certifi_img }  = team_details_conten


const TeamDetailsArea = () => {
    return (
        <>
            <div className="team-details-area pt-120 pb-100">
                <div className="container">

                    <div className="row">
                        <div className="col-xl-6 col-lg-6">
                        <div className="team-member">
                            <img src={img} alt="theme-pure" />
                        </div>
                        </div>
                        <div className="col-xl-6 col-lg-6">
                        <div className="team-member-info pt-60">
                            <div className="tp-section-box tp-section-box-2 mb-40 p-relative">
                                <span className="tp-section-subtitle right d-inline-block">{subtitle}</span>
                                <h2 className="tp-section-title mb-20">{name}</h2>
                                <p>{info}</p>
                            </div>
                            <div className="tp-team-details-icon d-flex">
                                <div className="icon-area pr-20"><a href="#"><i className="fas fa-phone"></i></a></div>
                                <div className="team-contact-info">
                                    <label>{phone_title}</label>
                                    <a href={`tel:${phone_number}`}>{phone_number}</a>
                                </div>
                            </div>
                            <div className="tp-team-details-icon d-flex">
                                <div className="icon-area pr-20">
                                    <a href="#"><i className="fas fa-envelope"></i></a>
                                </div>
                                <div className="team-contact-info">
                                    <label>{email_title}</label>
                                    <a href={`mailto:${email}`}>{email}</a>
                                </div>
                            </div>
                            <div className="tp-team-details-icon d-flex">
                                <div className="icon-area pr-20"><a href="#"><i className="fas fa-map-marker-alt"></i></a></div>
                                <div className="team-contact-info">
                                    <label>{office_location}</label>
                                    <a href={`tel:${address}`}>{address}</a>
                                </div>
                            </div>
                            <Link className="tp-btn mt-15" href="/contact">
                                Get In Touch 
                                <i className="fal fa-long-arrow-right"></i>
                            </Link>
                        </div>
                        </div>
                        <hr className="mt-100 mb-100" />
                    </div>

                    <div className="row">
                        <div className="col-xl-6 col-lg-12">
                        <div className="team-details-progressbar pr-100">
                            <div className="tp-section-box tp-section-box-2 mb-40 p-relative">
                                <span className="tp-section-subtitle right d-inline-block">Personal Skills</span>
                            </div>
                            <div className="team__skill-progress-item mb-30 p-relative">
                                <h4 className="mb-20">Product Design</h4>
                                <span className="progress-count">70%</span>
                                <div className="progress">
                                    <div className="progress-bar wow slideInLeft" data-wow-duration="1s" data-wow-delay=".3s" role="progressbar" data-width="72%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" 
                                    style={{width: "70%", visibility: "visible", animationDuration:  "1s", animationDelay: "0.3s", animationName:"slideInLeft"}} 
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className="team__skill-progress-item mb-30 p-relative">
                                <h4 className="mb-20">Design & Development Support</h4>
                                <span className="progress-count">52%</span>
                                <div className="progress">
                                    <div className="progress-bar wow slideInLeft" data-wow-duration="1s" data-wow-delay=".3s" role="progressbar" data-width="52%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" 
                                    style={{width: "52%", visibility: "visible", animationDuration:  "1s", animationDelay: "0.3s", animationName:"slideInLeft"}} 
                                    >
                                    </div>
                                </div>
                            </div>
                            <div className="team__skill-progress-item p-relative">
                                <h4 className="mb-20">User Experience & Research</h4>
                                <span className="progress-count">82%</span>
                                <div className="progress">
                                    <div className="progress-bar wow slideInLeft" data-wow-duration="1s" data-wow-delay=".3s" role="progressbar" data-width="82%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" 
                                    style={{width: "72%", visibility: "visible", animationDuration:  "1s", animationDelay: "0.3s", animationName:"slideInLeft"}} 
                                    >
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div className="col-xl-6">
                        <div className="team-member">
                            <img src={skill_thumb} alt="theme-pure" />
                        </div>
                        </div>
                        <hr className="mt-100 mb-100" />
                    </div>

                    <div className="row">
                        <div className="col-xl-6">
                        <div className="team-member">
                            <img src={archivements_img} alt="theme-pure" />
                        </div>
                        </div>
                        <div className="col-xl-6">
                        <div className="team-info-main pt-40 pl-45">
                            <div className="team-details-info">
                                <h5>{archivements}</h5>
                                <p>{archivements_info}</p>
                            </div>
                            <div className="team-certifi-img">
                                {certifi_img.map((item, i) => 
                                <img key={i} className="certifi-img" src={`/assets/img/team/team-details-certi-${item}.jpg`} alt="theme-pure" />                                
                                )} 
                            </div>
                        </div>
                        </div>
                    </div>

                </div>
            </div>            
        </>
    );
};

export default TeamDetailsArea;