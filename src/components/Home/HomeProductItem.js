import React, { useEffect, useState } from "react";
import classes from "./PopularFood.module.css";
import { BsCurrencyRupee } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { productActions } from "../../store/productStore";
import { Link, useNavigate } from "react-router-dom";

function HomeProductItem(props) {
  let itemsData = props.Items;
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let useDetails = useSelector((data) => data.product.userDetails);
  const [isUserDetails, setUserDetails] = useState(useDetails);

  function addItemCartHandler(event) {
    let newObject = {
      ...itemsData,
      itemCountInCart: 1,
    };
    console.log(isUserDetails);
    if (isUserDetails.uid) dispatch(productActions.addToCart(newObject));
    else {
      navigate("/login");
    }
  }

  useEffect(() => {
    setUserDetails(useDetails);
  }, [useDetails]);

  function navigatetoFoodDetailsSection(items) {
    navigate("/foods/" + itemsData.id);
  }

  return (
    <div className={classes.productItem}>
      <div onClick={navigatetoFoodDetailsSection}>
        <img src={itemsData.image1} className={classes.imageSection}></img>
        <p className={classes.ItemName}> {itemsData.name}</p>
      </div>

      <div className={classes.cartItems}>
        <span className={classes.amountData}>
          <BsCurrencyRupee></BsCurrencyRupee>
          <span>{itemsData.amount}</span>
        </span>
        <button onClick={addItemCartHandler}>Add to Cart</button>
      </div>
    </div>
  );
}

export default HomeProductItem;

{
  /* <Link to={itemsData.id}></Link>; */
}
