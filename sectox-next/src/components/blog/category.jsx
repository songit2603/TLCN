import Link from "next/link";
import React from "react";

const category_data = [
  { id: 1, category: "Business", item: "26" },
  { id: 2, category: "Consultant", item: "30" },
  { id: 3, category: "Creative", item: "71" },
  { id: 4, category: "UI/UX", item: "56" },
  { id: 5, category: "Technology", item: "60" },
];

const Category = () => {
  return (
    <>
      <div className="sidebar__widget mb-40">
        <h3 className="sidebar__widget-title">Danh mục</h3>
        <div className="sidebar__widget-content">
          <ul>
            {category_data.map((item, i) => (
              <li key={i}>
                <Link href="/blog">
                  {item.category}
                  <span>{item.item}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Category;
