import React, { Fragment, useEffect, useRef, useState } from "react";
import classes from "./Home.module.css";
import heroImage from "../../assets/images/hero.png";
import { AiFillCar } from "react-icons/ai";
import { RiSecurePaymentLine } from "react-icons/ri";
import Category from "./Category";
import Serve from "./Serve";
import useHttp from "../../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../store/productStore";
import PopularFoods from "./PopularFoods";
import TastyThreat from "./TastyThreat";
import Testimonial from "./Testimonial";
import SideCart from "../SideBarCart/SideCart";
import authStore from "../../store/authStore";
import { auth } from "../../Auth/Firsebase";
import { authActions } from "../../store/authStore";

function HomeComp(props) {
  let openCart = useSelector((values) => values.product.openSideCheckout);
  let { isLoading, iserror: error, sendRequest } = useHttp();
  let loginDetails = useSelector((data) => data.authication.currentUser);
  const [isloginDetails, setIsLoaginDetails] = useState();
  console.log(loginDetails);
  let [isAccountPresent, setAccountPresent] = useState("");
  let dispatch = useDispatch();

  function isObjectHasKeys(obj) {
    for (const prop in obj) {
      if (Object.hasOwn(obj, prop)) {
        return true;
      }
    }

    return false;
  }

  // useEffect(() => {
  //   function getProductResponse(dataDetails) {
  //     let newUserItem = {
  //       uid: loginDetails.uid,
  //       cartItems: [],
  //     };
  //     console.log(loginDetails);
  //     console.log(dataDetails);
  //     if (dataDetails) {
  //       console.log(dataDetails);
  //       for (const key in dataDetails) {
  //         if (dataDetails[key].uid === loginDetails.uid) {
  //           console.log("THe UID Value is " + loginDetails.uid);
  //           let newObject = {
  //             ...dataDetails[key],
  //             firebaseKey: key,
  //           };
  //           setAccountPresent(newObject);
  //         }
  //       }
  //       console.log(isAccountPresent.length);
  //       console.log(isObjectHasKeys(loginDetails));
  //       if (isAccountPresent.length == 0 && isObjectHasKeys(loginDetails)) {
  //         console.log("Creating the new Account Data");

  //         //
  //         // getUserDetails();
  //       }

  //       // dispatchProduct(productActions.getProductDetails(dataDetails));
  //     } else {
  //       if (isObjectHasKeys(loginDetails)) {
  //         getUserDetails(newUserItem);
  //       }
  //     }
  //   }
  //   function getUseDetailsList(dataList) {
  //     for (const key in dataList) {
  //       if (dataList[key].uid === loginDetails.uid) {
  //         console.log("THe UID Value is " + loginDetails.uid);
  //         let newObject = {
  //           ...dataList[key],
  //           firebaseKey: key,
  //         };
  //         setAccountPresent(newObject);
  //       }
  //     }
  //   }
  //   async function getUserDetails(params) {
  //     let requestconfig = {
  //       url: "https://learningreact-f5a3c-default-rtdb.firebaseio.com/userItems.json",
  //       method: "POST",
  //       body: JSON.stringify(newUserItem),
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     };
  //     await sendRequest(requestconfig, getUseDetailsList);
  //   }

  //   async function getProductData(params) {
  //     let requestconfig = {
  //       url: "https://learningreact-f5a3c-default-rtdb.firebaseio.com/userItems.json",
  //     };
  //     await sendRequest(requestconfig, getProductResponse);
  //   }
  //   getProductData();
  // }, [loginDetails]);

  // useEffect(() => {
  //   window.addEventListener("scroll", () => {
  //     if (
  //       document.body.scrollTop > 80 ||
  //       document.documentElement.scrollTop > 80
  //     ) {
  //       console.log(headerRef.current);
  //       headerRef.current.classList.add(classes.header__shrink);
  //     } else {
  //       console.log(headerRef.current);
  //       headerRef.current.classList.remove(classes.header__shrink);
  //     }
  //   });

  //   return () => window.removeEventListener("scroll");
  // }, []);

  return (
    <Fragment>
      <div className={classes.Home}>
        <div className={classes.Home_container}>
          <div className={classes.HomeRow}>
            <div className={classes.row1}>
              <p className={classes.Heading}>Easy Way to make an Order</p>
              <h1>
                <span>Hungry ?</span> Just wait food at <span>your door</span>
              </h1>
              <p className={classes.headingdetails}>
                Launched in 2010, Our technology platform connects customers,
                restaurant partners and delivery partners, serving their
                multiple needs. Customers use our platform to search and
                discover restaurants, read and write customer generated reviews
                and view and upload photos, order food delivery, book a table
                and make payments while dining-out at restaurants. On the other
                hand, we provide restaurant partners with industry-specific
                marketing tools which enable them to engage and acquire
                customers to grow their business while also providing a reliable
                and efficient last mile delivery service. We also operate a
                one-stop procurement solution, Hyperpure, which supplies high
                quality ingredients and kitchen products to restaurant partners.
                We also provide our delivery partners with transparent and
                flexible earning opportunities.
              </p>
              <div className={classes.buttonOrders}>
                <button className={classes.OrderNowButton}>
                  Order Now{" "}
                  <ion-icon
                    className={classes.rightArrow}
                    name="chevron-forward-outline"
                  ></ion-icon>
                </button>
                <button>See all foods</button>
              </div>
              <div className={classes.homeFooter}>
                <div>
                  <AiFillCar className={classes.sideicons}></AiFillCar>
                  <p>No shipping charges</p>
                </div>
                <div>
                  <RiSecurePaymentLine
                    className={classes.sideicons}
                  ></RiSecurePaymentLine>
                  <p>100% secure checkout </p>
                </div>
              </div>
            </div>
            <div className={classes.HomeImgRow}>
              <img src={heroImage}></img>
            </div>
          </div>
        </div>
        <Category></Category>
        <Serve></Serve>
        <PopularFoods></PopularFoods>
        <TastyThreat></TastyThreat>
        <Testimonial></Testimonial>
      </div>
    </Fragment>
  );
}

export default HomeComp;
