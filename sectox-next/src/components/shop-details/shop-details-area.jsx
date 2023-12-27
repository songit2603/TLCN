import product_data from "@/src/data/product-data";
import Review from "@/src/forms/review";
import Link from "next/link";
import { useRouter } from "next/router";
import Slider from "react-slick";
import {
  Modal,
  ModalBody,
} from "reactstrap";

//redux
import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createSelector } from "reselect";
import {
  getProducts as onGetProducts,
  addNewCart as onAddNewCart,
  startSession,
  getCustomerById as onGetCustomerById ,
  getProductById as onGetProductById
} from "../../slices/thunks";



const settingsThumb = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  focusOnSelect: true,
  // ... thêm các tùy chọn khác nếu cần
};
const ShopDetailsArea = () => {
  const [activeTab, setActiveTab] = useState(0);
  const router = useRouter();
  const { id:idProduct } = router.query;
  const sliderRef = useRef(null);

  //GetProductFromAPi
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [newPrice, setNewPrice] = useState(1);
  const selectDashboardData = createSelector(
    (state) => state.Ecommerce.products,
    (products) => products
  );
  const products = useSelector(selectDashboardData);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  const slider1Ref = React.useRef(null);
  const slider2Ref = React.useRef(null);
/**Các hàm xử lý nghiệp vụ */
  
  useEffect(() => {
    setNav1(slider1Ref.current);
    setNav2(slider2Ref.current);
    if (products && !products.length) {
      dispatch(onGetProducts());
    }
  }, [dispatch, products]);
  const productDetails = useSelector((state) => state.Ecommerce.productDetails);
  useEffect(() => {
    if (productDetails && !productDetails.length) {
      dispatch(onGetProductById(idProduct));
    } 
    // eslint-disable-next-line
  }, [idProduct, dispatch]);

  useEffect(() => {
    if (productDetails && productDetails.newPrice && productDetails.discount !== undefined) {
      setNewPrice(productDetails.newPrice);
    }
  }, [productDetails]);
  const handleChangeQty = (event) => {
    // Đảm bảo số lượng luôn lớn hơn hoặc bằng 1
    const newQty = Math.max(1, parseInt(event.target.value) || 0);
    setQty(newQty);
  };
  const handleIncrease = () => {
    if (qty < productDetails.stock) {
      setQty(qty + 1);
    }
  };

  const handleDecrease = () => {
    // Ensure qty is greater than 1 before decrementing
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  const handleBuyNow = () => {
    // Đối tượng chứa thông tin sản phẩm và số lượng
    const items = [
      {
        product: productDetails,
        price: newPrice, // Giá sản phẩm
        quantity: qty, // Số lượng muốn mua
        // Thêm thông tin sản phẩm khác nếu cần
      },
    ];
    if(productDetails.stock > 0){

    // Chuyển đến trang checkout và truyền dữ liệu thông qua props
    router.push({
      pathname: "/checkout",
      query: { items: JSON.stringify(items) }, // Truyền dữ liệu qua query parameter
    });
    };
    };
  
  /**###################xử lý sự kiện web */
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };
  const settingsMain = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    appendDots: (dots) => (
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          textAlign: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          {dots}
        </div>
      </div>
    ),
    customPaging: (i, current) => (
      <div
        className={current === i ? "active-tab" : ""}
        onClick={() => {
          slider1Ref.current.slickGoTo(i);
        }}
        style={{
          width: "30px",
          height: "30px",
          backgroundColor: "#FFFFFF",
          margin: "0 5px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          cursor: "pointer",
        }}
      >
        <span>{i + 1}</span>
      </div>
    ),
  };

  const CustomSliderArrows = ({ onClickPrev, onClickNext }) => (
    <>
      <div
        onClick={() => {
          onClickPrev();
        }}
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          transform: "translateY(-50%)",
          cursor: "pointer",
          backgroundColor: "#ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Trước
      </div>
      <div
        onClick={() => {
          onClickNext();
        }}
        style={{
          position: "absolute",
          top: "50%",
          right: 0,
          transform: "translateY(-50%)",
          cursor: "pointer",
          backgroundColor: "#ccc",
          padding: "10px",
          borderRadius: "5px",
        }}
      >
        Tiếp
      </div>
    </>
  );

  settingsMain.prevArrow = (
    <CustomSliderArrows
      onClickPrev={() => slider1Ref.current.slickPrev()}
      onClickNext={() => slider1Ref.current.slickNext()}
    />
  );
  settingsMain.nextArrow = (
    <CustomSliderArrows
      onClickPrev={() => slider1Ref.current.slickPrev()}
      onClickNext={() => slider1Ref.current.slickNext()}
    />
  );
  const isSessionActive = useSelector((state) => state.Session.isSessionActive);
  const token = useSelector((state) => state.Session.decodedToken);
  const [modal_backdrop, setmodal_backdrop] = useState(false);

  function tog_backdrop() {
    // Mở modal
    setmodal_backdrop(true);
  
    // Đặt hẹn giờ để tắt modal sau 1 giây
    setTimeout(() => {
      setmodal_backdrop(false);
    }, 1500);
  }
  const handleAddToCart = async() => {
    await dispatch(startSession());
    if (productDetails.stock > 0) {
      if (isSessionActive) {
        const productToAdd = {
          userId: token.userId,
          productId: productDetails._id,
          quantity: qty
        };
        await dispatch(onAddNewCart(productToAdd));
        await dispatch(onGetCustomerById(token.userId));
        tog_backdrop();
      }
      else {
        router.push('/login');
      }
    };
  };

  
  return (
    <>
      <div className="shop-details-area pt-120 pb-120">
        <div className="container">
          <div className="row">
            <div className="col-xxl-6 col-xl-6 col-lg-5 col-12">
              <Slider
                {...settingsMain}
                ref={slider1Ref}
                className="main-slider"
              >
                {productDetails &&
                  productDetails.images &&
                  productDetails.images.map((image, i) => (
                    <div key={i}>
                      <img
                        src={image.url}
                        alt={productDetails.name}
                        style={{
                          border: "2px solid #000000",
                          maxWidth: "100%",
                          display: "block",
                          margin: "0 auto",
                          marginBottom: "30px",
                        }}
                      />
                    </div>
                  ))}
              </Slider>
              <div style={{ margin: "15px 0" }}></div>
              {/*<Slider
                asNavFor={slider1Ref.current}
                ref={slider2Ref}
                {...settingsThumb}
                className="hm-product-img-slider hm-product-slider"
                style={{ border: "2px solid #000000", padding: "10px" }}
              >
                {productDetails?.images?.length > 0 &&
                  productDetails.images.map((image, i) => (
                    <div key={i} style={{ marginRight: "9  0px" }}>
                      <img
                        src={image.url}
                        alt={productDetails.name}
                        style={{ maxWidth: "100%" }}
                      />
                    </div>
                  ))}
                  </Slider>*/}
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-7 col-12">
              <div className="product-details-content">
                <div className="product-top mb-10">
                  <div className="product-tag">
                    <a href="#">Security, CCTV</a>
                  </div>
                  {/*<div className="product-rating mr-5">
                    <a href="#">
                      <i className="fas fa-star"></i>
                    </a>
                    <a href="#">
                      <i className="fas fa-star"></i>
                    </a>
                    <a href="#">
                      <i className="fas fa-star-half-alt"></i>
                    </a>
                  </div>
                  <div className="product-reviews">
                    <a href="#">10 reviews</a>
                  </div>*/}
                </div>
                {productDetails && productDetails.name && (
                  <h3 className="product-details-title mb-20">{productDetails.name}</h3>
                )}
                <div>
              
                <h4 style={{ color: productDetails.stock === 0 ? 'red' : 'green' }}>
                  {productDetails.stock === 0 ? 'Hết hàng' : `${productDetails.stock} sản phẩm có sẵn`}
                </h4>
              
                </div>
                <div className="product-price mb-30">
                  {productDetails?.price !== undefined ? (
                    productDetails.discount > 0 || productDetails.discount !== "" ? (
                      <>
                        <span >
                          <del>
                            {new Intl.NumberFormat().format(productDetails.price)} đ
                          </del>
                        </span>
                        <h3 >
                          {new Intl.NumberFormat().format(
                            productDetails.newPrice
                          )}{" "}
                          đ
                        </h3>
                      </>
                    ) : (
                      <span className="new-price hm-actual-price">
                        {new Intl.NumberFormat().format(productDetails.price)} đ
                      </span>
                    )
                  ) : (
                    <span>Giá không có sẵn</span>
                  )}
                </div>
                <div className="product-quantity-wapper mb-40">
                  <form onSubmit={(e) => e.preventDefault()}>
                    <span>
                      <button onClick = {handleDecrease} style={{ padding: '8px 12px' ,fontSize: '16px',marginRight: '8px',backgroundColor: '#ffffff', color: '#000000', colorborder: '#000000',borderRadius: '4px',cursor: 'pointer',}}> - </button>
                        <input
                          
                          type="number"
                          placeholder="1"
                          value={qty}
                          onChange={handleChangeQty}
                        />
                        <button onClick = {handleIncrease} style={{ padding: '8px 12px' ,fontSize: '16px',marginLeft: '8px',backgroundColor: '#ffffff', color: '#000000', colorborder: '#000000',borderRadius: '4px',cursor: 'pointer',}}> + </button>
                    </span>

                    {/*<a className="heart-icon f-left" href="#">
                      <i className="fal fa-heart"></i>
                </a>*/}
                  </form>
                  
                  <div>
                    <button
                      className="tp-btn product-quantity-button"
                      onClick={handleAddToCart}
                    >
                      <i className="fal fa-shopping-basket"></i> Thêm vào giỏ hàng
                    </button>
                    <button
                      className="tp-btn product-quantity-button btn-length"
                      onClick={handleBuyNow}
                      style={{
                        marginLeft: "10px", // Thêm khoảng cách giữa hai nút (có thể điều chỉnh giá trị theo ý muốn)
                        marginTop: "10px",
                      }}
                    >
                      <i></i> Mua ngay
                    </button>
                  </div>

                </div>
                <div className="product-details-meta">
                  <div className="categories mb-5">
                    <span>Danh mục:</span>{" "}
                    {productDetails && productDetails.category && <span>{productDetails.category.name}</span>}
                  </div>
                  <div className="tag mb-25">
                    <span>Thương hiệu:</span>{" "}
                    {productDetails && productDetails.brand && <span>{productDetails.brand.name}</span>}
                  </div>
                </div>
                {/*<div className="product-details-share">
                  <span>Share:</span>
                  <Link href="#">
                    <i className="fab fa-facebook-f"></i>
                  </Link>
                  <Link href="#">
                    <i className="fab fa-twitter"></i>
                  </Link>
                  <Link href="#">
                    <i className="fab fa-behance"></i>
                  </Link>
                  <Link href="#">
                    <i className="fab fa-youtube"></i>
                  </Link>
                  <Link href="#">
                    <i className="fab fa-linkedin-in"></i>
                  </Link>
                    </div>*/}
              </div>
            </div>
          </div>
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
              <h4 className="mb-3">Sản phẩm đã được thêm vào giỏ hàng!</h4>
              <div className="hstack gap-2 justify-content-center">
                <button
                  to="/cart" // Đường dẫn đến trang giỏ hàng
                  className="btn btn-success"
                  onClick={() => {
                    setmodal_backdrop(false);
                    router.push("/cart");
                  }}
                >
                  Đến giỏ hàng
                </button>
              </div>
            </div>
          </ModalBody>
        </Modal>
        </div>
      </div>

      <div className="product-additional-info pb-110">
        <div className="container">
          <div className="row">
            <div className="col-xl-12">
              <div className="product-additional-tab">
                <ul className="nav nav-tabs" id="myTabs" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-links active"
                      id="home-tab-1"
                      data-bs-toggle="tab"
                      data-bs-target="#home-1"
                      type="button"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Mô tả sản phẩm
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-links"
                      id="Additional-Information-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#Additional-Information"
                      type="button"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Chi tiết sản phẩm
                    </button>
                  </li>
                </ul>
                <div className="tab-content tp-content-tab" id="myTabContent-2">
                  <div
                    className="tab-pane fade show active"
                    id="home-1"
                    role="tabpanel"
                    aria-labelledby="home-tab-1"
                  >
                    <div>
                      {productDetails && productDetails.description ? (
                        <div
                          dangerouslySetInnerHTML={{ __html: productDetails.description }}
                        />
                      ) : (
                        <div>Mô tả không có sẵn.</div>
                      )}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="Additional-Information"
                    role="tabpanel"
                    aria-labelledby="Additional-Information-tab"
                  >
                    <div className="product__details-info table-responsive">
                      {productDetails && productDetails.specification ? (
                        <div
                          dangerouslySetInnerHTML={{
                            __html: productDetails.specification,
                          }}
                        />
                      ) : (
                        <div>Specification not available</div>
                      )}
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="Reviews"
                    role="tabpanel"
                    aria-labelledby="Reviews-tab"
                  >
                    <div className="product-details-review">
                      <h3 className="comments-title mb-35">
                        3 reviews for “Wide Cotton Tunic extreme hammer”
                      </h3>
                      <div className="latest-comments">
                        <ul>
                          <li>
                            <div className="comments-box d-flex">
                              <div className="comments-avatar mr-10">
                                <img
                                  src="/assets/img/testimonial/test2.png"
                                  alt="theme-pure"
                                />
                              </div>
                              <div className="comments-text">
                                <div className="comments-top d-sm-flex align-items-start justify-content-between mb-5">
                                  <div className="avatar-name">
                                    <h5>Farhan Firoz</h5>
                                    <div className="comments-date">
                                      <span>March 27, 2018 9:51 am</span>
                                    </div>
                                  </div>
                                  <div className="user-rating">
                                    <ul>
                                      <li>
                                        <a href="#">
                                          <i className="fas fa-star"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fas fa-star"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fas fa-star"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fas fa-star"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fal fa-star"></i>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <p className="m-0">
                                  This is cardigan is a comfortable warm classic
                                  piece. Great to layer with a light top and you
                                  can dress up or down given the jewel buttons.
                                  I’m 5’8” 128lbs a 34A and the Small fit fine.
                                </p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="comments-box d-flex">
                              <div className="comments-avatar mr-10">
                                <img
                                  src="/assets/img/testimonial/test1.png"
                                  alt="theme-pure"
                                />
                              </div>
                              <div className="comments-text">
                                <div className="comments-top d-sm-flex align-items-start justify-content-between mb-5">
                                  <div className="avatar-name">
                                    <h5>Farhan Firoz</h5>
                                    <div className="comments-date">
                                      <span>March 27, 2018 9:51 am</span>
                                    </div>
                                  </div>
                                  <div className="user-rating">
                                    <ul>
                                      <li>
                                        <a href="#">
                                          <i className="fas fa-star"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fas fa-star"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fas fa-star"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fas fa-star"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fal fa-star"></i>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <p className="m-0">
                                  This is cardigan is a comfortable warm classic
                                  piece. Great to layer with a light top and you
                                  can dress up or down given the jewel buttons.
                                  I’m 5’8” 128lbs a 34A and the Small fit fine.
                                </p>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="comments-box d-flex">
                              <div className="comments-avatar mr-10">
                                <img
                                  src="/assets/img/testimonial/test3.png"
                                  alt="theme-pure"
                                />
                              </div>
                              <div className="comments-text">
                                <div className="comments-top d-sm-flex align-items-start justify-content-between mb-5">
                                  <div className="avatar-name">
                                    <h5>Farhan Firoz</h5>
                                    <div className="comments-date">
                                      <span>March 27, 2018 9:51 am</span>
                                    </div>
                                  </div>
                                  <div className="user-rating">
                                    <ul>
                                      <li>
                                        <a href="#">
                                          <i className="fas fa-star"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fas fa-star"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fas fa-star"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fas fa-star"></i>
                                        </a>
                                      </li>
                                      <li>
                                        <a href="#">
                                          <i className="fal fa-star"></i>
                                        </a>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                                <p className="m-0">
                                  This is cardigan is a comfortable warm classic
                                  piece. Great to layer with a light top and you
                                  can dress up or down given the jewel buttons.
                                  I’m 5’8” 128lbs a 34A and the Small fit fine.
                                </p>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="product-details-comment pb-100">
                        <div className="comment-title mb-20">
                          <h3>Add a review</h3>
                          <p>
                            Your email address will not be published. Required
                            fields are marked*
                          </p>
                        </div>
                        <div className="comment-rating mb-20 d-flex">
                          <span>Overall ratings</span>
                          <ul>
                            <li>
                              <a href="#">
                                <i className="fas fa-star"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fas fa-star"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fas fa-star"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fas fa-star"></i>
                              </a>
                            </li>
                            <li>
                              <a href="#">
                                <i className="fal fa-star"></i>
                              </a>
                            </li>
                          </ul>
                        </div>
                        <div className="comment-input-box">
                          <Review />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="Chart"
                    role="tabpanel"
                    aria-labelledby="Size-Chart-tab"
                  >
                    {/* <div className="product-size-wrapper fix">
                      <div className="product-details-size-table table-responsive">
                        <table className="table text-center">
                          <thead>
                            <tr>
                              <th>Size (US)</th>
                              <th>Chest</th>
                              <th>Neck</th>
                              <th>Waist</th>
                              <th>Arm Length</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>X</td>
                              <td>32-34</td>
                              <td>13-13.5 </td>
                              <td>26-28</td>
                              <td>31-32</td>
                            </tr>
                            <tr>
                              <td>S</td>
                              <td>35-37</td>
                              <td>14-14.5</td>
                              <td>29-31</td>
                              <td>32-33</td>
                            </tr>
                            <tr>
                              <td>M</td>
                              <td>38-40</td>
                              <td>15-15.5</td>
                              <td>32-34</td>
                              <td>33-34</td>
                            </tr>
                            <tr>
                              <td>L</td>
                              <td>41-43</td>
                              <td>16-16.5</td>
                              <td>35-37</td>
                              <td>34-35</td>
                            </tr>
                            <tr>
                              <td>XL</td>
                              <td>44-46</td>
                              <td>17-17.5</td>
                              <td>38-40</td>
                              <td>35-36</td>
                            </tr>
                            <tr>
                              <td>XXL</td>
                              <td>47-49</td>
                              <td> 18-18.5</td>
                              <td>41-43</td>
                              <td>36-37</td>
                            </tr>
                            <tr>
                              <td>XXXL</td>
                              <td>50-52</td>
                              <td>18-18.5</td>
                              <td>44-45</td>
                              <td>36-37</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="tp-shop-details-product-area grey-bg pt-120 pb-90">
        <div className="container">
        </div>
      </div>
    </>
  );
};

export default ShopDetailsArea;
