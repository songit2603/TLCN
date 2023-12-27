import portfolio_data from '@/src/data/portfolio-data';
import Link from 'next/link';
import React, { useState } from 'react';
import { motion } from "framer-motion";
import ImagePopup from '@/src/modals/ImagePopup';

// data
const categories = [
"All",
...new Set(portfolio_data.map((item) => item.category)),
]; 

const uniquePortfolioItem = portfolio_data.filter(
   (arr, index, self) =>
     index === self.findIndex((t) => t.img === arr.img && t.State === arr.State)
 );

const PortfolioArea = () => {

   const [activeCategory, setActiveCategory] = useState("All");
    const [items, setItems] = useState(uniquePortfolioItem); 
  
    const filterItems = (cateItem) => {
      setActiveCategory(cateItem);
  
      if (cateItem === "All") {
        return setItems(uniquePortfolioItem);
      } else {
        const findItems = portfolio_data.filter((findItem) => {
          return findItem.category == cateItem;
        });
        setItems(findItems);
      }
    };

    // photoIndex
    const [photoIndex, setPhotoIndex] = useState(0);

    // image open state
    const [isOpen, setIsOpen] = useState(false);

    // handleImagePopup
    const handleImagePopup = (i) => {
        setPhotoIndex(i);
        setIsOpen(true);
    };
    
    //  images
    const img = portfolio_data.map((item) => item.img);

    return (
        <>
            <div className="tp-portfolio-area pt-110 pb-90">
               <div className="container">
                  <div className="row text-center">
                     <div className="col-xl-12">
                        <div className="tp-section-box tp-section-box-2 p-relative mb-45">
                           <span className="tp-section-subtitle d-inline-block pre mb-10">portfolio</span>
                           <h2 className="tp-section-title">Some Case Studies</h2>
                        </div>
                     </div>
                  </div>
                  <div className="row">
                     <div className="col-12 text-center">
                        <div className="tp-port-button masonary-menu">
                        {categories.map((cate, i) => (
                           <button
                              onClick={() => filterItems(cate)}
                              key={i}
                              className={`${cate === activeCategory ? "active" : ""}`}
                           >
                              <span>{cate}</span>
                           </button>
                        ))}  
                        </div>
                     </div>
                  </div>
                  <motion.div layout className="row grid mixitup-active pt-40">
                     {items.map((item, i ) =>   
                        <motion.div
                        key={i} 
                        layout
                        animate={{ opacity: 1 }}
                        initial={{ opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.8 }} 
                        className="col-xl-4 col-lg-6 col-md-6 grid-item cat2 cat4">
                           <div className="tp-port-item mb-30">
                              <div className="tp-case-img fix">
                                 <img src={item.img} alt={item.title} className="img-fluid w-100" />
                              </div>
                              <div className="tp-port-content">
                                 <span className="port-subtitle">{item.subtitle}</span>
                                 <h3 className="port-title"><Link href="/portfolio-details">{item.title}</Link></h3>
                              </div>
                              <div className="tp-port-icon">
                                 <button className="popup-image" onClick={() => handleImagePopup(i)}><i className="far fa-long-arrow-right"></i></button>
                              </div>
                           </div>
                        </motion.div>   
                     )} 
                  </motion.div>
               </div>
            </div>

            {/* image light box start */}
            {isOpen && (
                <ImagePopup
                images={img}
                setIsOpen={setIsOpen}
                photoIndex={photoIndex}
                setPhotoIndex={setPhotoIndex}
                />
            )}
            {/* image light box end */}
        </>
    );
};

export default PortfolioArea;