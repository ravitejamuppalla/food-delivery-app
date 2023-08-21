import React, { Fragment, useMemo, memo, useState } from "react";
import { useSelector } from "react-redux";
import classes from "./PopularFood.module.css";
import { Link } from "react-router-dom";
import { generateSomeRandomObjectInArrayList } from "../../utils/UtilsFunction";
import { BsCurrencyRupee } from "react-icons/bs";
import HomeProductItem from "./HomeProductItem";

function PopularFoods(props) {
  let productData = useSelector((data) => data.product.productList);
  const [isActive, setIsActive] = useState("All");
  let popluarlistOFDetails = [];
  function getProductDetailsHandler(event) {
    setIsActive(event.target.textContent);
  }
  console.log(isActive);
  if (isActive == "All")
    popluarlistOFDetails.push(
      ...generateSomeRandomObjectInArrayList(productData, 8)
    );
  else {
    popluarlistOFDetails.push(
      ...productData
        .filter((values) => {
          console.log(values);
          return values.category.includes(isActive);
        })
        .slice(0, 4)
    );
  }
  console.log(popluarlistOFDetails);
  return (
    <Fragment>
      <div className={classes.heading}>
        <h1>Popular Foods</h1>
      </div>
      <section className={classes.productsUsedSection}>
        <div className={classes.poularProdcutsHeading}>
          <div className={classes.headers}>
            <button
              className={isActive == "All" ? classes.active : undefined}
              onClick={getProductDetailsHandler}
            >
              All
            </button>
            <button
              className={
                isActive.includes("Biryani") ? classes.active : undefined
              }
              onClick={getProductDetailsHandler}
            >
              <img src="	https://www.shutterstock.com/image-photo/dum-handi-chicken-biryani-prepared-260nw-2000023562.jpg"></img>
              Biryani
            </button>
            <button
              className={
                isActive.includes("Pizza") ? classes.active : undefined
              }
              onClick={getProductDetailsHandler}
            >
              <img src="https://www.shutterstock.com/image-photo/hot-tasty-traditional-italian-pizza-260nw-1923974306.jpg"></img>
              Pizza
            </button>
            <button
              className={
                isActive.includes("Starters") ? classes.active : undefined
              }
              onClick={getProductDetailsHandler}
            >
              <img
                src="https://www.shutterstock.com/image-photo/tandoori-…bi-roasted-cauliflower-tikka-260nw-1301431393.jpg
"
              ></img>
              Starters
            </button>
          </div>
        </div>
      </section>
      <section className={classes.productsUsedSection}>
        <div className={classes.productContainer}>
          {popluarlistOFDetails &&
            !(popluarlistOFDetails.length == 0) &&
            popluarlistOFDetails[0]?.id &&
            popluarlistOFDetails.map((dataValues, index) => {
              return (
                <HomeProductItem
                  key={index}
                  Items={dataValues}
                ></HomeProductItem>
              );
            })}
        </div>
      </section>
    </Fragment>
  );
}

export default memo(PopularFoods);
