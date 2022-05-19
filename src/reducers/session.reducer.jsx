import { sessionActionType } from "@actions/session.action";

const initialState = {
  listSession: [],
};

const Sessions = (state = initialState, action) => {
  switch (action.type) {
    case sessionActionType.GET_LIST_SESSION_SUCCESS:
      return { ...state, listSession: action.payload };
    case sessionActionType.GET_LIST_SESSION_FAIL:
      return { ...state };
    default:
      return state;
  }
};

export default Sessions;
