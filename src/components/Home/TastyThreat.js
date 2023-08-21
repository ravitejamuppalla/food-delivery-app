import React, { Fragment } from "react";
import classes from "./TastyThreat.module.css";
import locationImg from "../../assets/images/location.png";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import HomeProductItem from "./HomeProductItem";

function TastyThreat(props) {
  let productData = useSelector((data) => data.product.productList);
  let newListProductData = productData
    .filter((values) => {
      return values.category.includes("Pizza");
    })
    .slice(0, 4);
  return (
    <Fragment>
      <section className={classes.TastyThreat}>
        <div className={classes.container}>
          <img src={locationImg}></img>
          <div className={classes.content}>
            <h1>
              Why <span>Tasty Treat?</span>
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quaerat
              quas incidunt esse nemo minima repellendus amet dolore, magnam nam
              perspiciatis a quis labore culpa, mollitia beatae laborum sed
              maiores distinctio!
            </p>
            <main className={classes.listOfTreatsData}>
              <div className={classes.listOfTastTreat}>
                <h3>
                  <AiOutlineCheckCircle
                    className={classes.checkcircle}
                  ></AiOutlineCheckCircle>{" "}
                  Fresh and tasty foods
                </h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <div className={classes.listOfTastTreat}>
                <h3>
                  <AiOutlineCheckCircle
                    className={classes.checkcircle}
                  ></AiOutlineCheckCircle>{" "}
                  Quality Support
                </h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
              <div className={classes.listOfTastTreat}>
                <h3>
                  <AiOutlineCheckCircle
                    className={classes.checkcircle}
                  ></AiOutlineCheckCircle>{" "}
                  Order from any location
                </h3>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
              </div>
            </main>
          </div>
        </div>
        <div className={classes.secondContainer}>
          <h1>Hot Pizza</h1>
          <div className={classes.listOfPizzaContainer}>
            {newListProductData.map((dataList, index) => {
              return (
                <HomeProductItem key={index} Items={dataList}></HomeProductItem>
              );
            })}
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default TastyThreat;
