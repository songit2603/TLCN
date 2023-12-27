import SocialLinks from '@/src/common/social-links';
import React from 'react';

const TopFooter = () => {
    return (
        <>
            <div className="tp-footer-top-area">
                <div className="container">
                    <div className="theme-white p-relative white-bg">
                        <div className="row">
                        <div className="col-lg-4 col-md-4 col-12 text-center text-lg-start">
                            <div className="tp-footer-logo">
                                <a href="#"> <img src="/assets/img/logo/logo-3.png" alt="theme-pure" /></a>
                            </div>
                        </div>
                        <div className="col-lg-8 col-md-8 col-12 text-center text-md-end">
                            <div className="tp-footer-social">
                                <SocialLinks /> 
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default TopFooter;