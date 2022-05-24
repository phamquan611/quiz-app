/* eslint-disable import/prefer-default-export */
export const userActionType = {
  // TODO
  GET_DATA_SESSIONS: "GET_DATA_SESSIONS",
  GET_DATA_SESSIONS_SUCCESS: "GET_DATA_SESSIONS_SUCCESS",
  GET_DATA_SESSIONS_FAIL: "GET_DATA_SESSIONS_FAIL",

};

export const getAllDataSessions = () => {
  return {
    type: userActionType.GET_DATA_SESSIONS,
  };
};

export const getAllDataSessionSuccess = (payload) => {
  return {
    type: userActionType.GET_DATA_SESSIONS_SUCCESS,
    payload,
  };
};

export const getAllDataSessionFAil = () => {
  return {
    type: userActionType.GET_DATA_SESSIONS_FAIL,
  };
};
