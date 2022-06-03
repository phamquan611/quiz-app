import { userActionType } from "@actions/user.action";

const initialState = {
  id: "",
  sessionID: "",
};

const checkNameUser = (state = initialState, action) => {
  switch (action.type) {
    case userActionType.CHECK_NAME_USER_EXIST_SUCCESS:
      return action.payload;
    case userActionType.RESET_CHECK_NAME_EXIST:
      return initialState;
    default:
      return state;
  }
};

export default checkNameUser;
