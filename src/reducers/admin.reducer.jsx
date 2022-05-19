import { adminActionType } from "@actions/admin.action";

const initialState = {
  adminToken: null,
  isSignIn: false,
  clickSignIn: null,
};

const Admin = (state = initialState, action) => {
  switch (action.type) {
    case adminActionType.ADMIN_SIGN_iN_SUCCESS:
      return {
        ...state,
        adminToken: action.payload,
        isSignIn: true,
        clickSignIn: true,
      };
    case adminActionType.ADMIN_SIGN_iN_FAIL:
      return { ...state, isSignIn: false, clickSignIn: true };
    case adminActionType.ADMIN_SIGN_OUT:
      return initialState;
    default:
      return { ...state };
  }
};

export default Admin;
