// src/store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Slices/LoginSignUp"; // Adjust path if needed

const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
