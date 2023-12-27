import Link from "next/link";
import React from "react";

// tags data 
const tags_data = [
    "Popular",
    "Design",
    "UX",
    "Usability",
    "Develop",
    "Icon",
    "Business",
    "Consult",
    "Kit",
    "Keyboard",
    "Mouse",
    "Tech",
]

const Tags = () => {
  return (
    <>
      <div className="sidebar__widget mb-40">
        <h3 className="sidebar__widget-title">Thẻ</h3>
        <div className="sidebar__widget-content">
          <div className="tagcloud">
            {tags_data.map((tag, i) => <Link key={i} href="/blog">{tag}</Link>)} 
          </div>
        </div>
      </div>
    </>
  );
};

export default Tags;
