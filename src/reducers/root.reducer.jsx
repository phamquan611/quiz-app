import { combineReducers } from "redux";
import User from "./user.reducer";
import Admin from "./admin.reducer";

const rootReducer = combineReducers({
  user: User,
  admin: Admin,
});

export default rootReducer;
