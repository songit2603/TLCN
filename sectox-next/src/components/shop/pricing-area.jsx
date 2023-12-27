import Pagination from "react-js-pagination";
import Link from "next/link";
//redux
import Sidebar from "./Shopsidebar";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import { Modal, OverlayTrigger, Tooltip } from "react-bootstrap";

//Import actions
import {
  getProducts as onGetProducts,
  // getCategories as onGetCategories,
  // getBrands as onGetBrands,
} from "../../slices/thunks";

const ShoppingArea = () => {
  const [activePage, setActivePage] = useState(1);
  const [itemPerPage] = useState(12);
  const [modalshow, setModalShow] = useState(false);
  const [lastActiveBox, setLastActiveBox] = useState(-1);
  const [selectedOption, setSelectedOption] = useState("default");

  const handlePageChange = (pageNumber) => {
    setActivePage(pageNumber);
  };

  const modalShow = (index) => {
    setModalShow(true);
    setLastActiveBox(index);
  };

  const modalClose = () => {
    setModalShow(false);
  };
  //GetProductFromAPi
  const dispatch = useDispatch();
  const [productList, setProductList] = useState([]);
  const [productListFilter, setProductListFilter] = useState([]);
  const selectDashboardData = createSelector(
    (state) => state.Ecommerce.products,
    (products) => products
  );
  const products = useSelector(selectDashboardData);
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }
  useEffect(() => {
    async function handleProductData() {
      // Nếu products không có hoặc rỗng, thực hiện dispatch để lấy dữ liệu
      if (!products || !products.length) {
        await dispatch(onGetProducts());
      }
      // Khi products có sẵn, lọc và xáo trộn chúng
      if (products && products.length) {
        const filteredProducts = products.filter((p) => p.isPublish === true);
        const shuffledProducts = shuffleArray(filteredProducts);
        await setProductList(shuffledProducts);
      }
    }
    handleProductData();
  }, [dispatch, products]); // Phụ thuộc vào dispatch và products

  function parseDateFromString(dateString) {
    // Tạo một đối tượng Date với năm mặc định (ví dụ: 2023)
    const defaultYear = 2023;
    const parts = dateString.split(" ");
    const month = parts[0];
    const day = parseInt(parts[1]);
    const time = parts[3];
    const fullDateString = `${month} ${day}, ${defaultYear} ${time}`;
    return new Date(fullDateString);
  }
  const getAllProducts = async () => {
    await setProductListFilter(productList);
  };
  const getProductNewest = async () => {
    let filteredProducts = [...productList];
    filteredProducts.sort(
      (a, b) =>
        parseDateFromString(b.publishedDate) -
        parseDateFromString(a.publishedDate)
    );
    await setProductListFilter(filteredProducts);
  };
  const getBestSellingProducts = async () => {
    let filteredProducts = [...productList];
    filteredProducts.sort((a, b) => b.ordersCount - a.ordersCount);
    await setProductListFilter(filteredProducts);
  };
  const getHighPricedProducts = async () => {
    let filteredProducts = [...productList];
    filteredProducts.sort((a, b) => b.newPrice - a.newPrice);
    await setProductListFilter(filteredProducts);
  };
  const getLowPricedProducts = async () => {
    let filteredProducts = [...productList];
    filteredProducts.sort((a, b) => a.newPrice - b.newPrice);
    await setProductListFilter(filteredProducts);
  };

  const handleSortByChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);

    switch (selectedValue) {
      case "default":
        getAllProducts();
        break;
      case "newest":
        getProductNewest();
        break;
      case "mostViewed":
        getBestSellingProducts();
        break;
      case "highPrice":
        getHighPricedProducts();
        break;
      case "lowPrice":
        getLowPricedProducts();
        break;
      default:
        // Xử lý tùy chọn mặc định hoặc tùy chọn khác
        break;
    }
  };
  const paginationData = productListFilter
    .slice((activePage - 1) * itemPerPage, activePage * itemPerPage)
    .map((item, i) => (
      <div key={i} className="col-lg-4 col-md-4 col-sm-6">
        <div className="tp-porduct-item p-relative mb-30">
          <Link
            href={"/shop-details/" + item.id}
            className="hm-product-img-wrapper p-0"
          >
            <div className="hm-product-badges">
              {item.featured === true ? (
                <span className="flaticon-fire hot" />
              ) : (
                ""
              )}
              {item.discount > 0 || item.discount !== "" ? (
                <span className="sale">{item.discount}%</span>
              ) : (
                ""
              )}
            </div>
            <img src={item.images[0].url} alt={item.name} />
          </Link>
          <div className="hm-product-content">
            <h3 className="tp-pro-title">
              <Link href={"/shop-details/" + item.id}>
                {item.name.length <= 50
                  ? item.name
                  : item.name.slice(0, 50) + "..."}
              </Link>
            </h3>

            <div className="hm-product-controls">
              <div className="hm-product-atc">
                {item.stock === true ? (
                  <span className="btn hm-favorite hm-product-icon hm-hoverable-icon">
                    
                    <i className="your-additional-icon-class">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-shopping-cart"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                    </i>
                  </span>
                ) : (
                  <span className="btn hm-favorite hm-product-icon hm-hoverable-icon">
                   
                    <i className="your-additional-icon-class">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="feather feather-shopping-cart"
                      >
                        <circle cx="9" cy="21" r="1"></circle>
                        <circle cx="20" cy="21" r="1"></circle>
                        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                      </svg>
                    </i>
                  </span>
                )}

                <span
                  className="btn hm-favorite hm-product-icon hm-hoverable-icon"
                  onClick={() => modalShow(item.id)}
                >
               
                  <i className="your-additional-icon-class">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="feather feather-info"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                  </i>
                </span>
              </div>
            </div>
            <div className="hm-product-meta">
              <div className="hm-product-price">
                <span className="hm-discounted-price hm-text-primary" style={{color:'#3c8599'}}>
                  {new Intl.NumberFormat().format(item.newPrice)}đ
                </span>
                {item.discount > 0 || item.discount !== "" ? (
                  <span className="hm-actual-price has-discount">
                    {new Intl.NumberFormat().format(item.price)}đ
                  </span>
                ) : (
                  ""
                )}
                <div>Đã bán: {item.orders.length}</div>
              </div>
              <div className="hm-product-colors">
                {item.colors.map((color, i) => (
                  <OverlayTrigger
                    key={i}
                    placement="top"
                    overlay={<Tooltip> {color.name} </Tooltip>}
                  >
                    <span className={"color-" + color.color} key={i} />
                  </OverlayTrigger>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    ));
  const selectHandler = (e) => {};
  return (
    <>
      <div className="tp-shop-area grey-bg pt-115 pb-90">
        <div className="container">
          <div className="row text-center">
            {/*<div className="col-xl-12">
              <div className="tp-section-box tp-section-box-2 p-relative mb-50">
                 <span className="tp-section-subtitle d-inline-block pre mb-10">shop</span>
               <h2 className="tp-section-title">
                  Sản phẩm
                </h2>
              </div>
            </div>*/}
          </div>
          <section className="product__area pt-120 pb-100">
            <div className="row">
              <div className="col-xl-3 col-lg-3">
                <Sidebar
                  productList={productList}
                  productListFilter={productListFilter}
                  setProductListFilter={setProductListFilter}
                />
              </div>
              <div className="col-xl-9 col-lg-9">
                <div className="hm-shop-filter py-3">
                  <div className="hm-filter">
                    {/*<ul className="list-inline">
                      <li className="list-inline-item hm-filter-border">
                        <Link href="/shop" className="filter active">
                          <i className="fa fa-th-large" style={{color:'#3c8599'}}  />
                        </Link>
                      </li>
                      <li className="list-inline-item hm-filter-border">
                        <Link href="/shop-list" className="filter">
                          <i className="fa fa-list" style={{color:'#3c8599'}}/>
                        </Link>
                      </li>
          </ul>*/}
                    <form className="form-inline">
                      <div className="form-group">
                        <label htmlFor="sortby">Sắp xếp theo:</label>
                        <select
                          className="form-control"
                          id="sortby"
                          onChange={handleSortByChange}
                          value={selectedOption}
                        >
                          <option value="default">Tất cả sản phẩm</option>
                          <option value="newest">Sản phẩm mới ra</option>
                          <option value="mostViewed">
                            Sản phẩm bán chạy
                          </option>
                          <option value="highPrice">Giá cao</option>
                          <option value="lowPrice">Giá thấp</option>
                        </select>
                      </div>
                    </form>
                  </div>
                  <div className="hm-pagination">
                    <Pagination
                      activePage={activePage}
                      itemsCountPerPage={itemPerPage}
                      totalItemsCount={productList.length}
                      pageRangeDisplayed={productList.length}
                      onChange={handlePageChange}
                      innerClass="pagination"
                      activeClass="active"
                      itemClass="page-item"
                      linkClass="page-link"
                    
                    />
                  </div>
                </div>
                <div className="hm-products">
                  <div className="row">{paginationData}</div>
                </div>
              </div>
            </div>

          </section>
        </div>
      </div>
    </>
  );
};

export default ShoppingArea;
