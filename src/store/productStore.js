import { createSlice, current } from "@reduxjs/toolkit";
import useHttp from "../hooks/useHttp";

let intialProduct = {
  productList: [],
  openSideCheckout: false,
  userDetails: [],
  updateDataBaseList: false,
};

const reducerSlice = createSlice({
  name: "store",
  initialState: intialProduct,
  reducers: {
    getProductDetails(state, action) {
      let actiondetails = action.payload;
      let temporialVariable = [];
      for (const key in actiondetails) {
        let creatingNewObject = {
          id: actiondetails[key].productID,
          name: actiondetails[key].productName,
          description: actiondetails[key].productDescription,
          amount: actiondetails[key].amount,
          category: actiondetails[key].category,
          image1: actiondetails[key].image1,
          image2: actiondetails[key].image2,
          image3: actiondetails[key].image3,
          firebaseID: key,
        };
        temporialVariable.push(creatingNewObject);
      }
      state.productList = temporialVariable;
    },
    addToCart(state, action) {
      console.log(current(state.userDetails));
      state.updateDataBaseList = true;
      let payloadAction = action.payload;
      if (!state.userDetails["cartitems"]) {
        state.userDetails["cartitems"] = [action.payload];
        state.userDetails["cartTotalQuantity"] = 1;
      } else {
        let singleItem = state.userDetails.cartitems.find((values) =>
          values.id.includes(payloadAction.id)
        );
        if (!singleItem) state.userDetails.cartitems.push(action.payload);
        else singleItem.itemCountInCart = singleItem.itemCountInCart + 1;
        state.userDetails.cartTotalQuantity++;
      }

      console.log(current(state.userDetails));
    },

    removeItem(state, action) {
      state.updateDataBaseList = true;
      let payloadAction = action.payload;
      let singleItem = state.userDetails.cartitems.find((values) =>
        values.id.includes(payloadAction.id)
      );
      if (!(singleItem.itemCountInCart == 1)) {
        singleItem.itemCountInCart = singleItem.itemCountInCart - 1;
      } else {
        state.userDetails.cartitems = state.userDetails.cartitems.filter(
          (values) => {
            return values.id !== payloadAction.id;
          }
        );
      }
      state.userDetails.cartTotalQuantity--;
    },

    removeTotalItem(state, action) {
      state.updateDataBaseList = true;
      let payloadAction = action.payload;

      let singleItem = state.userDetails.cartitems.find((values) =>
        values.id.includes(payloadAction.id)
      );
      state.userDetails.cartTotalQuantity =
        state.userDetails.cartTotalQuantity - singleItem.itemCountInCart;
      state.userDetails.cartitems = state.userDetails.cartitems.filter(
        (values) => {
          return values.id !== payloadAction.id;
        }
      );
    },

    opencartCheckOut(state, action) {
      console.log(state.openSideCheckout);
      state.openSideCheckout = !state.openSideCheckout;
    },

    addUserDataDetails(state, action) {
      state.userDetails = action.payload;
    },

    addNewAddress(state, action) {
      state.updateDataBaseList = true;
      let payloadAction = action.payload;
      if (!state.userDetails["addressList"]) {
        state.userDetails["addressList"] = [payloadAction];
      } else {
        state.userDetails.addressList.push(payloadAction);
      }
    },
    addSelectedAddress(state, action) {
      state.updateDataBaseList = true;
      let payloadAction = action.payload;
      if (!state.userDetails["prefferedAddress"]) {
        state.userDetails["prefferedAddress"] = [payloadAction];
      } else {
        state.userDetails.prefferedAddress = payloadAction;
      }
    },

    addItemsToPastOrder(state, action) {
      state.updateDataBaseList = true;
      var currentdate = new Date();
      var datetime =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        "," +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes() +
        ":" +
        currentdate.getSeconds();

      let payloadAction = action.payload;

      let newObjectDetails = {
        payloadAction,
        orderedDate: datetime,
      };
      console.log(newObjectDetails);
      if (!state.userDetails["pastOrders"]) {
        state.userDetails["pastOrders"] = [newObjectDetails];
      } else {
        state.userDetails.pastOrders.unshift(newObjectDetails);
      }
    },
    clearCartItems(state, action) {
      state.updateDataBaseList = true;
      state.userDetails.cartitems = [];
      state.userDetails.cartTotalQuantity = 0;
    },
  },
});

export let productActions = reducerSlice.actions;
export default reducerSlice.reducer;

export function updateItemsToCart(dataOFItems) {
  return async (dispatch) => {
    let response = await fetch(
      "https://learningreact-f5a3c-default-rtdb.firebaseio.com/userProfieDetails/" +
        dataOFItems.fireBaseProfileID +
        ".json",
      {
        method: "PUT",
        body: JSON.stringify(dataOFItems),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to Load the request");
    }
    let responseData = await response.json();
    console.log(responseData);
  };
}
