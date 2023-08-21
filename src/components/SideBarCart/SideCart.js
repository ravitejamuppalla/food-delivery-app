import React, { Fragment, useState, useEffect } from "react";
import classes from "./SideCart.module.css";
import { MdCancel } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import { TfiClose } from "react-icons/tfi";
import { BsCurrencyRupee } from "react-icons/bs";
import { productActions } from "../../store/productStore";
import SideCartItem from "./SideCartItem";
import { Link } from "react-router-dom";

function SideCart(props) {
  let cartItems = useSelector((values) => values.product.userDetails.cartitems);
  let dispatch = useDispatch();
  const [isTotalAmount, setIsTotalAmount] = useState(0);
  function closeSideChekout(params) {
    dispatch(productActions.opencartCheckOut());
  }

  useEffect(() => {
    if (cartItems) {
      let totalSum = cartItems.reduce(totalSumCheckout, 0);
      function totalSumCheckout(total, num) {
        return (
          total + Math.round(Number(num.itemCountInCart) * Number(num.amount))
        );
      }
      setIsTotalAmount(totalSum);
    }
  }, [cartItems]);
  console.log(cartItems);

  return (
    <Fragment>
      <section>
        <div className={classes.cart}>
          <div className={classes.cart_container}>
            <button
              className={classes.closeCancelButton}
              onClick={closeSideChekout}
            >
              Close
            </button>

            <div className={classes.cartsection}>
              <div className={classes.cartContainerList}>
                {cartItems &&
                  !(cartItems.length == 0) &&
                  cartItems.map((datavalues) => {
                    return <SideCartItem items={datavalues}></SideCartItem>;
                  })}
                {!cartItems && (
                  <p className={classes.cartIsEmpty}>Your cart is empty..!</p>
                )}
              </div>
              <div className={classes.footersection}>
                <p>
                  SubTotal:{" "}
                  <span>
                    <BsCurrencyRupee></BsCurrencyRupee> {isTotalAmount}
                  </span>
                </p>
                <Link to="/checkout">
                  <button onClick={closeSideChekout}>Check Out</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default SideCart;
