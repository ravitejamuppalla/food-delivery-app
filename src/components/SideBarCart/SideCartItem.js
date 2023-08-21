import React, { Fragment } from "react";
import classes from "./SideCart.module.css";
import { TfiClose } from "react-icons/tfi";
import { BsCurrencyRupee } from "react-icons/bs";
import { productActions } from "../../store/productStore";
import { useDispatch } from "react-redux";

function SideCartItem(props) {
  let dispatch = useDispatch();
  let datavalues = props.items;
  function IncreaseItemHandler(event) {
    dispatch(productActions.addToCart(datavalues));
  }

  function decreaseItemHandler(event) {
    dispatch(productActions.removeItem(datavalues));
  }

  function removeTotalIteamFromCart(event) {
    dispatch(productActions.removeTotalItem(datavalues));
  }
  return (
    <Fragment>
      <div className={classes.cartContiner} key={datavalues.id}>
        <div className={classes.cartItem}>
          <img src={datavalues.image1}></img>
          <div className={classes.cartCount}>
            <p>{datavalues.name}</p>
            <div className={classes.countOfItems}>
              <span>
                {datavalues.itemCountInCart}{" "}
                <TfiClose className={classes.close}></TfiClose>
              </span>
              <span className={classes.totalEachCount}>
                <BsCurrencyRupee></BsCurrencyRupee>{" "}
                {Number(datavalues.itemCountInCart) * Number(datavalues.amount)}
              </span>
            </div>
            <div className={classes.countButton}>
              <button onClick={IncreaseItemHandler} id={datavalues.id}>
                +
              </button>
              <span>{datavalues.itemCountInCart}</span>
              <button onClick={decreaseItemHandler} id={datavalues.id}>
                -
              </button>
            </div>
          </div>
        </div>
        <TfiClose
          className={classes.close}
          onClick={removeTotalIteamFromCart}
          id={datavalues.id}
        ></TfiClose>
      </div>
    </Fragment>
  );
}

export default SideCartItem;
