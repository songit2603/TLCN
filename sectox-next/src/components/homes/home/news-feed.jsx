import news_data from '@/src/data/news-data';
import Link from 'next/link';
import React from 'react';

const NewsFeed = () => {
    return (
        <>
            <div className="tp-feed-area pt-120 pb-90">
      <div className="container">
         <div className="row text-center">
            <div className="col-12">
               <div className="tp-section-box p-relative mb-60">
                  <h3 className="tp-big-text">Bài viết</h3>
                  <span className="tp-section-subtitle d-inline-block mb-10">Bản tin</span>
                  <h2 className="tp-section-title">
                     Tin tức mới
                  </h2>
               </div>
            </div>
         </div>
         <div className="row">
            {news_data.map((item, i) => 
                <div key={i} className="col-xl-4 col-lg-6  col-md-6">
                    <div className="tp-feed-item mb-30">
                    <div className="tp-feed-img p-relative">
                        <div className="fix"><a href="#"><img src={item.thumb} alt="theme-pure" /></a></div>
                        <div className="tp-meta-date">
                            <h3 className="meta-date-title"><a href="#">{item.date}</a></h3>
                            <p>{item.month}</p>
                        </div>
                    </div>
                    <div className="tp-feed-content">
                        <div className="tp-latest-blog-meta">
                            <span>viết bởi </span>
                            <a href="#">{item.post_by}</a>
                            <a href="#">{item.post_title}</a> 
                        </div>
                        <h5 className="tp-latest-title">
                            <Link href="/blog-details">{item.title}</Link>
                        </h5>
                        <div className="tp-feed-link d-flex align-items-center">
                            <a href="#">Xem thêm <i className="far fa-long-arrow-alt-right"></i></a>
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

export default NewsFeed;