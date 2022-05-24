import { userActionType } from "@actions/user.action";

const initialState = {
  sessions: [],
};

const getSessions = (state = initialState, action) => {
  switch (action.type) {
    case userActionType.GET_DATA_SESSIONS_SUCCESS:
      return [...action.payload];
    case userActionType.GET_DATA_SESSIONS_FAIL:
      return initialState;
    default:
      return state;
  }
};

export default getSessions;
