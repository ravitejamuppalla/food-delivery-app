import React, { useEffect, useState } from "react";
import classes from "./PastOrders.module.css";
import { useSelector } from "react-redux";
import { BsCurrencyRupee } from "react-icons/bs";

function PastOrders(props) {
  const [listOfPastOrders, setListOfPastOrders] = useState();
  let pastOrderDetails = useSelector(
    (data) => data.product.userDetails.pastOrders
  );
  console.log(pastOrderDetails);

  useEffect(() => {
    setListOfPastOrders(pastOrderDetails);
  }, [pastOrderDetails]);
  return (
    <div>
      <div className={classes.cartSection}>Past Orders</div>
      <div className={classes.pastOrders}>
        {listOfPastOrders &&
          !(listOfPastOrders.length == 0) &&
          listOfPastOrders.map((data, index) => {
            if (!data.payloadAction) return "";
            console.log(data.payloadAction);

            return (
              <div className={classes.parOrdersEachContainer} key={index}>
                <div className={classes.headingDetails}>
                  {" "}
                  <p className={classes.orderedTime}>{data.orderedDate}</p>
                  <p className={classes.totalCurrency}>
                    Total Amount:
                    <BsCurrencyRupee></BsCurrencyRupee>{" "}
                    {data.payloadAction[0].reduce(
                      (total, num) =>
                        total +
                        Math.round(
                          Number(num.itemCountInCart) * Number(num.amount)
                        ),
                      0
                    )}
                  </p>
                </div>

                {data.payloadAction[0].map((dataValues) => {
                  console.log(dataValues.image1);
                  return (
                    <div className={classes.eachCartIeam}>
                      <img src={dataValues.image1}></img>
                      <p className={classes.productName}>{dataValues.name}</p>
                      <p className={classes.productPrice}>
                        <BsCurrencyRupee></BsCurrencyRupee>
                        {dataValues.amount}
                      </p>
                      <p className={classes.ProductQuantity}>
                        {dataValues.itemCountInCart}X
                      </p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        {!listOfPastOrders && (
          <p className={classes.noPastOrders}>No Orders Yet..!</p>
        )}
      </div>
    </div>
  );
}

export default PastOrders;
