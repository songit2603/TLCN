import blog_data from '@/src/data/blog-data';
import Link from 'next/link';
import React from 'react';

const BlogArea = () => {
    return (
        <>
            <div className="tp-blog-area pt-110 pb-90">
                <div className="container">
                    <div className="row text-center">
                        <div className="col-xl-12">
                        <div className="tp-section-box tp-section-box-2 p-relative mb-45">
                            <span className="tp-section-subtitle d-inline-block pre mb-10">blog</span>
                            <h2 className="tp-section-title">
                                Company Blog & Insight
                            </h2>
                        </div>
                        </div>
                    </div>
                    <div className="row">

                        {blog_data.slice(0,3).map((item, i)  => 
                            <div key={i} className="col-xl-4 col-lg-6 col-md-6 mb-30">
                                <div className="tp-blog-main">
                                    <div className="tp-blog-item text-center p-relative">
                                        <div className="blog-img">
                                        <div className="fix"> <a href="#"><img src={item.img} alt="theme-pure" /></a></div>
                                        </div>
                                        <div className="tp-blog-content">
                                            <div className="tp-news-meta">
                                            <span className="user"><a href="#"><i className="fal fa-user"></i> {item.post_by}</a></span>
                                            <span className="user-2"><a href="#"><i className="fal fa-comments"></i> {item.total_comment} Comments</a></span>
                                            </div>
                                            <h5 className="tp-blog-title"><a href="#">{item.title}</a></h5>
                                            <p>{item.description}</p>
                                            <div className="tp-feed-link d-flex align-items-center">
                                            <Link className="blog-link" href="/blog-details">Read More <i className="far fa-long-arrow-alt-right"></i></Link>
                                            </div>
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