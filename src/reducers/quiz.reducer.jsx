import { quizActionType } from "@actions/quiz.action";

const initialState = [];

const Quizzes = (state = initialState, action) => {
  switch (action.type) {
    case quizActionType.GET_QUIZZES_SUCCESS:
      return [...action.payload];
    case quizActionType.GET_QUIZZES_FAIL:
      return initialState;
    default:
      return state;
  }
};

export default Quizzes;
