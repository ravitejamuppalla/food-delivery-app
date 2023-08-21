import RoutersPath from "../../routers/RoutersPath";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import React, { Fragment, useEffect, useRef, useState } from "react";
import useHttp from "../../hooks/useHttp";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../store/productStore";
import SideCart from "../SideBarCart/SideCart";
import authStore from "../../store/authStore";
import { ToastContainer, toast } from "react-toastify";
import { auth } from "../../Auth/Firsebase";
import { authActions } from "../../store/authStore";
import { updateItemsToCart } from "../../store/productStore";
let intialState = true;
let secondIntialState = true;
function Layout(props) {
  let { isLoading, iserror: error, sendRequest } = useHttp();
  const dispatch = useDispatch();
  let userDetailsUpdate = useSelector((data) => data.product.userDetails);
  let updateDatabase = useSelector((data) => data.product.updateDataBaseList);
  let isloggedOutFunc = useSelector((data) => data.authication.isLoggedOut);
  let updatedProductList = useSelector((data) => data.product.productList);
  const [isUID, setUID] = useState("");

  function getProductResponse(dataDetails) {
    console.log(dataDetails);
    if (dataDetails) {
      dispatch(productActions.getProductDetails(dataDetails));
    }
  }
  useEffect(() => {
    async function getProductData(params) {
      let requestconfig = {
        url: "https://learningreact-f5a3c-default-rtdb.firebaseio.com/foodproducts.json",
      };
      await sendRequest(requestconfig, getProductResponse);
    }
    getProductData();
  }, []);

  let loginDetails = useSelector((data) => data.authication.currentUser);
  console.log(loginDetails);

  useEffect(() => {
    // console.log(auth);
    // console.log(secondIntialState);
    // if (!secondIntialState) {
    //   console.log("Entering the if condition");
    //   secondIntialState = false;
    //   return;
    // }
    console.log(auth.currentUser);
    console.log(!isloggedOutFunc);

    // if (auth.currentUser) {
    console.log("THe final Valiues");
    auth.onAuthStateChanged(async (value) => {
      console.log(value);
      if (!value) return;
      let newObject = {
        name: value.displayName,
        email: value.email,
        uid: value.uid,
      };
      dispatch(authActions.signUpUser(newObject));

      let response = await fetch(
        "https://learningreact-f5a3c-default-rtdb.firebaseio.com/userProfieDetails.json"
      );

      if (!response.ok) {
        throw new Error("Failed to Load the request");
      }
      let responseData = await response.json();
      let isproductDetailsPresent = null;
      console.log(responseData);
      for (const key in responseData) {
        console.log(responseData[key].uid);
        console.log(value.uid);

        if (
          responseData[key].uid &&
          responseData[key].uid.includes(value.uid)
        ) {
          isproductDetailsPresent = {
            ...responseData[key],
            fireBaseProfileID: key,
          };
        }
      }

      dispatch(productActions.addUserDataDetails(isproductDetailsPresent));
    });
    // }
  }, [auth]);

  useEffect(() => {
    if (intialState) {
      intialState = false;
      return;
    }
    console.log(updateDatabase);
    if (updateDatabase) dispatch(updateItemsToCart(userDetailsUpdate));
  }, [userDetailsUpdate, dispatch]);

  return (
    <Fragment>
      <Header getUUID={isUID}></Header>
      <RoutersPath></RoutersPath>
      <Footer></Footer>
      <ToastContainer />
    </Fragment>
  );
}

export default Layout;
