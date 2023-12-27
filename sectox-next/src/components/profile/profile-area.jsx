import React, { useState } from "react";
import Link from "next/link";
import {
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
  TabContent,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { Autoplay } from "swiper/modules";
import SwiperCore from "swiper";

//Images
import profileBg from "../../assets/images/profile-bg.jpg";
import avatar1 from "../../assets/images/users/avatar-1.jpg";

import { projects } from "../../data/pagesData";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";
import EcommerceOrders from "./EcommerceOrders";
const ProfileArea = () => {
  /**==================================GET CUSTOMER======================= */
  const selectLayoutState = (state) => state.Ecommerce;
  const ecomCustomerProperties = createSelector(selectLayoutState, (ecom) => ({
    customers: ecom.customers,
  }));
  // Inside your component
  const { customers: customer } = useSelector(ecomCustomerProperties);
  console.log(customer);

  SwiperCore.use([Autoplay]);

  const [activeTab, setActiveTab] = useState("1");

  const toggleTab = (tab) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  return (
    <div className="container">
      <div className="hm-section" style={{background:'white'}}>
        <React.Fragment>
          <div className="page-content">
            <Container fluid>
              <div className="" style={{background:'white'}}>
                <div className=""style={{background:'white'}}>
                  <img src={profileBg} alt="" className="profile-wid-img" />
                </div>
              </div>
              <div className="pt-4 mb-4 mb-lg-3 pb-lg-4 profile-wrapper">
                <Row className="g-4">
                  {/*<div className="col-auto">
                    <div className="avatar-lg">
                      <img
                        src={avatar1}
                        alt="user-img"
                        className="img-thumbnail rounded-circle"
                      />
                    </div>
                    </div>*/}

                  <Col>
                    <div className="p-2">
                      <h3 className="" >{customer.name}</h3>
                      <p className="">
                        {"Quyền: " + customer.role}
                      </p>
                      <div className="">
                        <div className="">
                          <i className=""></i>
                          {customer.email}
                        </div>
                      </div>
                    </div>
                  </Col>

                  {/* <Col xs={12} className="col-lg-auto order-last order-lg-0">
                    <Row className="text text-white-50 text-center">
                      <Col lg={6} xs={4}>
                        <div className="p-2">
                          <h4 className="text-white mb-1">24.3K</h4>
                          <p className="fs-14 mb-0">Followers</p>
                        </div>
                      </Col>
                      <Col lg={6} xs={4}>
                        <div className="p-2">
                          <h4 className="text-white mb-1">1.3K</h4>
                          <p className="fs-14 mb-0">Following</p>
                        </div>
                      </Col>
                    </Row>
                  </Col> */}
                </Row>
              </div>

              <Row>
                <Col lg={12}>
                  <div>
                    <div className="d-flex profile-wrapper">
                      <Nav
                        pills
                        className="animation-nav profile-nav gap-2 gap-lg-3 flex-grow-1"
                        role="tablist"
                      >
                        <NavItem>
                          <button
                            className={classnames({
                              active: activeTab === "1",
                            })}
                            onClick={() => {
                              toggleTab("1");
                            }}
                          >
                            <i className="ri-airplay-fill d-inline-block d-md-none"></i>{" "}
                            <span className="d-none d-md-inline-block">
                              Lịch sử đơn hàng
                            </span>
                          </button>
                        </NavItem>
                        {/*<NavItem>
                          <button
                            className={classnames({
                              active: activeTab === "2",
                            })}
                            onClick={() => {
                              toggleTab("2");
                            }}
                          >
                            <i className="ri-price-tag-line d-inline-block d-md-none"></i>{" "}
                            <span className="d-none d-md-inline-block">
                              Sổ địa chỉ
                            </span>
                          </button>
                          </NavItem>*/}
                      </Nav>
                      {/* <div className="flex-shrink-0">
                        <Link
                          to="/pages-profile-settings"
                          className="btn btn-secondary"
                        >
                          <i className="ri-edit-box-line align-bottom"></i> Edit
                          Profile
                        </Link>
                      </div> */}
                    </div>

                    <TabContent activeTab={activeTab} className="pt-4">
                      <TabPane tabId="1">
                        <EcommerceOrders />
                      </TabPane>

                      <TabPane tabId="2">
                        <Card>
                          <CardBody>
                            <Row>
                              {(projects || []).map((item, key) => (
                                <Col xxl={3} sm={6} key={key}>
                                  <Card
                                    className={`profile-project-card shadow-none profile-project-${item.cardBorderColor}`}
                                  >
                                    <CardBody className="p-4">
                                      <div className="d-flex">
                                        <div className="flex-grow-1 text-muted overflow-hidden">
                                          <h5 className="fs-14 text-truncate">
                                            <button >
                                              <span className="text-body">
                                                {item.title}
                                              </span>
                                            </button>
                                          </h5>
                                          <p className="text-muted text-truncate mb-0">
                                            Last Update :{" "}
                                            <span className="fw-semibold text-body">
                                              {item.updatedTime}
                                            </span>
                                          </p>
                                        </div>
                                        <div className="flex-shrink-0 ms-2">
                                          <div
                                            className={`badge bg-${item.badgeClass}-subtle text-${item.badgeClass} fs-10`}
                                          >
                                            {item.badgeText}
                                          </div>
                                        </div>
                                      </div>

                                      <div className="d-flex mt-4">
                                        <div className="flex-grow-1">
                                          <div className="d-flex align-items-center gap-2">
                                            <div>
                                              <h5 className="fs-12 text-muted mb-0">
                                                Members :
                                              </h5>
                                            </div>
                                            <div className="avatar-group">
                                              {(item.member || []).map(
                                                (subitem, key) => (
                                                  <div
                                                    className="avatar-group-item"
                                                    key={key}
                                                  >
                                                    <div className="avatar-xs">
                                                      <img
                                                        src={subitem.img}
                                                        alt=""
                                                        className="rounded-circle img-fluid"
                                                      />
                                                    </div>
                                                  </div>
                                                )
                                              )}

                                              {(item.memberName || []).map(
                                                (element, key) => (
                                                  <div
                                                    className="avatar-group-item"
                                                    key={key}
                                                  >
                                                    <div className="avatar-xs">
                                                      <div className="avatar-title rounded-circle bg-light text-primary">
                                                        {element.memberText}
                                                      </div>
                                                    </div>
                                                  </div>
                                                )
                                              )}
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </CardBody>
                                  </Card>
                                </Col>
                              ))}
                              <Col lg={12}>
                                <Pagination
                                  listClassName="justify-content-center"
                                  className="pagination-separated mb-0"
                                >
                                  <PaginationItem disabled>
                                    {" "}
                                    <PaginationLink to="#">
                                      {" "}
                                      <i className="mdi mdi-chevron-left" />{" "}
                                    </PaginationLink>{" "}
                                  </PaginationItem>
                                  <PaginationItem active>
                                    {" "}
                                    <PaginationLink to="#">
                                      {" "}
                                      1{" "}
                                    </PaginationLink>{" "}
                                  </PaginationItem>
                                  <PaginationItem>
                                    {" "}
                                    <PaginationLink to="#">
                                      {" "}
                                      2{" "}
                                    </PaginationLink>{" "}
                                  </PaginationItem>
                                  <PaginationItem>
                                    {" "}
                                    <PaginationLink to="#">
                                      {" "}
                                      3{" "}
                                    </PaginationLink>{" "}
                                  </PaginationItem>
                                  <PaginationItem>
                                    {" "}
                                    <PaginationLink to="#">
                                      {" "}
                                      4{" "}
                                    </PaginationLink>{" "}
                                  </PaginationItem>
                                  <PaginationItem>
                                    {" "}
                                    <PaginationLink to="#">
                                      {" "}
                                      5{" "}
                                    </PaginationLink>{" "}
                                  </PaginationItem>
                                  <PaginationItem>
                                    {" "}
                                    <PaginationLink to="#">
                                      {" "}
                                      <i className="mdi mdi-chevron-right" />{" "}
                                    </PaginationLink>{" "}
                                  </PaginationItem>
                                </Pagination>
                              </Col>
                            </Row>
                          </CardBody>
                        </Card>
                      </TabPane>
                    </TabContent>
                  </div>
                </Col>
              </Row>
            </Container>
          </div>
        </React.Fragment>
      </div>
    </div>
  );
};

export default ProfileArea;
