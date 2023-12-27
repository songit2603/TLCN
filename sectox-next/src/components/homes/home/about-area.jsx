import Link from 'next/link';
import product_data from '@/src/data/product-data';
//redux
import React, { useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from 'reselect';


//Import actions
import {
  getProducts as onGetProducts,
  // getCategories as onGetCategories,
  // getBrands as onGetBrands,
} from "../../../slices/thunks";

const ShopArea = () => {
  //GetProductFromAPi
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const selectDashboardData = createSelector(
    (state) => state.Ecommerce.products,
    (products) => products
  );
  const products = useSelector(selectDashboardData);
  useEffect(() => {
    if (products && !products.length) {
      dispatch(onGetProducts());
    }
    console.log(products);
  }, [dispatch, products]);
  
  useEffect(() => {
    // Lọc ra các sản phẩm có isPublish === true và gán cho productList
    const filteredProducts = products.filter(p => p.isPublish === true);
    setProductList(filteredProducts);
  }, [products]);
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
                       {productList.slice(0,8).map((item, i)  => 
                        
                           <div key={i} className="col-xl-3 col-lg-6 col-md-6">
                              <Link href={`/shop-details/${item.id}`}>
                               <div className="tp-porduct-item p-relative text-center mb-30">
                               {item.images && item.images[0] && (
                                 
                                   <img src={item.images[0].url} alt="theme-pure" /> )}
                                  
                                   <div className="tp-porduct-content">
                                       {/*<div className="tp-pro-rating mb-5">
                                           <span><i className="fas fa-star"></i></span>
                                           <span><i className="fas fa-star"></i></span>
                                           <span><i className="fas fa-star"></i></span>
                                           <span><i className="fas fa-star"></i></span>
                                           <span><i className="fas fa-star"></i></span>
                                       </div>*/}
                                       <h5 className="tp-pro-title">
                                        <Link href={`/shop-details/${item.id}`}>
                                        {item.name}
                                        </Link>
                                        </h5>
                                       <div className="tp-pro-price">
                                           <span>{new Intl.NumberFormat().format(item.newPrice)} </span>
                                       </div>
                                       {/*<div className="shop-cart">
                                        <i className="fal fa-shopping-cart"></i>
                                           <Link className="tp-btn" href={`/cart/${item.id}`}>
                                                Thêm vào giỏ hàng
                                           </Link>
                               </div>*/}
                                   </div>
                               </div>
                               </Link>
                           </div>
                           
                        
                       )}  
                     
                   </div>
                   
               </div>
           </div>
       </>
   );
};

export default ShopArea;
{/*const AboutArea = () => {
    return (
        <>
        <div className="tp-about-area pt-120 pb-80">
      <div className="container">
         <div className="row">
            <div className="col-xl-6 col-lg-5">
               <div className="tp-about-wapper p-relative">
                  <div className="tp-about-thumb p-relative pt-60 mb-40">
                     <img className="ab-sm" src="/assets/img/about/ab-small.jpg" alt="theme-pure" />
                     <img className="ab-lg ml-80" src="/assets/img/about/ab-large.jpg" alt="theme-pure" />
                     <div className="tp-about-circle pt-40 pb-40">
                        <span>Offer</span>
                        <h3>50<i className="percent">%</i></h3>
                        <p>In March</p>
                        <div className="circle-link">
                           <Link href="/about"><i className="far fa-long-arrow-alt-right"></i></Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
            <div className="col-xl-6 col-lg-7">
               <div className="tp-about-wrapper pt-50 pl-35 mb-40">
                  <div className="tp-section-box p-relative">
                     <h3 className="tp-big-text">About</h3>
                     <span className="tp-section-subtitle d-inline-block mb-10">About Us</span>
                     <h2 className="tp-section-title mb-30">
                        Magtnificient Quality Gives You an Edge
                     </h2>
                     <p>Bandwidth has historically been very unequally distributed worldwide, with
                        increasing concentration in the digital age. Historically only 10 countries <br />
                        have hosted 70-75% of the global telecommunication capacity.</p>
                  </div>
                  <hr className="mt-25 mb-30" />
                  <div className="tp-ab-meta">
                     <div className="about-meta-img d-flex">
                        <div className="ab-meta-img d-none d-md-block">
                           <img src="/assets/img/about/ab-meta.jpg" alt="theme-pure" />
                        </div>
                        <div className="tp-ab-meta-text pl-30">
                           <h4>In 2014 only 3 countries host 50% of the
                              globally installed bandwidth potential.</h4>
                           <span><b>Alonso D. Dowson</b> <i>-Head Of Idea</i></span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>            
        </>
    );
};

export default AboutArea;*/}