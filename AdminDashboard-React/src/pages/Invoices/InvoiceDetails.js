import React, { useState, useEffect } from "react";
import { CardBody, Row, Col, Card, Table, CardHeader, Container } from "reactstrap";
import BreadCrumb from "../../Components/Common/BreadCrumb";

import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";
import { getOrderById as onGetOrderByID } from "../../slices/thunks";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
const InvoiceDetails = () => {
  //Print the Invoice
  const printInvoice = () => {
    window.print();
  };
  const { _id: orderId } = useParams();
  const dispatch = useDispatch();
  const orderDetails = useSelector((state) => state.Ecommerce.orderDetails);
  useEffect(() => {
    if (orderDetails && !orderDetails.length) {
      dispatch(onGetOrderByID(orderId));
    }
  }, [orderId, dispatch]);
  console.log(orderDetails);

  document.title = "Invoice Details | Velzon - React Admin & Dashboard Template";

  return (
    <div className="page-content">
      <Container fluid>
        <BreadCrumb title="Chi tiết hóa đơn" pageTitle="Hóa đơn" />

        <Row className="justify-content-center">
          <Col xxl={9}>
            <Card id="demo">
              <Row>
                <Col lg={12}>
                  <CardHeader className="border-bottom-dashed p-4">
                    <div className="d-flex">
                      <div className="flex-grow-1">
                        <img
                          src={logoDark}
                          className="card-logo card-logo-dark"
                          alt="logo dark"
                          height="17"
                        />
                        <img
                          src={logoLight}
                          className="card-logo card-logo-light"
                          alt="logo light"
                          height="17"
                        />
                        <div className="mt-sm-5 mt-4">
                          <h6 className="text-muted text-uppercase fw-semibold">
                            Địa chỉ
                          </h6>
                          <p className="text-muted mb-1" id="address-details">
                            Số 1 đường Võ Văn Ngân, phường Linh Chiểu, thành phố
                            Thủ Đức
                          </p>
                        </div>
                      </div>
                      <div className="flex-shrink-0 mt-sm-0 mt-3">
                        <h6>
                          <span className="text-muted fw-normal">Email:</span>{" "}
                          <span id="email">velzon@gmail.com</span>
                        </h6>
                        <h6>
                          <span className="text-muted fw-normal">Website:</span>{" "}
                          <Link to="#" className="link-primary" id="website">
                            www.velzon.com
                          </Link>
                        </h6>
                        <h6 className="mb-0">
                          <span className="text-muted fw-normal">Liên hệ:</span>{" "}
                          <span id="contact-no"> +(84)367151727</span>
                        </h6>
                      </div>
                    </div>
                  </CardHeader>
                </Col>
                <Col lg={12}>
                  <CardBody className="p-4">
                    <Row className="g-3">
                      <Col lg={3} xs={6}>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                          Hóa đơn số
                        </p>
                        <h5 className="fs-14 mb-0">
                          <span id="invoice-no">{orderDetails._id}</span>
                        </h5>
                      </Col>
                      <Col lg={3} xs={6}>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                          Ngày tạo
                        </p>
                        <h5 className="fs-14 mb-0">
                          <span id="invoice-date">
                            {orderDetails.createDate}
                          </span>{" "}
                          <small className="text-muted" id="invoice-time">
                            02:36PM
                          </small>
                        </h5>
                      </Col>
                      <Col lg={3} xs={6}>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                          Tình trạng thanh toán
                        </p>
                        <span
                          className="badge bg-success-subtle text-success fs-11"
                          id="payment-status"
                        >
                          {orderDetails.status}
                        </span>
                      </Col>
                      <Col lg={3} xs={6}>
                        <p className="text-muted mb-2 text-uppercase fw-semibold">
                          Tổng số tiền
                        </p>
                        <h5 className="fs-14 mb-0">
                          <span id="total-amount">
                            {orderDetails.total.toLocaleString("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            })}
                          </span>
                        </h5>
                      </Col>
                    </Row>
                  </CardBody>
                </Col>
                <Col lg={12}>
                  <CardBody className="p-4 border-top border-top-dashed">
                    <Row className="g-3">
                      <Col sm={6}>
                        <h6 className="text-muted text-uppercase fw-semibold mb-3">
                          Thông tin khách hàng
                        </h6>
                        <p className="fw-medium mb-2" id="billing-name">
                          {"Họ và tên: " +
                            (orderDetails.name
                              ? orderDetails.name
                              : orderDetails.user
                              ? orderDetails.user.name
                              : "")}
                        </p>

                        <p className="text-muted mb-1">
                          <span>Số điện thoại: </span>
                          <span id="billing-phone-no">
                            {orderDetails.phoneNumber}
                          </span>
                        </p>
                        <p
                          className="text-muted mb-1"
                          id="billing-address-line-1"
                        >
                          {"Email: " + orderDetails.email}
                        </p>
                      </Col>
                      <Col sm={6}>
                        <h6 className="text-muted text-uppercase fw-semibold mb-3">
                          Địa chỉ giao hàng
                        </h6>
                        <p className="fw-medium mb-2" id="billing-name">
                          {orderDetails.shippingAddress}
                        </p>
                        {/* <p
                          className="text-muted mb-1"
                          id="billing-address-line-1"
                        >
                          305 Đề thám, Hà Nội
                        </p>
                        <p className="text-muted mb-1">
                          <span>Số điện thoại: +</span>
                          <span id="billing-phone-no">(123) 456-7890</span>
                        </p> */}
                      </Col>
                    </Row>
                  </CardBody>
                </Col>
                <Col lg={12}>
                  <CardBody className="p-4">
                    <div className="table-responsive">
                      <Table className="table-borderless text-center table-nowrap align-middle mb-0">
                        <thead>
                          <tr className="table-active">
                            <th scope="col" style={{ width: "50px" }}>
                              #
                            </th>
                            <th scope="col">Chi tiết sản phẩm</th>
                            <th scope="col">Đơn giá</th>
                            <th scope="col">Số lượng</th>
                            <th scope="col" className="text-end">
                              Thành tiền
                            </th>
                          </tr>
                        </thead>
                        <tbody id="products-list">
                          {orderDetails.items.map((item, index) => (
                            <tr key={index}>
                              <th scope="row">{index + 1}</th>
                              <td className="text-start">
                                <div
                                  className="fw-medium"
                                  style={{ whiteSpace: "normal" }}
                                >
                                  {item.product.name}
                                </div>
                              </td>
                              <td>{item.price.toLocaleString("vi-VN")} ₫</td>

                              <td>{item.quantity}</td>
                              <td className="text-end">
                                {(item.price * item.quantity).toLocaleString(
                                  "vi-VN"
                                )}
                                ₫
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>
                    <div className="border-top border-top-dashed mt-2">
                      <Table
                        className="table table-borderless table-nowrap align-middle mb-0 ms-auto"
                        style={{ width: "250px" }}
                      >
                        <tbody>
                          <tr>
                            <td>Tạm tính</td>
                            <td className="text-end">
                              {orderDetails.totalItem.toLocaleString("vi-VN")}₫
                            </td>
                          </tr>
                          <tr>
                            <td>Thuế VAT</td>
                            <td className="text-end">
                              {orderDetails.taxFee + "%"}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              Giảm giá{" "}
                              <small className="text-muted">(VELZON15)</small>
                            </td>
                            <td className="text-end">
                              - {orderDetails.voucher}
                            </td>
                          </tr>
                          <tr>
                            <td>Phí giao hàng</td>
                            <td className="text-end">
                              {orderDetails.shippingCost.toLocaleString(
                                "vi-VN"
                              )}
                              ₫
                            </td>
                          </tr>
                          <tr className="border-top border-top-dashed fs-15">
                            <th scope="row">Tổng tiền</th>
                            <th className="text-end">
                              {orderDetails.total.toLocaleString("vi-VN")}₫
                            </th>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
                    <div className="mt-3">
                      <h6 className="text-muted text-uppercase fw-semibold mb-3">
                        Thông tin thanh toán:
                      </h6>
                      <p className="text-muted mb-1">
                        Phương thức thanh toán:{" "}
                        <span className="fw-medium" id="payment-method">
                          {orderDetails.paymentMethod}
                        </span>
                      </p>
                      <p className="text-muted mb-1">
                        Chủ thẻ:{" "}
                        <span className="fw-medium" id="card-holder-name">
                          ...
                        </span>
                      </p>
                      <p className="text-muted mb-1">
                        Số tài khoản:{" "}
                        <span className="fw-medium" id="card-number">
                          ...
                        </span>
                      </p>
                      <p className="text-muted">
                        Tổng tiền:{" "}
                        <span className="fw-medium" id="">
                          {orderDetails.total.toLocaleString("vi-VN")}₫
                        </span>
                      </p>
                    </div>
                    <div className="mt-4">
                      <div className="alert alert-info">
                        <p className="mb-0">
                          <span className="fw-semibold">GHI CHÚ:</span>
                          <span id="note">
                            {" "}
                            Tất cả các tài khoản phải được thanh toán trong vòng
                            7 ngày kể từ ngày nhận được hoá đơn. ĐẾN được thanh
                            toán bằng séc hoặc thẻ tín dụng hoặc thanh toán trực
                            tiếp trực tuyến. Nếu tài khoản không được thanh toán
                            trong vòng 7 ngày, chi tiết tín dụng được cung cấp
                            dưới dạng xác nhận công việc được thực hiện sẽ được
                            tính phí trích dẫn đã thỏa thuận nêu trên.
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="hstack gap-2 justify-content-end d-print-none mt-4">
                      <Link
                        to="#"
                        onClick={printInvoice}
                        className="btn btn-secondary"
                      >
                        <i className=" align-bottom me-1"></i> In và tải xuống
                      </Link>
                      
                    </div>
                  </CardBody>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default InvoiceDetails;
