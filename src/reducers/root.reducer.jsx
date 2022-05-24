import { combineReducers } from "redux";
import User from "./user.reducer";
import Admin from "./admin.reducer";
import Sessions from "./session.reducer";
import Quizzes from "./quiz.reducer";

const rootReducer = combineReducers({
  user: User,
  admin: Admin,
  quizzes: Quizzes,
  sessions: Sessions,
});

export default rootReducer;
