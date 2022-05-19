import { sessionActionType } from "@actions/session.action";

const initialState = [];

const Sessions = (state = initialState, action) => {
  switch (action.type) {
    case sessionActionType.GET_LIST_SESSION_SUCCESS:
      return [...action.payload];
    case sessionActionType.GET_LIST_SESSION_FAIL:
      return [];
    default:
      return state;
  }
};

export default Sessions;
