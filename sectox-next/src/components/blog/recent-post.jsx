import Link from "next/link";
import React from "react";

// recent post
const recent_post = [
    {
        id: 1, 
        img: "/assets/img/news/blog-details-sm.jpg",
        title: "Having education in an area helps basic attack.",
        date: "July 21, 2021",
    },
    {
        id: 2, 
        img: "/assets/img/news/blog-details-sm-2.jpg",
        title: "People think, feel, & behave in a way basic attack.",
        date: "July 21, 2021",
    },
    {
        id: 3, 
        img: "/assets/img/news/blog-details-sm-3.jpg",
        title: "That contributes to their success basic attack.",
        date: "July 21, 2021",
    },
]

const RecentPost = () => {
  return (
    <>
    <div className="sidebar__widget mb-40">
        <h3 className="sidebar__widget-title">Bài viết gần đây</h3>
        <div className="sidebar__widget-content">
            <div className="sidebar__post rc__post">
                {recent_post.map((item, i) => 
                    <div key={i} className="rc__post mb-20 d-flex align-items-center">
                        <div className="rc__post-thumb mr-20">
                        <Link href="/blog-details">
                            <img  src={item.img} alt={item.title} />
                        </Link>
                        </div>
                        <div className="rc__post-content">
                        <h3 className="rc__post-title">
                            <Link href="/blog-details">{item.title} </Link>
                        </h3>
                        <div className="rc__meta">
                            <span>{item.date}</span>
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

export default RecentPost;
