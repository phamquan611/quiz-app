import { combineReducers } from "redux";
import User from "./user.reducer";
import Point from "./pointUser.reducer";
import Admin from "./admin.reducer";
import Sessions from "./session.reducer";
import Quizzes from "./quiz.reducer";
import Name from "./checkNameUser.reduce";
import QuizData from "./quizData.reduce";



const rootReducer = combineReducers({
  user: User,
  admin: Admin,
  quizzes: Quizzes,
  sessions: Sessions,
  point: Point,
  name: Name,
  quizData: QuizData,
});

export default rootReducer;
