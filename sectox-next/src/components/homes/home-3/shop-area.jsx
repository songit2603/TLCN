import product_data from '@/src/data/product-data';
import Link from 'next/link';
import React from 'react';

const ShopArea = () => {
    return (
        <>
            <div className="tp-shop-area grey-bg pt-115 pb-90">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-xl-12">
                        <div className="tp-section-box tp-section-box-2 p-relative mb-50">
                            <span className="tp-section-subtitle d-inline-block pre mb-10">shop</span>
                            <h2 className="tp-section-title">
                                Sản phẩm
                            </h2>
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        {product_data.slice(0,4).map((item, i)  => 
                            <div key={i} className="col-xl-3 col-lg-6 col-md-6">
                                <div className="tp-porduct-item p-relative text-center mb-30">
                                    <img src={item.img} alt="theme-pure" />
                                    <div className="tp-porduct-content">
                                        <div className="tp-pro-rating mb-5">
                                            <span><i className="fas fa-star"></i></span>
                                            <span><i className="fas fa-star"></i></span>
                                            <span><i className="fas fa-star"></i></span>
                                            <span><i className="fas fa-star"></i></span>
                                            <span><i className="fas fa-star"></i></span>
                                        </div>
                                        <h5 className="tp-pro-title"><Link href="/shop-details">{item.title}</Link></h5>
                                        <div className="tp-pro-price">
                                            <span>${item.price}</span>
                                        </div>
                                        <div className="shop-cart">
                                            <Link className="tp-btn" href="/cart">
                                                <i className="fal fa-shopping-cart"></i>
                                                {" "}Add To Cart
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )} 
                    </div>
                </div>
            </div>
        </>
    );
};

export default ShopArea;