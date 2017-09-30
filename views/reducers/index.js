import { combineReducers } from "redux";
import admin from "./admin";
import member from "./member";

export default combineReducers({
  admin,
  member
});
