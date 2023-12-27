import Link from 'next/link';
import React, { useState } from 'react';
import NavMenu from './nav-menu';
import Sidebar from './sidebar';

const HeaderTwo = () => {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <header className="p-relative">
                <div className="header-notification-area black-bg  d-none d-lg-block">
                    <div className="container">
                        <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-7">
                            <div className="notification-text">
                                <p className="m-0"><b>Limited Time Offer:</b> Shop online and get free no-contact delivery</p>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-5 d-flex justify-content-end">
                            <div className="tp-top-menu">
                                <ul>
                                    <li><a href="#">FAQ</a></li>
                                    <li><a href="#">Careers</a></li>
                                </ul>
                            </div>
                            <div className="tp-top-menu header-lan-menu ml-30">
                                <ul>
                                    <li><a href="#">English <i className="fal fa-angle-down"></i></a>
                                    <ul>
                                        <li><a href="#">English</a></li>
                                        <li><a href="#">Arabic</a></li>
                                        <li><a href="#">Spanish</a></li>
                                    </ul>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="tp-header-area header-area-space p-relative pt-20 pb-50 d-none d-xl-block"
                    style={{backgroundImage: `url(/assets/img/bg/header-bg.jpg)`}} >
                    <div className="container">
                        <div className="row align-items-center">
                        <div className="col-xl-3 col-lg-6 col-md-6 col-6">
                            <div className="logo">
                                <Link href="/"><img src="/assets/img/logo/logo2.png" alt="logo" /></Link>
                            </div>
                        </div>
                        <div className="col-xl-9">
                            <div className="tp-contact-wapper d-flex justify-content-end">
                                <div className="tp-header-contact d-none d-xl-block pr-40">
                                    <div className="tp-header-contact-icon d-flex align-items-center">
                                    <div><a href="#"><i className="fas fa-phone"></i></a></div>
                                    <div className="tp-header-icon-info">
                                        <label>Make a call</label>
                                        <a href="tel:+98565689656">
                                            +985 656 896 56
                                        </a>
                                    </div>
                                    </div>
                                </div>
                                <div className="tp-header-contact d-none d-xl-block">
                                    <div className="tp-header-contact-icon d-flex align-items-center">
                                    <div><a href="#"><i className="fal fa-envelope-open"></i></a></div>
                                    <div className="tp-header-icon-info">
                                        <label>Email address</label>
                                        <a href="mailto:info@webmail.com">
                                            info@webmail.com
                                        </a>
                                    </div>
                                    </div>
                                </div>
                                <div className="tp-header-right ml-30">
                                    <Link href="/contact" className="tp-btn-simelar ml-20 d-none d-md-block">Make Appointment</Link>
                                    <a href="#" className="tp-menu-toggle tp-header-icon2 ml-20 d-xl-none"><i className="far fa-bars"></i></a>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <div className="tp-header-menu-area d-none d-xl-block">
                    <div className="container">
                        <div className="header-inner white-bg">
                        <div className="row g-0 align-items-center">
                            <div className="col-xl-9">
                                <div className="tp-main-menu-2">
                                    <nav id="mobile-menu">
                                        <NavMenu /> 
                                    </nav>
                                </div>
                            </div>
                            <div className="col-xl-3  d-xl-block">
                                <div className="tp-search-icon">
                                    <div className="tp-search-wrapper d-flex align-items-center justify-content-end">
                                     <form onSubmit={(e) => e.preventDefault()}>
                                        <i className="fal fa-search"></i>
                                        <input type="text" placeholder="search here..." />
                                     </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>

                <div className="tp-header-2-mobile-area d-block d-xl-none" style={{backgroundImage: `url(/assets/img/bg/header-bg.jpg)`}}>
                    <div className="container">
                        <div className="row align-items-center">
                        <div className="col-6">
                            <div className="logo">
                                <Link href="/"><img src="/assets/img/logo/logo2.png" alt="logo" /></Link>
                            </div>
                        </div>
                        <div className="col-6">
                            <div className="tp-header-right ml-30">
                                <a href="#" className="tp-btn-simelar ml-20 d-none d-md-block">Make Appointment</a>
                                <a href="#" onClick={() => setIsOpen(true)} className="tp-menu-toggle tp-header-icon2 ml-20 d-xl-none"><i className="far fa-bars"></i></a>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </header>  
            
            <Sidebar isOpen={isOpen}  setIsOpen={setIsOpen} />          
        </>
    );
};

export default HeaderTwo;