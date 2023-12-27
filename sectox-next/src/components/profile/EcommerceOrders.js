import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Card,
  CardBody,
  Nav,
  NavItem,
  NavLink,
  Modal,
  ModalHeader,
  Form,
  ModalBody,
  Label,
  Input,
  FormFeedback,
} from "reactstrap";
import Link  from 'next/link';
import classnames from "classnames";
import TableContainer from "./TableContainer";
import DeleteModal from "./DeleteModal";
import { isEmpty } from "lodash";

// Formik
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import {useSelector,useDispatch } from "react-redux";
import { createSelector } from 'reselect';

//Import actions
import {
  updateOrder as onUpdateOrder,
  deleteOrder as onDeleteOrder,
} from "../../slices/thunks";

import Loader from "./Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getCustomerById as onGetCustomerById } from "../../slices/thunks";
const EcommerceOrders = () => {
 //** ======================== CheckSession========================
 const token = useSelector((state) => state.Session.decodedToken);


 //** ======================== Get customer by id ========================
 const dispatch = useDispatch();

 const selectLayoutState = (state) => state.Ecommerce;
 const ecomCustomerProperties = createSelector(selectLayoutState, (ecom) => ({
   customers: ecom.customers,
   isCustomerSuccess: ecom.isCustomerSuccess,
   error: ecom.error,
 }));
 // Inside your component
 // eslint-disable-next-line
 const { customers: customer, isCustomerSuccess, error } = useSelector(
   ecomCustomerProperties
 );
 useEffect(() => {
   if (customer && !customer.length && token!==null) {
     dispatch(onGetCustomerById(token.userId));
   }
   // eslint-disable-next-line
 }, [dispatch,token]);
  const [modal, setModal] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  // Inside your component
  const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState([]);
  const orderstatus = [
    {
      options: [
        { label: "Hủy đơn", value: "Cancelled" },
        { label: "Hủy đơn", value: "Cancelled" },
        { label: "Hủy đơn", value: "Cancelled" },
        { label: "Hủy đơn", value: "Cancelled" },
        { label: "Hủy đơn", value: "Cancelled" },
      ],
    },
  ];

  const [isEdit, setIsEdit] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteModalMulti, setDeleteModalMulti] = useState(false);


  const handleDeleteOrder = () => {
    if (order) {
      dispatch(onDeleteOrder(order._id));
      setDeleteModal(false);
    }
  };

  useEffect(() => {
    setOrderList(customer.orders);
  }, [customer]);

  useEffect(() => {
    if (!isEmpty(customer.orders)) setOrderList(customer.orders);
  }, [customer]);

  const toggleTab = (tab, type) => {
    if (activeTab !== tab) {
      setActiveTab(tab);
      let filteredOrders = customer.orders;
      if (type !== "all") {
        filteredOrders = customer.orders.filter(
          (order) => order.status === type
        );
      }
      setOrderList(filteredOrders);
    }
  };

  const toggle = useCallback(() => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  }, [modal]);
  const handleOrderClick = useCallback(
    (arg) => {
      const order = arg;
      setOrder({
        _id: order._id,
        phoneNumber: order.phoneNumber,
        email: order.email,
        voucher: order.voucher,
        totalItem: order.totalItem,
        taxFee: order.taxFee,
        shippingCost: order.shippingCost,
        shippingAddress: order.shippingAddress,
        paymentMethod: order.paymentMethod,
        total: order.total,
        status: order.status,
        items: order.items,
        createDate: order.createDate,
        modifyDate: order.modifyDate,
        name: order.name,
      });
      setIsEdit(true);
      toggle();
    },
    [toggle]
  );
  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      _id: (order && order._id) || "",
      name: (order && order.name) || "",
      paymentMethod: (order && order.paymentMethod) || "",
      status: (order && order.status) || "",
      phoneNumber: (order && order.phoneNumber) || "",
      email: (order && order.email) || "",
      voucher: (order && order.voucher) || "",
      totalItem: (order && order.totalItem) || "",
      taxFee: (order && order.taxFee) || "",
      shippingCost: (order && order.shippingCost) || 0,
      shippingAddress: (order && order.shippingAddress) || "",
      total: (order && order.total) || "",
      items: (order && order.items) || [], // trừ cái này
      createDate: (order && order.createDate) || "",
      modifyDate: (order && order.modifyDate) || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Email"),
      phoneNumber: Yup.string().required("Please Enter Phone Number"),
      totalItem: Yup.number().required("Please Enter Total Item"),
      shippingCost: Yup.number().required("Please Enter Shipping Cost"),
      shippingAddress: Yup.string().required("Please Enter Shipping Address"),
      paymentMethod: Yup.string().required("Please Enter Payment Method"),
      total: Yup.number().required("Please Enter Total"),
      status: Yup.string().required("Please Enter Delivery Status"),
    }),

    onSubmit: async (values) => {
      if (isEdit) {
        const updateOrder = {
          _id: values._id,
          email: values.email, // Thêm email
          phoneNumber: values.phoneNumber, // Thêm phoneNumber
          items: order.items,
          voucher: values.voucher, // Thêm voucher
          taxFee: values.taxFee, // Thêm taxFee
          shippingCost: values.shippingCost, // Thêm shippingCost
          shippingAddress: values.shippingAddress, // Thêm shippingAddress
          paymentMethod: values.paymentMethod, // Thêm paymentMethod
          total: values.total, // Thêm total
          status: values.status,
        };
        // update order
        await dispatch(onUpdateOrder(updateOrder));
        await dispatch(onGetCustomerById(token.userId));
        validation.resetForm();
      } else {
        //   _id: (Math.floor(Math.random() * (30 - 20)) + 20).toString(),
        //   orderId: values["orderId"],
        //   name: values["name"],
        //   product: values["product"],
        //   orderDate: date,
        //   total: values["total"],
        //   paymentMethod: values["paymentMethod"],
        //   status: values["status"],
        //   phoneNumber: order.phoneNumber, // Thêm phoneNumber
        //   email: order.email, // Thêm email
        //   voucher: order.voucher, // Thêm voucher
        //   totalItem: order.totalItem, // Thêm totalItem
        //   taxFee: order.taxFee, // Thêm taxFee
        //   shippingCost: order.shippingCost, // Thêm shippingCost
        //   shippingAddress: order.shippingAddress, // Thêm shippingAddress
        //   paymentMethod: order.paymentMethod, // Thêm paymentMethod
        //   total: order.total, // Thêm total
        //   items: order.items, // Thêm items
        //   createDate: order.createDate, // Thêm createDate
        //   name: order.name, // Thêm name
        // };
        // // save new order
        // dispatch(onAddNewOrder(newOrder));
        // validation.resetForm();
      }
      toggle();
    },
  });

  useEffect(() => {
    if (customer.orders && !customer.orders.length) {
      setOrderList(customer.orders);
    }
  }, [dispatch, customer.orders, customer]);

  useEffect(() => {
    setOrder(customer.orders);
  }, [customer.orders]);

  useEffect(() => {
    if (!isEmpty(customer.orders)) {
      setOrder(customer.orders);
      setIsEdit(false);
    }
  }, [customer.orders]);

  const handleOrderClicks = () => {
    setOrder("");
    setIsEdit(false);
    toggle();
  };

  // Node API
  // useEffect(() => {
  //   if (isOrderCreated) {
  //     setOrder(null);
  //     dispatch(onGetOrders())
  //   }
  // }, [
  //   dispatch,
  //   isOrderCreated,
  // ]);

  // Checked All
  const checkedAll = useCallback(() => {
    const checkall = document.getElementById("checkBoxAll");
    const ele = document.querySelectorAll(".orderCheckBox");

    if (checkall.checked) {
      ele.forEach((ele) => {
        ele.checked = true;
      });
    } else {
      ele.forEach((ele) => {
        ele.checked = false;
      });
    }
    deleteCheckbox();
  }, []);

  // Delete Multiple
  const [selectedCheckBoxDelete, setSelectedCheckBoxDelete] = useState([]);
  // eslint-disable-next-line
  const [isMultiDeleteButton, setIsMultiDeleteButton] = useState(false);

  const deleteMultiple = () => {
    const checkall = document.getElementById("checkBoxAll");
    selectedCheckBoxDelete.forEach((element) => {
      dispatch(onDeleteOrder(element.value));
      setTimeout(() => {
        toast.clearWaitingQueue();
      }, 3000);
    });
    checkall.checked = false;
    setIsMultiDeleteButton(false);
  };

  const deleteCheckbox = () => {
    const ele = document.querySelectorAll(".orderCheckBox:checked");
    ele.length > 0
      ? setIsMultiDeleteButton(true)
      : setIsMultiDeleteButton(false);
    setSelectedCheckBoxDelete(ele);
  };

  // Column
  const columns = useMemo(
    () => [
      {
        Header: (
          <input
            type="checkbox"
            id="checkBoxAll"
            className="form-check-input"
            onClick={() => checkedAll()}
          />
        ),
        Cell: (cellProps) => {
          return (
            <input
              type="checkbox"
              className="orderCheckBox form-check-input"
              value={cellProps.row.original._id}
              onChange={() => {
                deleteCheckbox();
              }}
            />
          );
        },
        id: "#",
      },
      {
        Header: "Mã đơn hàng",
        accessor: "_id",
        filterable: true,
        Cell: (cell) => {
          const _id = cell.value.slice(0, 8) + " - " + cell.value.slice(8, 14);
          return (
            <Link href={`/order-details/${cell.value}`}>
              <span className="fw-medium link-primary">{_id}</span>
            </Link>
          );
        },
      },
      {
        Header: "Khách hàng",
        accessor: (row) =>
          row.name ? row.name + " (vãng lai)" : row.user.name + " (thành viên)",
        Cell: ({ value }) => (
          <span>
            {value ? (
              <strong
                style={
                  value.includes("thành viên")
                    ? { color: "#E0115F" }
                    : { color: "#009900" }
                }
              >
                {value}
              </strong>
            ) : null}
          </span>
        ),
        filterable: true,
      },
      {
        Header: "Sản phẩm",
        accessor: "items[0].product.name",
        filterable: true,
        Cell: (cell) => {
          const productValue = cell.value || "";
          const truncatedProduct =
            productValue.length > 20
              ? `${productValue.slice(0, 20)}...`
              : productValue;
          return <span title={productValue}>{truncatedProduct}</span>;
        },
      },
      {
        Header: "Ngày đặt hàng",
        accessor: "createDate",
        filterable: true,
      },
      {
        Header: "Tổng số lượng",
        accessor: "items",
        filterable: true,
        Cell: (cell) => {
          // Lấy ra mảng items từ cell.value
          const items = cell.value;

          // Tính tổng quantity từ mảng items
          const totalQuantity = items.reduce((total, item) => {
            return total + item.quantity;
          }, 0);

          // Hiển thị tổng trong cột "total"
          return <span>{totalQuantity}</span>;
        },
      },
      {
        Header: "Phương thức thanh toán",
        accessor: "paymentMethod",
        filterable: true,
      },
      {
        Header: "Trạng thái đơn hàng",
        accessor: "status",
        Cell: (cell) => {
          switch (cell.value) {
            case "Pending":
              return (
                <span className="badge text-uppercase bg-warning-subtle text-warning">
                  {" "}
                  {/* {cell.value}{" "} */}
                  {"Đang chờ xử lý"}{" "}
                </span>
              );
            case "Cancelled":
              return (
                <span className="badge text-uppercase bg-danger-subtle text-danger">
                  {" "}
                  {"Hủy đơn"}{" "}
                </span>
              );
            case "Inprogress":
              return (
                <span className="badge text-uppercase bg-secondary-subtle text-secondary">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
            case "Pickups":
              return (
                <span className="badge text-uppercase bg-info-subtle text-info">
                  {" "}
                  {"Lấy hàng"}{" "}
                </span>
              );
            case "Returns":
              return (
                <span className="badge text-uppercase bg-primary-subtle text-primary">
                  {" "}
                  {"Trả hàng"}{" "}
                </span>
              );
            case "Delivered":
              return (
                <span className="badge text-uppercase bg-success-subtle text-success">
                  {" "}
                  {"Đã giao"}{" "}
                </span>
              );
            default:
              return (
                <span className="badge text-uppercase bg-warning-subtle text-warning">
                  {" "}
                  {cell.value}{" "}
                </span>
              );
          }
        },
      },

      {
        Header: "Thao tác",
        Cell: (cellProps) => {
          const orderId = cellProps.row.original._id;
          return (
            <ul className="list-inline hstack gap-2 mb-0">
              <li className="list-inline-item">
                <Link href={`/order-details/${orderId}`}>
                  <span className="text-primary d-inline-block">
                    <i className="ri-eye-fill fs-16"></i>
                  </span>
                </Link>
              </li>
              <li className="list-inline-item edit">
                <span
                  className="text-primary d-inline-block edit-item-btn"
                  onClick={(e) => {
                    e.preventDefault();
                    const orderData = cellProps.row.original;
                    handleOrderClick(orderData);
                  }}
                >
                  <i className="ri-pencil-fill fs-16"></i>
                </span>
              </li>
              {/* <li className="list-inline-item">
                <Link
                  to="#"
                  className="text-danger d-inline-block remove-item-btn"
                  onClick={() => {
                    const orderData = cellProps.row.original;
                    onClickDelete(orderData);
                  }}
                >
                  <i className="ri-delete-bin-5-fill fs-16"></i>
                </Link>
              </li> */}
            </ul>
          );
        },
      },
    ],
    [handleOrderClick, checkedAll]
  );
  return (
    <div>
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <DeleteModal
        show={deleteModalMulti}
        onDeleteClick={() => {
          deleteMultiple();
          setDeleteModalMulti(false);
        }}
        onCloseClick={() => setDeleteModalMulti(false)}
      />

      <Card id="orderList">
        <CardBody className="pt-0">
          <div>
            <Nav
              className="nav-tabs nav-tabs-custom nav-success"
              role="tablist"
            >
              <NavItem>
                <button
                  className={classnames(
                    { active: activeTab === "1" },
                    "fw-semibold"
                  )}
                  onClick={() => {
                    toggleTab("1", "all");
                  }}
                >
                  <i className="ri-store-2-fill me-1 align-bottom"></i>
                  Tất cả{" "}
                  <span className="badge bg-danger align-middle ms-1">
                    {customer && customer.orders ? customer.orders.length : 0}
                  </span>
                </button>
              </NavItem>
              <NavItem>
                <button
                  className={classnames(
                    { active: activeTab === "2" },
                    "fw-semibold"
                  )}
                  onClick={() => {
                    toggleTab("2", "Delivered");
                  }}
                >
                  <i className="ri-checkbox-circle-line me-1 align-bottom"></i>
                  Đã giao{" "}
                  <span className="badge bg-danger align-middle ms-1">
                    {customer && customer.orders
                      ? customer.orders.filter(
                          (order) => order.status === "Delivered"
                        ).length
                      : 0}
                  </span>
                </button>
              </NavItem>
              <NavItem>
                <button
                  className={classnames(
                    { active: activeTab === "3" },
                    "fw-semibold"
                  )}
                  onClick={() => {
                    toggleTab("3", "Pickups");
                  }}
                >
                  <i className="ri-truck-line me-1 align-bottom"></i> Lấy hàng{" "}
                  <span className="badge bg-danger align-middle ms-1">
                    {customer && customer.orders
                      ? customer.orders.filter(
                          (order) => order.status === "Pickups"
                        ).length
                      : 0}
                  </span>
                </button>
              </NavItem>
              <NavItem>
                <button
                  className={classnames(
                    { active: activeTab === "4" },
                    "fw-semibold"
                  )}
                  onClick={() => {
                    toggleTab("4", "Returns");
                  }}
                >
                  <i className="ri-arrow-left-right-fill me-1 align-bottom"></i>
                  Trả hàng{" "}
                  <span className="badge bg-danger align-middle ms-1">
                    {customer && customer.orders
                      ? customer.orders.filter(
                          (order) => order.status === "Returns"
                        ).length
                      : 0}
                  </span>
                </button>
              </NavItem>
              <NavItem>
                <button
                  className={classnames(
                    { active: activeTab === "5" },
                    "fw-semibold"
                  )}
                  onClick={() => {
                    toggleTab("5", "Cancelled");
                  }}
                >
                  <i className="ri-close-circle-line me-1 align-bottom"></i>
                  Đã hủy{" "}
                  <span className="badge bg-danger align-middle ms-1">
                    {customer && customer.orders
                      ? customer.orders.filter(
                          (order) => order.status === "Cancelled"
                        ).length
                      : 0}
                  </span>
                </button>
              </NavItem>
            </Nav>
            {orderList && orderList.length ? (
              <TableContainer
                columns={columns}
                data={orderList || []}
                isGlobalFilter={true}
                isAddUserList={false}
                customPageSize={8}
                divClass="table-responsive table-card mb-1"
                tableClass="align-middle table-nowrap"
                theadClass="table-light text-muted"
                handleOrderClick={handleOrderClicks}
                isOrderFilter={true}
                SearchPlaceholder="Tìm kiếm ID đơn hàng, tên, trạng thái đơn hàng hoặc thứ gì đó..."
              />
            ) : (
              <Loader />
            )}
          </div>
          <Modal id="showModal" isOpen={modal} toggle={toggle} centered>
            <ModalHeader className="bg-light p-3" toggle={toggle}>
              {!!isEdit ? "Cập nhật đơn hàng" : "Tạo đơn hàng"}
            </ModalHeader>
            <Form
              className="tablelist-form"
              onSubmit={(e) => {
                e.preventDefault();
                validation.handleSubmit();
                return false;
              }}
            >
              <ModalBody>
                <input type="hidden" id="id-field" />
                <div>
                  <Label htmlFor="delivered-status" className="form-label">
                    Trạng thái đơn hàng
                  </Label>

                  <Input
                    name="status"
                    type="select"
                    className="form-select"
                    onChange={validation.handleChange}
                    onBlur={validation.handleBlur}
                    value={validation.values.status || ""}
                  >
                    {orderstatus.map((item, key) => (
                      <React.Fragment key={key}>
                        {item.options.map((item, key) => (
                          <option value={item.value} key={key}>
                            {item.label}
                          </option>
                        ))}
                      </React.Fragment>
                    ))}
                  </Input>
                  {validation.touched.status && validation.errors.status ? (
                    <FormFeedback type="invalid">
                      {validation.errors.status}
                    </FormFeedback>
                  ) : null}
                </div>
              </ModalBody>
              <div className="modal-footer">
                <div className="hstack gap-2 justify-content-end">
                  <button
                    type="button"
                    className="btn btn-light"
                    onClick={() => {
                      setModal(false);
                    }}
                  >
                    Close
                  </button>

                  <button type="submit" className="btn btn-primary">
                    {!!isEdit ? "Update" : "Add name"}
                  </button>
                </div>
              </div>
            </Form>
          </Modal>
          <ToastContainer closeButton={false} limit={1} />
        </CardBody>
      </Card>
    </div>
  );
};

export default EcommerceOrders;
