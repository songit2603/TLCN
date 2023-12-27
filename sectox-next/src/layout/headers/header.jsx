import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSelector,useDispatch } from "react-redux";
import { createSelector } from 'reselect';
import ProfileDropdown from "./ProfileDropdown";
import MyCartDropdown from "./MyCartDropdown";
import NavMenu from './nav-menu';
import Sidebar from './sidebar';
import { getCustomerById as onGetCustomerById } from "../../slices/thunks";

// import Sidebar from './sidebar';

const HeaderOne = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isHide, setIsHide] = useState(false)
    const [isToggleSearch, setToggleSearch] = useState(false);

    const offerHadle = () => {
      setIsHide(true)
    }
    const isSessionActive = useSelector((state) => state.Session.isSessionActive);
    const token = useSelector((state) => state.Session.decodedToken);
    //** ======================== Get customer by id ========================
  const dispatch = useDispatch();

  const selectLayoutState = (state) => state.Ecommerce;
  const ecomCustomerProperties = createSelector(selectLayoutState, (ecom) => ({
    customers: ecom.customers,
    isCustomerSuccess: ecom.isCustomerSuccess,
    error: ecom.error,
  }));
  // Inside your component
  // eslint-disable-next-line
  const { customers: customer, isCustomerSuccess, error } = useSelector(
    ecomCustomerProperties
  );
  useEffect(() => {
    if (customer && !customer.length && token!==null) {
      dispatch(onGetCustomerById(token.userId));
    }
    // eslint-disable-next-line
  }, [dispatch,token]);


    return (
      <>
        <header>
          <div
            className={`toast show align-items-center border-0 p-relative ${
              isHide ? "d-none" : ""
            }`}
            role="alert"
            aria-live="assertive"
            aria-atomic="true"
          >
            <div className="d-flexs">
              {/*<div className="toast-body p-0">
                <div className="header-notification-area black-bg pt-15 pb-15 ">
                  <div className="container">
                    <div className="row">
                      <div className="col-12">
                        <div className="notification-text text-center">
                          <p className="m-0">
                            <b>Ưu đãi giới hạn:</b> Hiện tại, shop đang có
                            chương trình free ship cho các đơn hàng
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
            </div>*/}
              <button
                onClick={offerHadle}
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                data-bs-dismiss="toast"
                aria-label="Close"
              ></button>
            </div>
          </div>

          <div className="header-area header-1-space pl-60 pr-60">
            <div className="container-fluid">
              <div className="row align-items-center">
                <div className="col-xl-2 col-lg-6 col-md-5 col-7">
                  <div className="logo">
                    <Link href="/">
                      <img src="/assets/img/logo/logo.png" alt="logo" />
                    </Link>
                  </div>
                </div>
                <div className="col-xl-7 d-none d-xl-block text-end">
                  <div className="tp-main-menu text-center">
                    <nav id="mobile-menu">
                      <NavMenu />
                    </nav>
                  </div>
                </div>
                <div className="col-xl-3 col-lg-6 col-md-7 col-5">
                  <div className="search-main p-relative">
                    <div className="tp-header-right">
                      {/*<button
                        onClick={() => setToggleSearch(!isToggleSearch)}
                        className={`tp-header-icon tp-h-search p-relative ${
                          isToggleSearch ? "opened" : ""
                        }`}
                        style={{ marginLeft: "-20px" }}
                      >
                        {/*<i className="fal fa-search"></i>
                        <i className="fal fa-times"></i>
                      </button>*/}

                      {isSessionActive ? (
                        <>
                          <MyCartDropdown customer={customer} />
                          <ProfileDropdown />
                        </>
                      ) : (
                        <div style={{marginTop : "10px"}}>
                          <Link href="/login" className="tp-btn-2 ml-20 d-none d-md-inline-block" >Đăng nhập</Link>
                        </div>
                      )}

                      {/*<Link href="/contact" className="tp-btn-2 ml-20 d-none d-md-inline-block">Get In Touch</Link>*/}
                      {/*<button
                        onClick={() => setIsOpen(true)}
                        className="tp-menu-toggle tp-header-icon ml-20 d-xl-none"
                      >
                        <i className="far fa-bars"></i>
                      </button>*/}
                    </div>
                    {/*{isToggleSearch && (
                      <div
                        className={`search-form ${
                          isToggleSearch ? "header_search-open" : ""
                        }`}
                      >
                        <form onSubmit={(e) => e.preventDefault()}>
                          <input type="text" placeholder="Search here..." />
                          <button type="submit">
                            <i className="fal fa-search"></i>
                          </button>
                        </form>
                      </div>
                      )}*/}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      </>
    );
};

export default HeaderOne;