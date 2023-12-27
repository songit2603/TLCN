import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { logoutUser,endSession} from "../../slices/thunks";
import Link from 'next/link'
//import images
import { createSelector } from "reselect";
const avatar = {
  img2:"/assets/img/users/avatar-2.jpg"
}

const ProfileDropdown = () => {
  const dispatch = useDispatch();
  const handleLogoutClick = () => {
    // Xử lý logic đăng xuất ở đây
    // Ví dụ: Đặt trạng thái đăng nhập về false hoặc thực hiện các hoạt động đăng xuất khác
    dispatch(logoutUser());
    dispatch(endSession());
  };

  const profiledropdownData = createSelector(
    (state) => state.Profile.user,
    (user) => user
  );
  // Inside your component
  const user = useSelector(profiledropdownData);

  const [userName, setUserName] = useState("Admin");

  useEffect(() => {
    const obj = JSON.parse(sessionStorage.getItem("authUser"));
    if (sessionStorage.getItem("authUser")) {
      setUserName(
        process.env.NEXT_PUBLIC_REACT_APP_DEFAULTAUTH === "fake"
          ? obj.username === undefined
            ? user.name
              ? user.name
              : obj.data.name
            : "Admin" || "Admin"
          : process.env.NEXT_PUBLIC_REACT_APP_DEFAULTAUTH === "firebase"
          ? obj.email && obj.email
          : "Admin"
      );
    }
  }, [userName, user]);

  //Dropdown Toggle
  const [isProfileDropdown, setIsProfileDropdown] = useState(false);
  const toggleProfileDropdown = () => {
    setIsProfileDropdown(!isProfileDropdown);
  };
  /**=============get user by token */
  const token = useSelector((state) => state.Session.decodedToken);
  return (
    <React.Fragment>
      <Dropdown
        isOpen={isProfileDropdown}
        toggle={toggleProfileDropdown}
        className=""
      >
        <DropdownToggle tag="button" type="button" className="btn">
          <span className="d-flex align-items-center">
            <img
              className="rounded-circle header-profile-user"
              src={avatar.img2}
              alt="Header Avatar"
            />
            <span className="text-start ms-xl-2">
              <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {token.name}
              </span>
              <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                {token.role}
              </span>
            </span>
          </span>
        </DropdownToggle>
        <DropdownMenu className="dropdown-menu-end" style={{ width: "250px" }}>
          <h6 className="dropdown-header">Xin chào {token.name}!</h6>
          <DropdownItem className="dropdown-item p-0">
            <Link href="/profile">
              <span>
                <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>{" "}
                <span className="align-middle">Danh sách đơn hàng</span>
              </span>
            </Link>
          </DropdownItem>
          <div className="dropdown-divider"></div>
          <DropdownItem className="p-0 dropdown-item">
            <span onClick={handleLogoutClick}>
              <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
              <span className="align-middle" data-key="t-logout">
                Đăng xuất
              </span>
            </span>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default ProfileDropdown;