import blog_data from '@/src/data/blog-data';
import Link from 'next/link';
import React from 'react';


const BlogArea = () => {
    return (
        <>
            <div className="tp-feed-area pb-90">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-xl-12">
                        <div className="tp-section-box tp-section-box-2 p-relative mb-45">
                            <span className="tp-section-subtitle d-inline-block pre mb-10">news</span>
                            <h2 className="tp-section-title">
                                Bảng tin
                            </h2>
                        </div>
                        </div>
                    </div>
                    <div className="row">
                        {blog_data.slice(3, 6).map((item, i)  => 
                            <div key={i} className="col-xl-4 col-lg-6 col-md-6">
                                <div className="tp-feed-item mb-30">
                                    <div className="tp-feed-img p-relative">
                                        <div className="fix"><a href="#"><img src={item.img} alt="theme-pure" /></a></div>
                                        <div className="tp-meta-date">
                                            <h3 className="meta-date-title"><a href="#">{item.date}</a></h3>
                                            <p>{item.month}</p>
                                        </div>
                                    </div>
                                    <div className="tp-feed-content">
                                        <div className="tp-latest-blog-meta">
                                            <span>được viết bởi</span>
                                            <a href="#">{item.post_by}</a>
                                            <a href="#">{item.author_title}</a> 
                                        </div>
                                        <h5 className="tp-latest-title"><Link href="/blog-details">{item.title}</Link></h5>
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

export default BlogArea;