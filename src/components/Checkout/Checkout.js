import React, { useEffect, useState, useRef, Fragment } from "react";
import classes from "./Checkout.module.css";
import { BsCurrencyRupee } from "react-icons/bs";
import { useSelector } from "react-redux";
import { AiFillPlusCircle } from "react-icons/ai";
import { TfiClose } from "react-icons/tfi";
import { useDispatch } from "react-redux";
import productStore from "../../store/productStore";
import { productActions } from "../../store/productStore";
import { Link } from "react-router-dom";
function Checkout(props) {
  let dispatch = useDispatch();
  let address1Input = useRef();
  let address2Input = useRef();
  let lankmarkInput = useRef();
  let phoneNumberInput = useRef();
  let countryInput = useRef();
  let cityInput = useRef();
  let zipCodeInput = useRef();
  let cartItems = useSelector((data) => data.product.userDetails.cartitems);
  let [totalItems, setTotalItems] = useState(0);
  const [addNewAddressEnable, setAddNewAddress] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedAddressPrev, setAddressPrev] = useState();
  const [addressData, setAddressData] = useState("");
  const addressListData = useSelector(
    (data) => data.product.userDetails.addressList
  );

  function onChange(i) {
    setSelected((prev) => (i === prev ? null : i));
  }

  useEffect(() => {
    setAddressPrev(addressData[selected]);
    dispatch(productActions.addSelectedAddress(addressData[selected]));
  }, [selected, addressData]);

  function addNewAddressHandler(params) {
    setAddNewAddress(true);
  }
  function closeAddressDetails(params) {
    setAddNewAddress(false);
  }
  useEffect(() => {
    if (cartItems) {
      let totalSum = cartItems.reduce(totalSumCheckout, 0);
      function totalSumCheckout(total, num) {
        return (
          total + Math.round(Number(num.itemCountInCart) * Number(num.amount))
        );
      }
      setTotalItems(totalSum);
    }
    if (addressListData) {
      setAddressData(addressListData);
    }
  }, [cartItems, addressListData]);

  function onsubmitAddressHandler(event) {
    event.preventDefault();
    let newAddress =
      address1Input.current.value +
      "," +
      address1Input.current.value +
      "," +
      lankmarkInput.current.value +
      "," +
      phoneNumberInput.current.value +
      "," +
      countryInput.current.value +
      "," +
      cityInput.current.value +
      "," +
      zipCodeInput.current.value;
    dispatch(productActions.addNewAddress(newAddress));

    address1Input.current.value = "";
    address2Input.current.value = "";
    lankmarkInput.current.value = "";
    phoneNumberInput.current.value = "";
    countryInput.current.value = "";
    cityInput.current.value = "";
    zipCodeInput.current.value = "";
    setAddNewAddress(false);
  }

  console.log(selectedAddressPrev);
  console.log(addressData);
  return (
    <section className={classes.checkoutsection}>
      <div className={classes.foodDetailsName}>Checkout</div>
      <div className={classes.checkout_continer}>
        <div className={classes.shippingAddress}>
          <p>Shopping Address</p>
          <div className={classes.previousAddress}>
            {addressData &&
              !(addressData.length == 0) &&
              addressData.map((o, i) => {
                return (
                  <Fragment>
                    <label key={i} className={classes.EachAddressDetails}>
                      <input
                        type="checkbox"
                        class={classes.checkboxround}
                        checked={i === selected}
                        onChange={() => onChange(i)}
                      />
                      <p className={classes.addressData}>{o}</p>
                    </label>
                  </Fragment>
                );
              })}
          </div>
          <div className={classes.perviousAddress}>
            <div className={classes.EachAddress}> </div>
          </div>
          <div className={classes.newAddressData}>
            <AiFillPlusCircle></AiFillPlusCircle>{" "}
            <span onClick={addNewAddressHandler}>Add new Address</span>
          </div>
          {addNewAddressEnable && (
            <form
              className={classes.NewAddressForm}
              onSubmit={onsubmitAddressHandler}
            >
              <div className={classes.addressHeading}>
                <p>Add New Address</p>
                <TfiClose
                  className={classes.closeIcon}
                  onClick={closeAddressDetails}
                ></TfiClose>
              </div>

              <input
                placeholder="Enter Your Address1"
                ref={address1Input}
              ></input>
              <input
                placeholder="Enter Your Address2"
                ref={address2Input}
              ></input>
              <input
                placeholder="Enter Your Landmark"
                ref={lankmarkInput}
              ></input>
              <input placeholder="Phone Number" ref={phoneNumberInput}></input>
              <input placeholder="Country" ref={countryInput}></input>
              <input placeholder="City" ref={cityInput}></input>
              <input placeholder="Postal Code" ref={zipCodeInput}></input>
              <input type="submit" value="Add" id={classes.submitbutton} />
            </form>
          )}
        </div>
        <div className={classes.totalAmount_Container}>
          <p>Amount Details</p>
          <div className={classes.amountData}>
            <div className={classes.total_Details}>
              <span>Subtotal:</span>
              <span className={classes.amountDetails}>
                <BsCurrencyRupee></BsCurrencyRupee>
                {totalItems}
              </span>
            </div>
            <div className={classes.total_Details}>
              <span>Shipping:</span>
              <span className={classes.amountDetails}>
                <BsCurrencyRupee></BsCurrencyRupee>40
              </span>
            </div>
            <div className={classes.linegap}></div>
            <div className={classes.total_Details}>
              <span>Total:</span>
              <span className={classes.amountDetails}>
                <BsCurrencyRupee></BsCurrencyRupee>
                {Number(totalItems) + 40}
              </span>
            </div>

            <Link to="/checkout/payment">
              <button
                className={classes.proceedTOCheckOut}
                disabled={!selectedAddressPrev}
              >
                Proceed to checkout
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Checkout;
