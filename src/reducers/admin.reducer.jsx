import { adminActionType } from "@actions/admin.action";
import { ERROR_SIGN_IN } from "@utils";

const initialState = {
  adminToken: null,
  error: null,
};

const Admin = (state = initialState, action) => {
  switch (action.type) {
    case adminActionType.ADMIN_SIGN_iN_SUCCESS:
      return {
        ...state,
        adminToken: action.payload,
        error: null,
      };
    case adminActionType.ADMIN_SIGN_iN_FAIL:
      return { ...state, error: ERROR_SIGN_IN };
    case adminActionType.ADMIN_SIGN_OUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default Admin;
