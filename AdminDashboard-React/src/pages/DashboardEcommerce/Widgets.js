import React, { useState, useEffect } from "react";
import CountUp from "react-countup";
import { Link } from 'react-router-dom';
import { Card, CardBody, Col } from 'reactstrap';
//import { ecomWidgets } from "../../common/data";

const Widgets = (props) => {
  const dataRevenue = props.dataRevenue;

  const ecomWidgets = [
    {
      id: 1,
      cardColor: "primary",
      label: "Tổng doanh thu",
      //badge: "ri-arrow-right-up-line",
      badgeClass: "success",
      //percentage: "+16.24",
      counter: dataRevenue.totalRevenue,
      //link: "Xem chi tiết",
      bgcolor: "secondary",
      icon: "bx bx-dollar-circle",
      decimals: 0,
      //prefix: "$",
      suffix: " VND",
    },
    {
      id: 2,
      cardColor: "secondary",
      label: "Số lượt đặt hàng",
      //badge: "ri-arrow-right-down-line",
      badgeClass: "danger",
      //percentage: "-3.57",
      counter: dataRevenue.totalOrders,
      //link: "Xem chi tiết",
      bgcolor: "primary",
      icon: "bx bx-shopping-bag",
      decimals: 0,
      prefix: "",
      separator: ".",
      suffix: "",
    },
    {
      id: 3,
      cardColor: "success",
      label: "Khách hàng",
      //badge: "ri-arrow-right-up-line",
      badgeClass: "success",
      //percentage: "+29.08",
      counter: dataRevenue.totalUsers,
      //link: "Xem chi tiết",
      bgcolor: "success",
      icon: "bx bx-user-circle",
      decimals: 0,
      prefix: "",
      suffix: "",
    },
    
  ];
  return (
    <React.Fragment>
      {ecomWidgets.map((item, key) => (
        <Col xl={3} md={6} key={key}>
          <Card className="card-animate">
            <CardBody>
              <div className="d-flex align-items-center">
                <div className="flex-grow-1 overflow-hidden">
                  <p className="text-uppercase fw-medium text-muted text-truncate mb-0">
                    {item.label}
                  </p>
                </div>
                <div className="">
                  <h5 className={"" + item.badgeClass}>
                    {item.badge ? (
                      <i className={" " + item.badge}></i>
                    ) : null}{" "}
                    {item.percentage} 
                  </h5>
                </div>
              </div>
              <div className="d-flex align-items-end justify-content-between mt-4">
                <div>
                  <h4 className="fs-20 fw-semibold ff-secondary mb-4">
                    <span className="counter-value" data-target="559.250">
                      <CountUp
                        start={0}
                        prefix={item.prefix}
                        suffix={item.suffix}
                        separator={item.separator}
                        end={item.counter}
                        decimals={item.decimals}
                        duration={4}
                      />
                    </span>
                  </h4>
                  {/*<Link to="#" className="text-decoration-underline">
                    {item.link}
                    </Link>*/}
                </div>
                <div className="avatar-sm flex-shrink-0">
                  <span
                    className={
                      "avatar-title rounded fs-3 bg-" + item.bgcolor + "-subtle"
                    }
                  >
                    <i className={`text-${item.bgcolor} ${item.icon}`}></i>
                  </span>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col>
      ))}
    </React.Fragment>
  );
};

export default Widgets;