import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./auth/authReducer";

const rootReducer = combineReducers({
  auth: authReducer,
});
export default rootReducer;
