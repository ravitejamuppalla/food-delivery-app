import React, { Fragment, useEffect, useState } from "react";
import classes from "./ReviewDetails.module.css";
import { FcOk } from "react-icons/fc";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { productActions } from "../../store/productStore";
function SuccessMessage(props) {
  const [sucessMessageData, setSucessMessage] = useState(false);
  let dispatch = useDispatch();
  let addressDetails = useSelector(
    (data) => data.product.userDetails.prefferedAddress
  );
  let cartItems = useSelector((data) => data.product.userDetails.cartitems);
  useEffect(() => {}, [addressDetails]);
  console.log(cartItems);

  function makeThePaymentHandler(event) {
    console.log(cartItems);
    setSucessMessage(true);
    dispatch(productActions.addItemsToPastOrder([cartItems]));
    dispatch(productActions.clearCartItems());
  }
  return (
    <Fragment>
      <div className={classes.reviewDetails}>
        <div className={classes.containerDetails}>
          {!sucessMessageData && (
            <div className={classes.AddressDtails}>
              <p>Selected Address</p>
              <p>{addressDetails}</p>
              <div className={classes.buttonsChanges}>
                <Link to="/checkout">
                  <button>Edit Address</button>
                </Link>
                <button onClick={makeThePaymentHandler}>Make PayMent</button>
              </div>
            </div>
          )}
          {sucessMessageData && (
            <Fragment>
              <div className={classes.SuccessMessage_Container}>
                <div className={classes.successMessage}>
                  <FcOk className={classes.okbutton}></FcOk>
                  <p>Thank you for your order!</p>
                </div>

                <span>
                  Your order is being processed and will be delivered as fast as
                  possible.
                </span>
                <Link to="/foods">
                  {" "}
                  <p className={classes.onemoreorder}>
                    What to Order one more?
                  </p>
                </Link>
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default SuccessMessage;
