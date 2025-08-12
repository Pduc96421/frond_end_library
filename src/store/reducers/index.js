import { combineReducers } from "redux";

import loginReducer from "./login";
import alertReducer from "./alert";
import loadingReducer from "./loading";

const allReducers = combineReducers({
  loginReducer,
  alertReducer,
  loadingReducer,
});

export default allReducers;
