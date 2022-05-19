export const adminActionType = {
  ADMIN_REQUIRE_SIGN_IN: "ADMIN_REQUIRE_SIGN_IN",
  ADMIN_SIGN_iN_SUCCESS: "ADMIN_SIGN_iN_SUCCESS",
  ADMIN_SIGN_iN_FAIL: "ADMIN_SIGN_iN_FAIL",
  ADMIN_SIGN_OUT: "ADMIN_SIGN_OUT",
};

export const adminRequireSignIn = (payload) => {
  return {
    type: adminActionType.ADMIN_REQUIRE_SIGN_IN,
    payload,
  };
};

export const adminSignInSuccess = (payload) => {
  return {
    type: adminActionType.ADMIN_SIGN_iN_SUCCESS,
    payload,
  };
};

export const adminSignInFail = () => {
  return {
    type: adminActionType.ADMIN_SIGN_iN_FAIL,
  };
};

export const adminSignOut = () => {
  return {
    type: adminActionType.ADMIN_SIGN_OUT,
  };
};
