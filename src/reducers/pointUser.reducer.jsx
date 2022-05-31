import { userActionType } from "@actions/user.action";

const initialState = {
  points: 0,
  error: null,
};

const getPointsUser = (state = initialState, action) => {
  switch (action.type) {
    case userActionType.GET_POINT_QUIZZ_SUCCESS:
      return {
        ...state,
        points: action.payload,
        error: null,
      };
    case userActionType.GET_POINT_QUIZZ_FAIL:
      return initialState;
    default:
      return initialState;
  }
};

export default getPointsUser;
