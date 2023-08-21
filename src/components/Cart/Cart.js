import React, { Fragment, useEffect, useState } from "react";
import classes from "./Cart.module.css";
import { MdDeleteForever } from "react-icons/md";
import { TfiClose } from "react-icons/tfi";
import { BsCurrencyRupee } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { productActions } from "../../store/productStore";
function Cart(props) {
  let dispatch = useDispatch();
  let cartItems = useSelector((data) => data.product.userDetails.cartitems);
  const [isErrorPresent, setIsErrorPresent] = useState(false);
  const [isCartItemsData, setIsCartItems] = useState();
  const [isTotalAmount, setIsTotalAmount] = useState(0);
  console.log(cartItems);

  useEffect(() => {
    if (cartItems) {
      let totalSum = cartItems.reduce(totalSumCheckout, 0);
      function totalSumCheckout(total, num) {
        return (
          total + Math.round(Number(num.itemCountInCart) * Number(num.amount))
        );
      }
      setIsTotalAmount(totalSum);
    } else {
      setIsErrorPresent(true);
    }
  }, [cartItems]);

  function deleteCartItemHandler(event) {
    let objectDetails = cartItems.find((data) => {
      return data.id.includes(event.target.id);
    });

    dispatch(productActions.removeTotalItem(objectDetails));
  }

  return (
    <section>
      <div className={classes.cartSection}>Cart</div>
      <div className={classes.cartDetails}>
        {cartItems && !(cartItems.length == 0) && (
          <table>
            <tr>
              <th>Image</th>
              <th>Product Title</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Delete</th>
            </tr>
            {cartItems.map((cartList, index) => {
              return (
                <Fragment key={index}>
                  <tr>
                    <td className={classes.imageColumn}>
                      <img src={cartList.image1}></img>
                    </td>
                    <td className={classes.cartProductName}>{cartList.name}</td>
                    <td className={classes.cartAmount}>
                      <div className={classes.amountValue}>
                        {" "}
                        <BsCurrencyRupee
                          className={classes.rupeeCurrency}
                        ></BsCurrencyRupee>{" "}
                        <p>{cartList.amount}</p>
                      </div>
                    </td>
                    <td className={classes.cartQuantity}>
                      {cartList.itemCountInCart} pX
                    </td>
                    <td>
                      <MdDeleteForever
                        className={classes.deleteIcon}
                        onClick={deleteCartItemHandler}
                        id={cartList.id}
                      ></MdDeleteForever>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </table>
        )}
        {Number(isTotalAmount) == 0 && (
          <p className={classes.emptyCart}>No Items In cart ..!</p>
        )}
        <div className={classes.subtotal}>
          <div className={classes.totalDetails}>
            <p>Subtotal: $</p>
            <span>{isTotalAmount}</span>
          </div>
          <h5>Taxes will shipping will calculate at checkout </h5>
          <div className={classes.buttons}>
            <button>
              <Link to="/foods">Continue Shopping</Link>
            </button>
            <Link to="/checkout">
              <button disabled={cartItems && cartItems.length == 0}>
                Proceed to checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Cart;
