import { configureStore } from "@reduxjs/toolkit";
import productStore from "./productStore";
import authStore from "./authStore";

const store = configureStore({
  reducer: {
    product: productStore,
    authication: authStore,
  },
});

export default store;
