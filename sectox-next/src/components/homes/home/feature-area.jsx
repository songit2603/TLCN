import Link from "next/link";
import React, { useState } from "react";
import VideoPopup from '@/src/modals/video-popup';


const feature_data = [
  {
    id: 1,
    icon: "flaticon-bubble-chat-1",
    title: "Commercial CCTV System",
    description: <> Teachings of the great explorer of the truth, the <br />
        master-builder of human happiness. </> ,
  },
  {
    id: 2,
    icon: "flaticon-cctv-9",
    title: "Wifi & Router Support",
    description: <> Teachings of the great explorer of the truth, the <br />
        master-builder of human happiness. </> ,
  },
  {
    id: 3,
    icon: "flaticon-group",
    title: "24/7 Online & Offline Support",
    description: <> Teachings of the great explorer of the truth, the <br />
        master-builder of human happiness. </> ,
  },
];

const feature_content = {
  bg_img: "/assets/img/bg/fea-bg.jpg",
  faq_img: "/assets/img/bg/faq-img.jpg",
  title: "Process",
  sub_title: "How We Work Here",
};
const { bg_img, title, sub_title, faq_img } = feature_content;

const FeatureArea = ({ style_faq }) => {
    const [isVideoOpen,setIsVideoOpen] = useState(false);

  return (
    <>
      <div className="tp-feature-area p-relative">
        <div
          className="fea-bg"
          style={{ backgroundImage: `url(${style_faq ? faq_img : bg_img})` }}
        >
          {style_faq && (
            <button
              onClick={()=> setIsVideoOpen(true)}             
              className="play-button popup-video" 
            >
              play
            </button>
          )}
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xl-6 col-lg-6">
              <div className="tp-fea-box pt-120 pb-90 pr-70">
                <div className="tp-section-box p-relative mb-40">
                  <h3 className="tp-big-text">{title}</h3>
                  <span className="tp-section-subtitle d-inline-block mb-10">
                    {title}
                  </span>
                  <h2 className="tp-section-title mb-30">{sub_title}</h2>
                </div>
                <div className="tp-fea-list-wrapper">
                  <ul>
                    {feature_data.map((item, i) => (
                      <li key={i}>
                        <div className="tp-fea-list">
                          <div className="tp-fea-main">
                            <div className="tp-fea-icon">
                              <i className={item.icon}></i>
                            </div>
                            <div className="tp-fe-content">
                              <h3 className="tp-fe-title">{item.title}</h3>
                              <p>{item.description}</p>
                              <div className="tp-fea-link mt-25 d-md-none">
                                <Link href="/contact">
                                  <i className="fal fa-long-arrow-right"></i>
                                </Link>
                              </div>
                            </div>
                          </div>
                          <div className="tp-fea-link d-none d-md-block">
                            <Link href="/contact">
                              <i className="fal fa-long-arrow-right"></i>
                            </Link>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* video modal start */}
      <VideoPopup
        isVideoOpen={isVideoOpen}
        setIsVideoOpen={setIsVideoOpen}
        videoId={"ZShulVioUqg"}
        />
        {/* video modal end */}
    </>
  );
};

export default FeatureArea;
