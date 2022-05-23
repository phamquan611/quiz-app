export const sessionActionType = {
  GET_LIST_SESSION: "GET_LIST_SESSION",
  GET_LIST_SESSION_SUCCESS: "GET_LIST_SESSION_SUCCESS",
  GET_LIST_SESSION_FAIL: "GET_LIST_SESSION_FAIL",
  POST_SESSION: "POST_SESSION",
};

export const getListSession = () => {
  return {
    type: sessionActionType.GET_LIST_SESSION,
  };
};

export const getListSessionSuccess = (payload) => {
  return {
    type: sessionActionType.GET_LIST_SESSION_SUCCESS,
    payload,
  };
};

export const getListSessionFail = () => {
  return {
    type: sessionActionType.GET_LIST_SESSION_FAIL,
  };
};

export const postSession = (payload) => {
  return {
    type: sessionActionType.POST_SESSION,
    payload,
  };
};
