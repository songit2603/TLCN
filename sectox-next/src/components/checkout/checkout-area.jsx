import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import treeDataProvince from "../../data/dataprovince";
import { Label, Input, FormFeedback, Alert, Form, Row, Col } from "reactstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  addNewOrder as onAddNewOrder,
  getProducts as onGetProducts,
  startSession
} from "../../slices/thunks";
import {
  Modal,
  ModalBody,
} from "reactstrap";

const CheckoutArea = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [modal_backdrop, setmodal_backdrop] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  // eslint-disable-next-line
  const [selectedWard, setSelectedWard] = useState(null);
  const provinceOptions = Object.values(treeDataProvince).map((province) => ({
    value: province.value,
    label: province.label,
  }));
  const shippingCost = [
    { label: "Miễn phí giao hàng", value: 0 },
    { label: "Giao hàng hỏa tốc", value: 100000 },
  ];
  // Tạo biểu thức để tạo danh sách options cho quận/huyện
  const districtOptions = selectedProvince
    ? Object.values(treeDataProvince[selectedProvince.value].children).map(
        (district) => ({
          value: district.value,
          label: district.label,
        })
      )
    : [];
  // Tạo biểu thức để tạo danh sách options cho phường/xã
  const wardOptions = selectedDistrict
    ? Object.values(
        treeDataProvince[selectedProvince.value].children[
          selectedDistrict.value
        ].children
      ).map((ward) => ({
        value: ward.value,
        label: ward.label,
      }))
    : [];

  // Hàm xử lý khi chọn tỉnh/thành phố
  const handleSelectProvince = async (selectedOption) => {
    setSelectedProvince(selectedOption);
    setSelectedDistrict(null);
    setSelectedWard(null);
    await validation.setFieldValue("province", selectedOption);
    await validation.setFieldValue("district", "");
    await validation.setFieldValue("ward", "");
  };

  // Hàm xử lý khi chọn quận/huyện
  const handleSelectDistrict = async (selectedOption) => {
    setSelectedDistrict(selectedOption);
    setSelectedWard(null);
    await validation.setFieldValue("district", selectedOption);
    await validation.setFieldValue("ward", "");
  };

  // Hàm xử lý khi chọn phường/xã
  const handleSelectWard = async (selectedOption) => {
    setSelectedWard(selectedOption);
    await validation.setFieldValue("ward", selectedOption);
  };

  const handleBackdrop = async() => {
    tog_backdrop();
  };

  function tog_backdrop() {
    setmodal_backdrop(true);
  
    // Đặt hẹn giờ để tắt modal sau 1 giây
    setTimeout(() => {
      setmodal_backdrop(false);
    }, 3000);
  }
  
  const selectDashboardData = createSelector(
    (state) => state.Ecommerce.products,
    (products) => products
  );

  const products = useSelector(selectDashboardData);
  useEffect(() => {
    if (products && !products.length) {
      dispatch(onGetProducts());
    }
  }, [dispatch, products]);

  const items = JSON.parse(router.query.items);
  console.log(items);
  const totalItem = items.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
  //** ======================== CheckSession========================
  const isSessionActive = useSelector((state) => state.Session.isSessionActive);
  const token = useSelector((state) => state.Session.decodedToken);
  //validation

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: "",
      items: [],
      taxFee: 0,
      voucher: 0,
      totalItem: 0,
      shippingCost: 0,
      total: 0,
      email: "",
      phoneNumber: "",
      province: {},
      district: {},
      ward: {},
      address: "",
      paymentMethod: "COD",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Vui lòng nhập họ và tên"),
      phoneNumber: Yup.number().required("Vui lòng nhập vào số điện thoại"),
      address: Yup.string().required("Vui nhập địa chỉ"),
      province: Yup.object()
        .required("Vui lòng chọn tỉnh thành")
        .test(
          "is-not-empty",
          "Vui lòng chọn tỉnh thành", // Thông điệp lỗi
          (value) => Object.keys(value || {}).length > 0 // Kiểm tra không phải đối tượng rỗng
        ),

      district: Yup.object()
        .required("Vui lòng chọn Thành phố/Quận/Huyện")
        .test(
          "is-not-empty",
          "Vui lòng chọn Thành phố/Quận/Huyện", // Thông điệp lỗi
          (value) => Object.keys(value || {}).length > 0 // Kiểm tra không phải đối tượng rỗng
        ),

      ward: Yup.object()
        .required("Vui lòng chọn Phường/Xã")
        .test(
          "is-not-empty",
          "Vui lòng chọn Phường/Xã", // Thông điệp lỗi
          (value) => Object.keys(value || {}).length > 0 // Kiểm tra không phải đối tượng rỗng
        ),
    }),
    onSubmit: async (values) => {
      console.log("Dữ liệu hợp lệ");
      await dispatch(startSession());

      const shippingAddress = `${values.address}, ${values.ward.label}, ${values.district.label}, ${values.province.label}`;
      // Xử lý dữ liệu khác
      const newOrder = {
        name: values.name,
        taxFee: values.taxFee,
        voucher: values.voucher,
        totalItem: values.totalItem,
        shippingCost: values.shippingCost,
        total: values.total,
        email: values.email,
        phoneNumber: values.phoneNumber,
        shippingAddress: shippingAddress,
        paymentMethod: values.paymentMethod,
        items: values.items.map((item) => ({
          product: item.product,
          quantity: item.quantity,
          price: item.price,
          // Thêm các trường dữ liệu khác của sản phẩm tương ứng
        })),
      };
      if (isSessionActive) {
        // Nếu isSessionActive là true, thêm trường "userId"
        newOrder.userId = token.userId; // Thay userId bằng giá trị thực tế của userId
      }
      await dispatch(onAddNewOrder(newOrder));
      validation.resetForm();
      tog_backdrop();
      setTimeout(() => {
        router.push("/");
      }, 3000);
      
    },
  });
  useEffect(() => {
    // Kiểm tra và chuyển đổi giá trị voucher, taxFee, và shippingCost thành số nếu cần
    validation.setFieldValue("totalItem", totalItem);
    const voucher = parseFloat(validation.values.voucher) || 0;
    const taxFee = parseFloat(validation.values.taxFee) || 0;
    const shippingCost = parseFloat(validation.values.shippingCost) || 0;

    // Tính toán giá trị total
    const total =
      totalItem -
      (totalItem * voucher) / 100 +
      shippingCost +
      (totalItem * taxFee) / 100;

    // Cập nhật giá trị total bằng cách sử dụng setFieldValue
    validation.setFieldValue("total", total);
    validation.setFieldValue("items", items);
  }, [validation.values.shippingCost]);
  useEffect(() => {}, [validation]);

  return (
    <>
      <section className="coupon-area pt-100 pb-30"></section>

      <section className="checkout-area pb-70">
        <div className="container">
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              validation.handleSubmit();
              return false;
            }}
          >
            <div className="row">
              <div className="col-lg-6">
                <div className="checkbox-form">
                  <h3>Chi tiết đơn hàng</h3>

                  <div className="row">
                    <div className="checkout-form-list">
                      <Label
                        htmlFor="billinginfo-firstName"
                        className="form-label"
                      >
                        Họ và tên
                      </Label>
                      <Input
                        type="text"
                        className="form-control"
                        id="name-title-input"
                        placeholder="Nhập vào họ và tên"
                        name="name"
                        value={validation.values.name || ""}
                        onBlur={validation.handleBlur}
                        onChange={validation.handleChange}
                        invalid={
                          validation.errors.name && validation.touched.name
                            ? true
                            : false
                        }
                      />
                      {validation.errors.name && validation.touched.name ? (
                        <FormFeedback type="invalid">
                          {validation.errors.name}
                        </FormFeedback>
                      ) : null}
                    </div>
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <Label
                          htmlFor="billinginfo-phone"
                          className="form-label"
                        >
                          Số điện thoại
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="phone-title-input"
                          placeholder="Nhập vào số điện thoại"
                          name="phoneNumber"
                          value={validation.values.phoneNumber || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                          invalid={
                            validation.errors.phoneNumber &&
                            validation.touched.phoneNumber
                              ? true
                              : false
                          }
                        />
                        {validation.errors.phoneNumber &&
                        validation.touched.phoneNumber ? (
                          <FormFeedback type="invalid">
                            {validation.errors.phoneNumber}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="checkout-form-list">
                        <Label
                          htmlFor="billinginfo-email"
                          className="form-label"
                        >
                          Email
                          <span className="text-muted">(Tùy chọn)</span>
                        </Label>
                        <Input
                          type="text"
                          className="form-control"
                          id="name-title-input"
                          placeholder="Email"
                          name="email"
                          value={validation.values.email || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <Label htmlFor="province" className="form-label">
                          Tỉnh
                        </Label>
                        <Select
                          name="province"
                          options={provinceOptions}
                          value={validation.values.province}
                          onChange={async (selectedOption) => {
                            handleSelectProvince(selectedOption);
                          }}
                        />
                        {validation.errors.province ? (
                          <Alert color="danger">
                            <strong>Có lỗi xảy ra! </strong>
                            {validation.errors.province}
                          </Alert>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <Label htmlFor="district" className="form-label">
                          Thành phố/Quận/Huyện
                        </Label>
                        <Select
                          name="district"
                          options={districtOptions}
                          value={validation.values.district}
                          onChange={(selectedOption) => {
                            handleSelectDistrict(selectedOption);
                          }}
                        />
                        {validation.errors.district ? (
                          <Alert color="danger">
                            <strong>Có lỗi xảy ra! </strong>
                            {validation.errors.district}
                          </Alert>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <Label htmlFor="ward" className="form-label">
                          Phường/Xã
                        </Label>
                        <Select
                          name="ward"
                          options={wardOptions}
                          value={validation.values.ward}
                          onChange={(selectedOption) => {
                            handleSelectWard(selectedOption);
                          }}
                        />
                        {validation.errors.ward ? (
                          <Alert color="danger">
                            <strong>Có lỗi xảy ra! </strong>
                            {validation.errors.ward}
                          </Alert>
                        ) : null}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="checkout-form-list">
                        <Label
                          htmlFor="billinginfo-address"
                          className="form-label"
                        >
                          Địa chỉ
                        </Label>
                        <textarea
                          className={`form-control ${
                            validation.errors.address &&
                            validation.touched.address
                              ? "is-invalid"
                              : ""
                          }`}
                          id="billinginfo-address"
                          placeholder="Nhập vào địa chỉ"
                          name="address"
                          value={validation.values.address || ""}
                          onBlur={validation.handleBlur}
                          onChange={validation.handleChange}
                        ></textarea>
                        {validation.errors.address &&
                        validation.touched.address ? (
                          <FormFeedback type="invalid">
                            {validation.errors.address}
                          </FormFeedback>
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
                <div><td>
                            <div className="mt-4">
                              <h5 className="fs-14 mb-3">
                                Phương thức giao hàng
                              </h5>

                              <Row className="g-4">
                                <Col>
                                  <div className="form-check card-radio">
                                    <Input
                                      id="shippingMethod01"
                                      name="shippingMethod"
                                      type="radio"
                                      className="form-check-input"
                                      onChange={() =>
                                        validation.setFieldValue(
                                          "shippingCost",
                                          shippingCost[0].value
                                        )
                                      }
                                      defaultChecked
                                    />
                                    <Label
                                      className="form-check-label"
                                      htmlFor="shippingMethod01"
                                    >
                                      <span className="fs-20 float-end mt-2 text-wrap d-block fw-semibold">
                                        {shippingCost[0].value}đ
                                      </span>
                                      <span className="fs-14 mb-1 text-wrap d-block">
                                        {shippingCost[0].label}
                                      </span>
                                      <span className="text-muted fw-normal text-wrap d-block">
                                        Dự kiến giao hàng từ 3 đến 5 ngày
                                      </span>
                                    </Label>
                                  </div>
                                </Col>
                                <Col>
                                  <div className="form-check card-radio">
                                    <Input
                                      id="shippingMethod02"
                                      name="shippingMethod"
                                      type="radio"
                                      className="form-check-input"
                                      onChange={() =>
                                        validation.setFieldValue(
                                          "shippingCost",
                                          shippingCost[1].value
                                        )
                                      }
                                    />
                                    <Label
                                      className="form-check-label"
                                      htmlFor="shippingMethod02"
                                    >
                                      <span className="fs-20 float-end mt-2 text-wrap d-block fw-semibold">
                                        {new Intl.NumberFormat().format(
                                          shippingCost[1].value
                                        )}{" "}
                                        đ
                                      </span>
                                      <span className="fs-14 mb-1 text-wrap d-block">
                                        {shippingCost[1].label}
                                      </span>
                                      <span className="text-muted fw-normal text-wrap d-block">
                                        Có hàng trong vòng 24 giờ
                                      </span>
                                    </Label>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </td></div>
              </div>
              <div className="col-lg-6" >
                <h3>Đơn hàng của bạn</h3>
                <div className="your-order mb-30">
                  <div className="your-order-table table-responsive">
                    <table>
                      <thead>
                        <tr>
                          <th className="product-name">Sản phẩm</th>
                          <th className="product-total">Tổng</th>
                        </tr>
                      </thead>
                      <tbody>
                        {console.log(items)}
                        {Array.isArray(items) &&
                          items.map((item, index) => {
                            const product = products.find(
                              (p) => p._id === item.product._id
                            );
                            return (
                              <React.Fragment key={index}>
                                <tr>
                                  <td>
                                    <div className="avatar-md bg-light rounded p-1">
                                      <img
                                        src={product.images[0].url}
                                        alt=""
                                        className="img-fluid d-block"
                                      />
                                    </div>
                                  </td>
                                  <td>
                                    <h5 className="fs-14">
                                      <span className="text-body">
                                        {product.name.length > 29
                                          ? `${product.name.slice(0, 29)}...`
                                          : product.name}
                                      </span>
                                    </h5>
                                    <p className="text-muted mb-0">
                                      {new Intl.NumberFormat().format(
                                        item.price
                                      )}{" "}
                                      x {item.quantity}
                                    </p>
                                  </td>
                                  <td className="text-end">
                                    {new Intl.NumberFormat().format(
                                      item.price * item.quantity
                                    )}
                                    đ
                                  </td>
                                </tr>
                              </React.Fragment>
                            );
                          })}
                      </tbody>
                      <tfoot>
                        <tr className="cart-subtotal">
                          <th>Giá trị đơn hàng</th>
                          <td>
                            <span className="amount">
                              {new Intl.NumberFormat().format(
                                validation.values.totalItem
                              )}
                              đ
                            </span>
                          </td>
                        </tr>
                        <tr className="shipping">
                          <th>Phí giao hàng</th>
                          
                        </tr>

                        <tr className="order-total">
                          <th>Tổng</th>
                          <td>
                            <strong>
                              <span className="amount">
                                {new Intl.NumberFormat().format(
                                  validation.values.total
                                )}
                                đ
                              </span>
                            </strong>
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>

                  {/*<div className="payment-method">
                    <div className="accordion" id="checkoutAccordion">
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="checkoutOne">
                          <button
                            className="accordion-button"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#bankOne"
                            aria-expanded="true"
                            aria-controls="bankOne"
                          >
                            Chuyển khoản trực tiếp
                          </button>
                        </h2>
                        <div
                          id="bankOne"
                          className="accordion-collapse collapse show"
                          aria-labelledby="checkoutOne"
                          data-bs-parent="#checkoutAccordion"
                        >
                          <div className="accordion-body">
                            Thực hiện thanh toán trực tiếp vào tài khoản ngân
                            hàng của chúng tôi. Vui lòng sử dụng ID đơn hàng của
                            bạn làm tài liệu tham khảo thanh toán. Đơn đặt hàng
                            của bạn sẽ không được giao cho đến khi tiền đã được
                            xóa trong tài khoản của chúng tôi.
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="paymentTwo">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#payment"
                            aria-expanded="false"
                            aria-controls="payment"
                          >
                            Thanh toán bằng thẻ séc
                          </button>
                        </h2>
                        <div
                          id="payment"
                          className="accordion-collapse collapse"
                          aria-labelledby="paymentTwo"
                          data-bs-parent="#checkoutAccordion"
                        >
                          <div className="accordion-body">
                            Vui lòng gửi séc của bạn đến Tên cửa hàng, Phố cửa
                            hàng, Thị trấn cửa hàng, Cửa hàng Tiểu bang / Quận,
                            Cửa hàng Mã bưu điện.
                          </div>
                        </div>
                      </div>
                      <div className="accordion-item">
                        <h2 className="accordion-header" id="paypalThree">
                          <button
                            className="accordion-button collapsed"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#paypal"
                            aria-expanded="false"
                            aria-controls="paypal"
                          >
                            PayPal
                          </button>
                        </h2>
                        <div
                          id="paypal"
                          className="accordion-collapse collapse"
                          aria-labelledby="paypalThree"
                          data-bs-parent="#checkoutAccordion"
                        >
                          <div className="accordion-body">
                            Thanh toán qua PayPal; bạn có thể thanh toán bằng
                            thẻ tín dụng nếu bạn không có Tài khoản Paypal.
                          </div>
                        </div>
                      </div>
                                </div>*/}
                    <div className="order-button-payment mt-20">
                      <button type="submit" className="tp-btn" >
                        Đặt hàng
                      </button>
                    </div>
                  </div>
                </div>
              
            </div>
          </Form>
          
            <Modal
            isOpen={modal_backdrop}
            toggle={() => {
              tog_backdrop();
            }}
            backdrop={"static"}
            id="staticBackdrop"
            centered
          >
            <ModalBody className="text-center p-5">
              <lord-icon
                src="https://cdn.lordicon.com/lupuorrc.json"
                trigger="loop"
                colors="primary:#121331,secondary:#08a88a"
                style={{ width: "120px", height: "120px" }}
              ></lord-icon>
  
              <div className="mt-4">
                <h3 className="mb-3">Đặt hàng thành công</h3>
                <div className="hstack gap-2 justify-content-center">
                  {/*<button
                    to="/cart" // Đường dẫn đến trang giỏ hàng
                    className="btn btn-success"
                    onClick={() => {
                      setmodal_backdrop(false);
                      router.push("/cart");
                    }}
                  >
                    Đến giỏ hàng
                  </button>*/}
                  </div>
              </div>
            </ModalBody>
          </Modal>
          
        </div>
      </section>
    </>
  );
};

export default CheckoutArea;
