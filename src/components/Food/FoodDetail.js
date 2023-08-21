import React, { Fragment, useState, useRef, useEffect } from "react";
import classes from "./FoodDetails.module.css";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import HomeProductItem from "../Home/HomeProductItem";
import { productActions } from "../../store/productStore";
import { BsCurrencyRupee } from "react-icons/bs";
import { faker } from "@faker-js/faker";

function FoodDetail(props) {
  const [showReview, setShowReview] = useState(false);
  let params = useParams();
  let dispatch = useDispatch();
  let productItems = useSelector((datavlues) => datavlues.product.productList);
  let nameFromForm = useRef();
  let emailFromForm = useRef();
  let commentsFromForm = useRef();
  let reviewComments;

  let productDetailsShowData = productItems.find((values) =>
    values.id.includes(params.foodDetailId)
  );
  const [productDetailsShow, SetProductDetails] = useState(
    productDetailsShowData
  );
  console.log(params.foodDetailId);

  console.log(productDetailsShow);
  useEffect(() => {
    console.log("Entering the use esffect");
    let productDetailsShowData = productItems.find((values) =>
      values.id.includes(params.foodDetailId)
    );
    SetProductDetails(productDetailsShowData);
    setChangeImage(productDetailsShow ? productDetailsShowData.image1 : "");
    setNewReviewList(reviewComments);
  }, [productDetailsShow, productItems, params.foodDetailId]);
  console.log(productItems);

  console.log(productDetailsShow);
  reviewComments = [
    {
      name: faker.person.firstName(),
      email: faker.person.firstName() + "@gmail.com",
      comments: "Im so glad I ordered this —it tastes great!",
    },
    {
      name: faker.person.lastName(),
      email: faker.person.lastName() + "@gmail.com",
      comments: "Wow, this  is amazing! ",
    },
  ];
  let intialDataForReviewComments = reviewComments;
  let intialDataForImage1 = productDetailsShow ? productDetailsShow.image1 : "";
  let intialDataForCategory = productDetailsShow
    ? productDetailsShow.category
    : "";
  const [reviewList, setNewReviewList] = useState(intialDataForReviewComments);
  const [changeImage, setChangeImage] = useState(intialDataForImage1);
  function activeHandlerFucntion(event) {
    if (event.target.textContent == "Review") setShowReview(true);
    else setShowReview(false);
  }

  let mightAlsoLike = productItems
    .filter((values) => values.category.includes(intialDataForCategory))
    .slice(0, 4);

  function addItemCartHandler(event) {
    let newObject = {
      ...productDetailsShow,
      itemCountInCart: 1,
    };
    dispatch(productActions.addToCart(newObject));
  }

  function changeImageHandler(event) {
    setChangeImage(event.target.src);
  }

  function addReviewCommentsHandler(event) {
    event.preventDefault();
    let newReviewComments = {
      name: nameFromForm.current.value,
      email: emailFromForm.current.value,
      comments: commentsFromForm.current.value,
    };

    let newArraylist = reviewList.concat(newReviewComments);

    setNewReviewList(newArraylist);

    nameFromForm.current.value = "";
    emailFromForm.current.value = "";
    commentsFromForm.current.value = "";
  }

  return (
    <Fragment>
      <section className={classes.foodDetails}>
        <div className={classes.foodDetailsName}>
          {productDetailsShow ? productDetailsShow.name : ""}
        </div>
        <div className={classes.foodMainContiner}>
          <div className={classes.foodDetails_Container}>
            <div className={classes.images}>
              <div
                className={`${classes["allImages"]} ${classes["outerFlex"]}`}
              >
                <img
                  src={productDetailsShow ? productDetailsShow.image1 : ""}
                  onClick={changeImageHandler}
                ></img>
                <img
                  src={productDetailsShow ? productDetailsShow.image2 : ""}
                  onClick={changeImageHandler}
                ></img>
                <img
                  src={productDetailsShow ? productDetailsShow.image3 : ""}
                  onClick={changeImageHandler}
                ></img>
              </div>
              <img
                src={changeImage}
                className={`${classes["SingleImage"]}`}
              ></img>

              <div
                className={`${classes["FoodDetailsContent"]} ${classes["outerFlex"]}`}
              >
                <h3>{productDetailsShow ? productDetailsShow.name : ""}</h3>
                <div
                  className={`${classes["InlineBlack"]} ${classes["priceValue"]}`}
                >
                  <p>Price:</p>
                  <p className={classes.currencyData}>
                    <BsCurrencyRupee></BsCurrencyRupee>{" "}
                    {productDetailsShow ? productDetailsShow.amount : ""}
                  </p>
                </div>
                <div
                  className={`${classes["InlineBlack"]} ${classes["category"]}`}
                >
                  <p>Category:</p>
                  <p>{productDetailsShow ? productDetailsShow.category : ""}</p>
                </div>
                <div>
                  <button onClick={addItemCartHandler}>Add to Cart</button>
                </div>
              </div>
            </div>
          </div>
          <div className={classes.foodDescriptionAndReview}>
            <div className={classes.headings}>
              <p
                onClick={activeHandlerFucntion}
                className={
                  showReview == false ? classes.activeHeading : undefined
                }
              >
                Description
              </p>
              <p
                onClick={activeHandlerFucntion}
                className={
                  showReview == true ? classes.activeHeading : undefined
                }
              >
                Review
              </p>
            </div>
            {!showReview && (
              <div className={classes.descriptionDetails}>
                {productDetailsShow ? productDetailsShow.description : ""}
              </div>
            )}
          </div>
          {showReview && (
            <div className={classes.reviewContianer}>
              <div className={classes.ReviewContentDetails}>
                {reviewList.map((values, index) => {
                  return (
                    <div className={classes.reviewerItem} key={index}>
                      <p className={classes.reviewer_Name}>{values.name}</p>
                      <p className={classes.reviewer_Email}>{values.email}</p>
                      <p className={classes.reviwer_Comments}>
                        {values.comments}
                      </p>
                    </div>
                  );
                })}

                <div className={classes.reviewInputs}>
                  <input
                    placeholder="Enter Your Name"
                    ref={nameFromForm}
                  ></input>
                  <input
                    placeholder="Enter Your Eamil"
                    ref={emailFromForm}
                  ></input>
                  <textarea
                    placeholder="Please Enter comments"
                    ref={commentsFromForm}
                  ></textarea>
                  <button onClick={addReviewCommentsHandler}>Submit</button>
                </div>
              </div>
            </div>
          )}
          <div className={classes.mightBeLike}>
            <p>You might also like</p>
            <div className={classes.mightBeLikeItem}>
              <div className={classes.cartItem}>
                {mightAlsoLike &&
                  !(mightAlsoLike.length == 0) &&
                  mightAlsoLike.map((datavalues, index) => {
                    return (
                      <HomeProductItem
                        Items={datavalues}
                        key={index}
                      ></HomeProductItem>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
}

export default FoodDetail;
