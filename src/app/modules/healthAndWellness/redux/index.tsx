import { combineReducers } from "redux";

import searchQueryReducer from "./searchQueryReducer";
const appReducer = combineReducers({
  search: searchQueryReducer
});

export default appReducer;
