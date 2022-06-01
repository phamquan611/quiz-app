import { userActionType } from "@actions/user.action";

const initialState = {
  questions: [],
};

const getQuizData = (state = initialState, action) => {
  switch (action.type) {
    case userActionType.GET_QUIZID_DATA_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default getQuizData;
