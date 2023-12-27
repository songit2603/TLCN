import React, { useState } from 'react';
import NavMenu from './nav-menu';
import Link from 'next/link';
import Sidebar from './sidebar';

const HeaderThree = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isToggleSearch, setToggleSearch] = useState(false);

    return (
        <>
            <header>
                <div className="header-notification-area notification-color grey-bg d-none d-lg-block pl-25 pr-25">
                    <div className="container-fluid">
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
                <div className="header-area-flat pl-25 pr-25">
                    <div className="container-fluid">
                        <div className="row align-items-center">
                        <div className="col-xl-2 col-lg-6 col-md-5 col-7">
                            <div className="logo">
                                <Link href="/"><img src="/assets/img/logo/logo-3.png" alt="logo" /></Link>
                            </div>
                        </div>
                        <div className="col-xl-7 d-none d-xl-block">
                            <div className="tp-main-menu text-center">
                                <nav id="mobile-menu">
                                    <NavMenu /> 
                                </nav>
                            </div>
                        </div> 
                        <div className="col-xl-3 col-lg-6 col-md-7 col-5">
                            <div className="search-main p-relative">
                                <div className="tp-header-right">
                                    <a onClick={() => setToggleSearch(!isToggleSearch)} href='#' className={`tp-header-icon tp-h-search p-relative ${isToggleSearch ? "opened" : ""}`}>                                  
                                        <i className="fal fa-search"></i>
                                        <i  className="fal fa-times"></i>                                  
                                    </a>
                                    <Link className="tp-header-icon d-none d-xxl-inline-block" href="/cart">
                                        <i className="fal fa-shopping-cart"></i>
                                    </Link>
                                    <Link href="/contact" className="tp-btn-2 ml-20 d-none d-md-inline-block">Get In Touch</Link>
                                    <button onClick={() => setIsOpen(true)} className="tp-menu-toggle tp-header-icon ml-20 d-xl-none">
                                        <i className="far fa-bars"></i>
                                    </button>
                                </div>
                                {isToggleSearch && 
                                    <div className={`search-form ${isToggleSearch ? "header_search-open" : ""}`}>
                                        <form onSubmit={e => e.preventDefault()}>
                                        <input type="text" placeholder="Search here..." />
                                        <button type="submit"><i className="fal fa-search"></i></button>
                                        </form>
                                    </div> 
                                }
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

export default HeaderThree;