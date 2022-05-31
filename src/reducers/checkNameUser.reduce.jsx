import { userActionType } from "@actions/user.action";

const initialState = {
  id: "",
};

const checkNameUser = (state = initialState, action) => {
  switch (action.type) {
    case userActionType.CHECK_NAME_USER_SUCCESS:
      return action.payload;
    case userActionType.CHECK_NAME_USER_FAIL:
      return initialState;
    default:
      return state;
  }
};

export default checkNameUser;
