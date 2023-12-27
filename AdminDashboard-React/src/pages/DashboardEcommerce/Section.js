import React from 'react';
import { Col, Row } from 'reactstrap';
import Flatpickr from "react-flatpickr";

const Section = (props) => {
    return (
      <React.Fragment>
        <Row className="mb-3 pb-1">
          <Col xs={12}>
            <div className="d-flex align-items-lg-center flex-lg-row flex-column">
              <div className="flex-grow-1">
                <h4 className="fs-16 mb-1">
                  Chào mừng bạn đến với trang Admin
                </h4>
                <p className="text-muted mb-0">
                  Đây là một số thống kê dữ liệu
                </p>
              </div>
              {/*<div className="mt-3 mt-lg-0">
                <form action="#">
                  <Row className="g-3 mb-0 align-items-center">
                    <div className="col-sm-auto">
                      <div className="input-group">
                        <Flatpickr
                          className="form-control border-0 dash-filter-picker shadow"
                          options={{
                            mode: "range",
                            dateFormat: "d M, Y",
                            defaultDate: [new Date()],
                          }}
                        />
                        <div className="input-group-text bg-primary border-primary text-white">
                          <i className="ri-calendar-2-line"></i>
                        </div>
                      </div>
                    </div>
                    <div className="col-auto">
                      <a
                        href="/apps-ecommerce-add-product"
                        class="btn btn-soft-secondary"
                      >
                        <i class="ri-add-circle-line align-middle me-1"></i>{" "}
                        Thêm sản phẩm
                      </a>
                    </div>
                    <div className="col-auto">
                      <button
                        type="button"
                        className="btn btn-soft-success btn-success waves-effect waves-light layout-rightside-btn"
                        onClick={props.rightClickBtn}
                      >
                        <i className="ri-pulse-line"></i>
                      </button>
                    </div>
                  </Row>
                </form>
                        </div>*/}
            </div>
          </Col>
        </Row>
      </React.Fragment>
    );
};

export default Section;