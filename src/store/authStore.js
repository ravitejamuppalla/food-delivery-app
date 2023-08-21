import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../Auth/Firsebase";
import productStore, { productActions } from "./productStore";
import useHttp from "../hooks/useHttp";

let intialAuthDetails = {
  currentUser: {},
  errorInAuthtication: "",
  registerInAuthtication: "",
  isLoggedOut: false,
};

const authReducerSlice = createSlice({
  name: "AuthStore",
  initialState: intialAuthDetails,
  reducers: {
    signUpUser(state, action) {
      state.currentUser = action.payload;
      console.log(state.currentUser);
    },
    errorForCreateNewUser(state, action) {
      state.errorInAuthtication = action.payload;
    },
    registerForCreateNewUser(state, action) {
      state.registerInAuthtication = action.payload;
    },
    loggedOutFunction(state, action) {
      state.isLoggedOut = true;
      console.log(state.isLoggedOut);
    },
  },
});

export let authActions = authReducerSlice.actions;
export default authReducerSlice.reducer;

export async function getUserDetails(itemsdata) {
  async function postNewUserDetails(itemsdata) {
    console.log("Doing the POst Call Data");
    let response = await fetch(
      "https://learningreact-f5a3c-default-rtdb.firebaseio.com/userProfieDetails.json",
      {
        method: "POST",
        body: JSON.stringify(itemsdata),
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
    return responseData.name;
  }
  let responseNameID = await postNewUserDetails(itemsdata);

  let responseGet = await fetch(
    "https://learningreact-f5a3c-default-rtdb.firebaseio.com/userProfieDetails/" +
      responseNameID +
      ".json"
  );

  if (!responseGet.ok) {
    throw new Error("Failed to Load the request");
  }
  let newObjectWithKey = {
    ...(await responseGet.json()),
    fireBaseProfileID: responseNameID,
  };
  return newObjectWithKey;
}

export function registerNewAccount(dataToCreateAccount) {
  return async (dispatch) => {
    async function sendRequestToCreateNewAccount() {
      return await auth
        .createUserWithEmailAndPassword(
          dataToCreateAccount.email,
          dataToCreateAccount.password
        )
        .then(async (data) => {
          const user = auth.currentUser;
          user.updateProfile({
            displayName: dataToCreateAccount.name,
          });
          if (data) dispatch(authActions.registerForCreateNewUser(""));
          console.log(data);
        })
        .catch(async (data) => {
          dispatch(authActions.registerForCreateNewUser(await data.message));
        });
    }
    await sendRequestToCreateNewAccount();

    let userDetails = auth.currentUser;
    console.log(userDetails);
    if (!userDetails) return "";
    let newObject = {
      name: userDetails.name,
      email: userDetails.email,
      uid: userDetails.uid,
    };
    dispatch(authActions.signUpUser(newObject));
    let newObjectCatItems = {
      uid: userDetails.uid,
      cartItems: [],
    };
    console.log("Doing the Post Call Data");
    let response = await fetch(
      "https://learningreact-f5a3c-default-rtdb.firebaseio.com/userProfieDetails.json",
      {
        method: "POST",
        body: JSON.stringify(newObjectCatItems),
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

    let responseGet = await fetch(
      "https://learningreact-f5a3c-default-rtdb.firebaseio.com/userProfieDetails/" +
        responseData.name +
        ".json"
    );

    if (!responseGet.ok) {
      throw new Error("Failed to Load the request");
    }
    let newObjectWithKey = {
      ...(await responseGet.json()),
      fireBaseProfileID: responseData.name,
    };

    //   let getUserDetailsAwaitDetails = await getUserDetails(newObjectCatItems);
    dispatch(productActions.addUserDataDetails(newObjectWithKey));
    // });
  };
}

export function loginToAccount(dataToCreateAccount) {
  return async (dispatch) => {
    async function sendRequestToLogin() {
      return await auth
        .signInWithEmailAndPassword(
          dataToCreateAccount.email,
          dataToCreateAccount.password
        )
        .then(async (data) => {
          if (data) dispatch(authActions.errorForCreateNewUser(""));
          console.log(data);
        })
        .catch(async (data) => {
          dispatch(authActions.errorForCreateNewUser(await data.message));
        });
    }
    await sendRequestToLogin();
    auth.onAuthStateChanged((value) => {
      if (!value) return "";
      console.log(value);
      let newObject = {
        name: value.displayName,
        email: value.email,
        uid: value.uid,
      };
      console.log(newObject);
      dispatch(authActions.signUpUser(newObject));
      getUserProfileData(value);
    });
    async function getUserProfileData(data) {
      let response = await fetch(
        "https://learningreact-f5a3c-default-rtdb.firebaseio.com/userProfieDetails.json"
      );

      if (!response.ok) {
        throw new Error("Failed to Load the request");
      }
      let responseData = await response.json();
      console.log(responseData);
      let isproductDetailsPresent = null;
      for (const key in responseData) {
        console.log(responseData[key].uid);
        console.log(data.uid);
        if (responseData[key].uid.includes(data.uid)) {
          isproductDetailsPresent = {
            ...responseData[key],
            fireBaseProfileID: key,
          };
        }
      }
      if (isproductDetailsPresent) {
        dispatch(productActions.addUserDataDetails(isproductDetailsPresent));
      } else {
        let newObjectCatItems = {
          uid: data.uid,
          cartItems: [],
        };
        console.log("Doing the POst Call Data");
        let response = await fetch(
          "https://learningreact-f5a3c-default-rtdb.firebaseio.com/userProfieDetails.json",
          {
            method: "POST",
            body: JSON.stringify(newObjectCatItems),
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

        let responseGet = await fetch(
          "https://learningreact-f5a3c-default-rtdb.firebaseio.com/userProfieDetails/" +
            responseData.name +
            ".json"
        );

        if (!responseGet.ok) {
          throw new Error("Failed to Load the request");
        }
        let newObjectWithKey = {
          ...(await responseGet.json()),
          fireBaseProfileID: responseData.name,
        };
        dispatch(productActions.addUserDataDetails(newObjectWithKey));
      }
    }
  };
}
export function logoutToAccount(dataToCreateAccount) {
  return async (dispatch) => {
    async function sendRequestToLogout() {
      return await auth.signOut();
    }
    await sendRequestToLogout();
    dispatch(authActions.signUpUser({}));
    dispatch(authActions.loggedOutFunction());
    dispatch(productActions.addUserDataDetails({}));
  };
}

export function getUserDetailsDataFromProduct(params) {}
