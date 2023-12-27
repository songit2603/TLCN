import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
//import { shoppingCart } from "../../../data/ecommerce";
import { createSelector } from "reselect";
import { useSelector, useDispatch } from "react-redux";

import { Card, CardBody, Container, Input, Row } from "reactstrap";
import {
  getCustomerById as onGetCustomerById,
  updateCart as onUpdateCart,
  deleteCart as onDeleteCart,
} from "../../slices/thunks";

const CartArea = () => {
  const router = useRouter();

  /**==================================GET CUSTOMER CART======================= */
  const [productList, setProductList] = useState([]);
  const [item, setItem] = useState([]);

  const selectLayoutState = (state) => state.Ecommerce;
  const ecomCustomerProperties = createSelector(selectLayoutState, (ecom) => ({
    customers: ecom.customers,
  }));
  // Inside your component
  const { customers: customer } = useSelector(ecomCustomerProperties);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.Session.decodedToken);
  const [dispatchCount, setDispatchCount] = useState(0);
  useEffect(() => {
    if (customer && !customer.length && token !== null && dispatchCount < 1) {
      dispatch(onGetCustomerById(token.userId));
      console.log(customer);
      setDispatchCount((prevCount) => prevCount + 1);
    } else if (customer && customer.cart && customer.cart.items) {
      setProductList(customer.cart.items);
    }
  }, [dispatch, token, customer, dispatchCount]);

  useEffect(() => {
    let subTotal = 0;
    productList.forEach((item) => {
      subTotal += item.quantity * item.price;
    });

    if (subTotal !== 0) {
    } else {
    }
  }, [productList]);

  async function removeCartItem(id, productId) {
    const filtered = productList.filter((item) => item._id !== id);
    await setProductList(filtered);
    const cartItem = {
      userId: token.userId,
      productId: productId,
    };
    await dispatch(onDeleteCart(cartItem));
    console.log(cartItem);
  }

  async function countUP(id, prev_quantity, itemPrice, productId) {
    await setProductList((prevProductList) =>
      prevProductList.map((p) =>
        p._id === id
          ? {
              ...p,
              quantity: prev_quantity + 1,
              total: (prev_quantity + 1) * itemPrice,
            }
          : p
      )
    );
    const cartItem = {
      userId: token.userId,
      productId: productId,
      quantity: prev_quantity + 1,
    };
    console.log(cartItem);
    await dispatch(onUpdateCart(cartItem));
  }

  async function countDown(id, prev_quantity, itemPrice, productId) {
    await setProductList((prevProductList) =>
      prevProductList.map((p) =>
        p._id === id && prev_quantity > 0
          ? {
              ...p,
              quantity: prev_quantity - 1,
              total: (prev_quantity - 1) * itemPrice,
            }
          : p
      )
    );
    const cartItem = {
      userId: token.userId,
      productId: productId,
      quantity: prev_quantity - 1,
    };
    await dispatch(onUpdateCart(cartItem));
  }
  const handleCheckout = () => {
    // Đối tượng chứa thông tin sản phẩm và số lượng
    const items = [...productList];
  
    // Chuyển đến trang checkout và truyền dữ liệu qua query parameter
    router.push({
      pathname: '/checkout',
      query: { items: JSON.stringify(items) },
    });
  };

  return (
    <>
      <section className="cart-area grey-bg pt-100 pb-100">
        <div className="container">
          <div className="hm-section">
            <React.Fragment>
              <div className="page-content">
                <Container fluid>
                  <Row className="mb-3">
                    <Row className="align-items-center gy-3 mb-3">
                      <div className="col-sm">
                        <div>
                          <h5 className="fs-14 mb-0">
                            Giỏ hàng của bạn ({productList.length} sản phẩm)
                          </h5>
                        </div>
                      </div>
                      <div className="col-sm-auto">
                        <Link href="/shop">
                          <span className="link-primary text-decoration-underline">
                            Tiếp tục mua sắm
                          </span>
                        </Link>
                      </div>
                    </Row>
                    {productList.map((cartItem, key) => (
                      <React.Fragment key={cartItem._id}>
                        <Card className="product">
                          <CardBody>
                            <Row className="gy-3">
                              <div className="col-sm-auto">
                                <div className="avatar-lg bg-light rounded p-1">
                                  <img src={cartItem.product.images[0].url} alt="" className="img-fluid d-block"/>
                                </div>
                              </div>
                              <div className="col-sm">
                                <h5 className="fs-14 text-truncate">
                                  <Link
                                    href={`/product-details-v2/${cartItem.product._id}`}
                                  >
                                    <span className="text-body">
                                      {cartItem.product.name.length > 80
                                        ? `${cartItem.product.name.slice(
                                            0,
                                            100
                                          )}...`
                                        : cartItem.product.name}
                                    </span>
                                  </Link>
                                </h5>
                                <ul className="list-inline text-muted">
                                  {/*<li className="list-inline-item">
                                    Màu sắc :{" "}
                                    <span className="fw-medium">
                                      {"cartItem.color"}
                                    </span>
                                  </li>
                                  <li className="list-inline-item">
                                    Kích thước :{" "}
                                    <span className="fw-medium">
                                      {"cartItem.size"}
                                    </span>
                                        </li>*/}
                                  <li className="list-inline-item">
                                    Số lượng còn trong kho:{" "}
                                    <span className="fw-medium">
                                      {cartItem.product.stock}
                                    </span>
                                  </li>
                                </ul>

                                <div className="input-step">
                                  <button
                                    type="button"
                                    className="minus"
                                    onClick={() => {
                                      if (cartItem.quantity > 1) {
                                        countDown(
                                          cartItem._id,
                                          cartItem.quantity,
                                          cartItem.price,
                                          cartItem.product._id
                                        );
                                      }
                                    }}
                                  >
                                    –
                                  </button>

                                  <Input
                                    type="text"
                                    className="product-quantity"
                                    value={cartItem.quantity}
                                    name="demo_vertical"
                                    readOnly
                                  />
                                  <button
                                    type="button"
                                    className="plus"
                                    onClick={() => {
                                      if (cartItem.quantity < cartItem.product.stock) {
                                        countUP(
                                          cartItem._id,
                                          cartItem.quantity,
                                          cartItem.price,
                                          cartItem.product._id
                                        );
                                      }
                                    }
                                    }
                                  >
                                    +
                                  </button>
                                </div>
                              </div>
                              <div className="col-sm-auto">
                                <div className="text-lg-end">
                                  <p className="text-muted mb-1">
                                    Giá sản phẩm:
                                  </p>
                                  <h5 className="fs-14">
                                    <span
                                      id="ticket_price"
                                      className="product-price"
                                    >
                                      {cartItem.price.toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      })}
                                    </span>
                                  </h5>
                                </div>
                              </div>
                            </Row>
                          </CardBody>

                          <div className="card-footer">
                            <div className="row align-items-center gy-3">
                              <div className="col-sm">
                                <div className="d-flex flex-wrap my-n1">
                                  <div>
                                    <button
                                      to="#"
                                      className="d-block text-body p-1 px-2"
                                      onClick={() =>
                                        removeCartItem(
                                          cartItem._id,
                                          cartItem.product._id
                                        )
                                      }
                                    >
                                      <i className="ri-delete-bin-fill text-muted align-bottom me-1"></i>{" "}
                                      Loại bỏ
                                    </button>
                                  </div>
                                </div>
                              </div>
                              <div className="col-sm-auto">
                                <div className="d-flex align-items-center gap-2 text-muted">
                                  <div>Thành tiền :</div>
                                  <h5 className="fs-14 mb-0">
                                    <span className="product-line-price">
                                      {" "}
                                      {(
                                        cartItem.price * cartItem.quantity
                                      ).toLocaleString("vi-VN", {
                                        style: "currency",
                                        currency: "VND",
                                      })}
                                    </span>
                                  </h5>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      </React.Fragment>
                    ))}

                    <div className="text-end mb-4">
                      <button
                        className="btn btn-secondary btn-label right ms-auto"
                        onClick={handleCheckout}
                      >
                        <i className="ri-arrow-right-line label-icon align-bottom fs-16 ms-2"></i>{" "}
                        Đặt hàng
                      </button>
                    </div>
                  </Row>
                </Container>
              </div>
            </React.Fragment>
          </div>
        </div>
      </section>
    </>
  );
};

export default CartArea;
