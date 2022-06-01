import { combineReducers } from "redux";
import User from "./user.reducer";
import Point from "./pointUser.reducer";
import Admin from "./admin.reducer";
import Sessions from "./session.reducer";
import Quizzes from "./quiz.reducer";
import ID from "./checkNamExist.reducer";
import QuizData from "./quizData.reducer";



const rootReducer = combineReducers({
  user: User,
  admin: Admin,
  quizzes: Quizzes,
  sessions: Sessions,
  point: Point,
  id: ID,
  quizData: QuizData,
});

export default rootReducer;
