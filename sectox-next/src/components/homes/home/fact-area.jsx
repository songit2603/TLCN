import Count from "@/src/common/count";
import React from "react";

const fact_data = [
  {
    id: 1,
    counte: 82,
    titile: "Project Progress",
    description: <>A traditional CCTV system comprises one</>,
  },
  {
    id: 2,
    counte: 75,
    titile: "World Captured",
    description: <>A traditional CCTV system comprises one</>,
  },
  {
    id: 3,
    counte: 20,
    titile: "Team Functioinality",
    description: <>A traditional CCTV system comprises one</>,
  },
  {
    id: 4,
    counte: 59,
    titile: "Our Activities",
    description: <>A traditional CCTV system comprises one</>,
  },
];

const FactArea = () => {
  return (
    <>
      <div className="tp-fact-area theme-bg pt-70 pb-40">
        <div className="container">
          <div className="row counter-row">
            {fact_data.map((item, i) => (
              <div key={i} className="col-xl-3 col-md-6">
                <div className="tp-fact mb-10">
                  <div className="num__count"></div>
                  <div className="fact-number">
                    <h2 className="counter">
                      <Count number={item.counte} />
                    </h2>
                    <span className="per">%</span>
                  </div>
                  <div className="fact-content">
                    <h4>{item.titile}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FactArea;
