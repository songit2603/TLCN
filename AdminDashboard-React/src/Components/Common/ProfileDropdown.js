import React, { useState, useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { logoutUser,endSession} from "../../slices/thunks";
//import images
import avatar1 from "../../assets/images/users/avatar-1.jpg";
import { createSelector } from 'reselect';

const ProfileDropdown = () => {

    const dispatch = useDispatch();
    const handleLogoutClick = () => {
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
            setUserName(process.env.REACT_APP_DEFAULTAUTH === "fake" ? obj.username === undefined ? user.name ? user.name : obj.data.name : "Admin" || "Admin" :
                process.env.REACT_APP_DEFAULTAUTH === "firebase" ? obj.email && obj.email : "Admin"
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
          className="ms-sm-3 header-item topbar-user"
        >
          <DropdownToggle tag="button" type="button" className="btn">
            <span className="d-flex align-items-center">
              <img
                className="rounded-circle header-profile-user"
                src={avatar1}
                alt="Header Avatar"
              />
              <span className="text-start ms-xl-2">
                <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">
                {token ? token.name : ''}
                </span>
                <span className="d-none d-xl-block ms-1 fs-12 text-muted user-name-sub-text">
                {token ? token.role : ''}
                </span>
              </span>
            </span>
          </DropdownToggle>
          <DropdownMenu className="dropdown-menu-end">
            <h6 className="dropdown-header">Welcome {token ? token.name : ''}!</h6>
            {/*<DropdownItem className="p-0">
              <Link
                to={process.env.PUBLIC_URL + "/profile"}
                className="dropdown-item"
              >
                <i className="mdi mdi-account-circle text-muted fs-16 align-middle me-1"></i>
                <span className="align-middle">Profile</span>
              </Link>
            </DropdownItem>
            <DropdownItem className="p-0">
              <Link
                to={process.env.PUBLIC_URL + "/apps-chat"}
                className="dropdown-item"
              >
                <i className="mdi mdi-message-text-outline text-muted fs-16 align-middle me-1"></i>{" "}
                <span className="align-middle">Messages</span>
              </Link>
            </DropdownItem>
            <DropdownItem className="p-0">
              <Link to={"#"} className="dropdown-item">
                <i className="mdi mdi-calendar-check-outline text-muted fs-16 align-middle me-1"></i>{" "}
                <span className="align-middle">Taskboard</span>
              </Link>
            </DropdownItem>
            <DropdownItem className="p-0">
              <Link
                to={process.env.PUBLIC_URL + "/pages-faqs"}
                className="dropdown-item"
              >
                <i className="mdi mdi-lifebuoy text-muted fs-16 align-middle me-1"></i>{" "}
                <span className="align-middle">Help</span>
              </Link>
            </DropdownItem>
            <div className="dropdown-divider"></div>
            <DropdownItem className="p-0">
              <Link
                to={process.env.PUBLIC_URL + "/pages-profile"}
                className="dropdown-item"
              >
                <i className="mdi mdi-wallet text-muted fs-16 align-middle me-1"></i>{" "}
                <span className="align-middle">
                  Balance : <b>$5971.67</b>
                </span>
              </Link>
            </DropdownItem>
            <DropdownItem className="p-0">
              <Link
                to={process.env.PUBLIC_URL + "/pages-profile-settings"}
                className="dropdown-item"
              >
                <span className="badge bg-success-subtle text-success mt-1 float-end">
                  New
                </span>
                <i className="mdi mdi-cog-outline text-muted fs-16 align-middle me-1"></i>{" "}
                <span className="align-middle">Settings</span>
              </Link>
            </DropdownItem>
            <DropdownItem className="p-0">
              <Link
                to={process.env.PUBLIC_URL + "/auth-lockscreen-basic"}
                className="dropdown-item"
              >
                <i className="mdi mdi-lock text-muted fs-16 align-middle me-1"></i>{" "}
                <span className="align-middle">Lock screen</span>
              </Link>
            </DropdownItem>*/}
            <DropdownItem className="p-0">
              <Link
                to={process.env.PUBLIC_URL + "/logout"}
                onClick={handleLogoutClick}
                className="dropdown-item"
              >
                <i className="mdi mdi-logout text-muted fs-16 align-middle me-1"></i>{" "}
                <span className="align-middle" data-key="t-logout">
                  Đăng xuất
                </span>
              </Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </React.Fragment>
    );
};

export default ProfileDropdown;