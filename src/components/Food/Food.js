import React, { Fragment, useEffect, useState } from "react";
import classes from "./Food.module.css";
import { HiSearch } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import HomeProductItem from "../Home/HomeProductItem";
import ReactPaginate from "react-paginate";

function Food(props) {
  let cartItems = useSelector((items) => items.product.productList);

  const [cartItemsList, setCartItemsList] = useState(cartItems);

  function naviagtetoDetailsSection(params) {}

  useEffect(() => {
    setCartItemsList(cartItems);
  }, [cartItems]);
  function searchFunctionHandler(event) {
    let inputText = event.target.value;
    let cartdata = cartItems.filter((values) => {
      console.log(values.name);
      return values.name.toLowerCase().includes(inputText.toLowerCase());
    });
    setCartItemsList(cartdata);
  }

  function sortingFunctionlityHandler(event) {
    if (
      event.target.value == "ascendingName" ||
      event.target.value == "descendingName"
    ) {
      console.log(event.target.value);
      let sortedList = cartItemsList.slice().sort((a, b) => {
        let isreversed = event.target.value === "ascendingName" ? 1 : -1;
        return isreversed * a.name.localeCompare(b.name);
      });
      setCartItemsList(sortedList);
    } else if (
      event.target.value === "high-price" ||
      event.target.value === "low-price"
    ) {
      let sortedList = cartItemsList.slice().sort((a, b) => {
        let isreversed = event.target.value === "high-price" ? -1 : 1;
        return isreversed * String(a.amount).localeCompare(String(b.amount));
      });
      setCartItemsList(sortedList);
    } else {
      setCartItemsList(cartItems);
    }
  }
  console.log(cartItemsList);
  const [pageNumber, setPageNumber] = useState(0);
  let ProductPerPage = 8;
  const visitedPage = pageNumber * ProductPerPage;
  const currentItems = cartItemsList.slice(
    visitedPage,
    visitedPage + ProductPerPage
  );
  const pageCount = Math.ceil(cartItemsList.length / ProductPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  console.log(currentItems);
  return (
    <Fragment>
      <div className={classes.Food}>
        <div className={classes.foodsBackground}>
          <p>All Foods</p>
        </div>

        <div className={classes.foodsection}>
          <div className={classes.searchFunctionlity}>
            <div className={classes.search}>
              <input
                placeholder="I'm looking for"
                onChange={searchFunctionHandler}
              ></input>
              <button type="button">
                <HiSearch className={classes.serachIcon}></HiSearch>
              </button>
            </div>
          </div>
          <div className={classes.filterDropdown}>
            <select
              id={classes.sortingFunctionlity}
              onChange={sortingFunctionlityHandler}
            >
              <option value="default">Default</option>
              <option value="ascendingName">Alphabetically,A-Z</option>
              <option value="descendingName">Alphabetically,Z-A</option>
              <option value="high-price">High Price</option>
              <option value="low-price">Low Price</option>
            </select>
          </div>
          <div
            className={classes.cartItemList}
            onClick={naviagtetoDetailsSection}
          >
            <div className={classes.foodcontainer}>
              {currentItems &&
                !(currentItems.length == 0) &&
                currentItems.map((data, index) => {
                  return (
                    <HomeProductItem key={index} Items={data}></HomeProductItem>
                  );
                })}
              {currentItems && currentItems.length == 0 && (
                <p className={classes.notFoundDetails}>
                  Couldn't find the details
                </p>
              )}
            </div>
            <div>
              <ReactPaginate
                pageCount={pageCount}
                onPageChange={changePage}
                nextLabel="Next"
                previousLabel="Prev"
                containerClassName={classes.PaginationButtons}
              ></ReactPaginate>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default Food;
