import React from 'react';

// contact info data
const contact_info_data = [
    {
        id: 1, 
        icon: "fas fa-phone-alt",
        title: "Liên hệ",
        info_1: "0905409625",
        info_2: "+090 8909 89 87-0",
        link_1: "tel:(098)89789090,+09089098987-0",
        link_2: "tel:1234162442",
    },
    {
        id: 2, 
        icon: "fas fa-envelope",
        title: "Email ",
        info_1: "info@webmail.com",
        info_2: "jobs.webexample.com",
        link_1: "mailto:info@webmail.comjobs.webexample.com",
        link_2: "mailto:jobs.webexample.com",
    },
    {
        id: 3, 
        icon: "fas fa-map-marker-alt",
        title: "Trụ sở",
        info_1: "01 Võ Văn Ngân, Linh Chiểu, Thủ Đức, Tp. Hồ Chí Minh",
        link_1: "#",
        link_2: "#",
    },
    {
        id: 4, 
        icon: "fal fa-share-alt",
        title: "Kết nối mạng xã hội",
        info_1: "skype.com/humble.cclinkdin.com",
        info_2: "",
        link_1: "",
        link_2: "",
    },

]

const ContactInfo = () => {
    return (
        <>
           <div className="tp-contact-info pb-90">
                <div className="container">
                    <div className="row contact-last-child">
                        {contact_info_data.map((item, i) => 
                            <div key={i} className="col-xl-3 col-lg-3 col-md-6">
                                <div className="contact-info-item text-center mb-30">
                                    <i className={item.icon}></i>
                                    <h5>{item.title}</h5>
                                    <a href={item.link_1}>{item.info_1}<br /></a>
                                    <a href={item.link_2}>{item.info_2}</a>
                                </div>
                             </div>
                        )} 
                    </div>
                </div>
            </div> 
        </>
    );
};

export default ContactInfo;