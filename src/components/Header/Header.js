import React, { Fragment, useRef, useState } from "react";
import "./Header.css";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/res-logo.png";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { HiMenu } from "react-icons/hi";
import { useSelector, useDispatch } from "react-redux";
import { productActions } from "../../store/productStore";
import { HiUser } from "react-icons/hi";
import { logoutToAccount } from "../../store/authStore";
import { SucessMessageTroster } from "../../utils/UtilsFunction";
import SideCart from "../SideBarCart/SideCart";

function Header(props) {
  const [isprofileDetails, setProfileDetails] = useState(false);
  let menuRef = useRef();
  let dispatch = useDispatch();
  let countOfTotalItems = useSelector(
    (values) => values.product.userDetails.cartTotalQuantity
  );
  let loginDetails = useSelector((data) => data.authication.currentUser);
  let openCart = useSelector((values) => values.product.openSideCheckout);

  let togglemenu = () => {
    menuRef.current.classList.toggle("show__menu");
  };
  let sidebarcontent;
  function opensideNavbar(event) {
    let classname = event.className;
    console.log(classname);
    console.log(event.target);
    console.log(event.target.class);
  }
  function openprofiledetails(params) {
    setProfileDetails(!isprofileDetails);
  }

  function openSideCheckOutHandler(params) {
    dispatch(productActions.opencartCheckOut());
  }

  function logoutFromApplication(params) {
    dispatch(logoutToAccount());
    SucessMessageTroster("Signed out of Sucessfully", 1000);
  }
  console.log(loginDetails.uid);
  return (
    <div className="HeaderDetails">
      <div className="header-container">
        <div className="logo">
          <img src={logo} alt="Res log"></img>
          <span>RT Foods</span>
        </div>
        <div className="NavigationBar" ref={menuRef} onClick={togglemenu}>
          <div className="menu">
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Home
            </NavLink>
            <NavLink
              to="/foods"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Foods
            </NavLink>
            <NavLink
              to="/cart"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Cart
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              Contact
            </NavLink>
          </div>
        </div>
        <div className="cart-MenuIcon">
          <div className="cartIcon">
            <div className="cart_Section" onClick={openSideCheckOutHandler}>
              <HiOutlineShoppingCart className="cartIconElement"></HiOutlineShoppingCart>
              <span className="cartQuanity">{countOfTotalItems}</span>
            </div>
            {!loginDetails.uid && (
              <Fragment>
                <Link to="/login">
                  <button className="loginButton">Log in</button>
                </Link>
                <Link to="/register">
                  <button className="signUpButton">Sign up</button>
                </Link>
              </Fragment>
            )}
            {loginDetails.uid && loginDetails.uid.length > 0 && (
              <Fragment>
                <div className="sucesslogin" onClick={openprofiledetails}>
                  <span className="UserName">
                    {loginDetails.email.split("")[0].toUpperCase()}
                  </span>
                  {isprofileDetails && (
                    <div className="userprofile">
                      <ul className="userProfile_List">
                        <li>Profile</li>
                        <Link to="/orders">
                          <li>Orders</li>
                        </Link>
                        <li>Settings</li>
                        <li onClick={logoutFromApplication}>Logout</li>
                      </ul>
                    </div>
                  )}
                </div>
              </Fragment>
            )}
          </div>
          <div className="mobile-menu">
            <HiMenu className="menu-Icon" onClick={togglemenu}></HiMenu>
          </div>
        </div>
        {openCart && <SideCart></SideCart>}
      </div>
    </div>
  );
}

export default Header;
