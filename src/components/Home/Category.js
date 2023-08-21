import React, { Fragment } from "react";
import categoryImg1 from "../../assets/images/category-01.png";
import categoryImg2 from "../../assets/images/category-02.png";
import categoryImg3 from "../../assets/images/category-03.png";
import categoryImg4 from "../../assets/images/category-04.png";
import classes from "./Category.module.css";

let categoryDetails = [
  {
    display: "FastFood",
    imgUrl: categoryImg1,
  },
  {
    display: "Pizza",
    imgUrl: categoryImg2,
  },
  {
    display: "Biryani",
    imgUrl: categoryImg3,
  },
  {
    display: "Starters",
    imgUrl: categoryImg4,
  },
];

function Category(props) {
  return (
    <Fragment>
      <section className={classes.Category}>
        <div className={classes.CategoryContainer}>
          {categoryDetails.map((catdetails, index) => {
            return (
              <div className={classes.categoryData} key={index}>
                <img src={catdetails.imgUrl}></img>
                <p>{catdetails.display}</p>
              </div>
            );
          })}
        </div>
      </section>
    </Fragment>
  );
}

export default Category;
