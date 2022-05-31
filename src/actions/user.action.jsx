/* eslint-disable import/prefer-default-export */
export const userActionType = {
  // TODO
  GET_DATA_SESSIONS: "GET_DATA_SESSIONS",
  GET_DATA_SESSIONS_SUCCESS: "GET_DATA_SESSIONS_SUCCESS",
  GET_DATA_SESSIONS_FAIL: "GET_DATA_SESSIONS_FAIL",
  // GET PONTS AFTER FINISH QUIZ
  GET_POINT_QUIZZ: "GET_POINT_QUIZZ",
  GET_POINT_QUIZZ_SUCCESS: "GET_POINT_QUIZZ_SUCCESS",
  GET_POINT_QUIZZ_FAIL: "GET_POINT_QUIZZ_FAIL",
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

// GET PONTS AFTER FINISH QUIZ

export const getPointQuizz = (payload) => {
  return {
    type: userActionType.GET_POINT_QUIZZ,
    payload,
  };
};

export const getPointQuizzSuccess = (payload) => {
  return {
    type: userActionType.GET_POINT_QUIZZ_SUCCESS,
    payload,
  };
};

export const getPointQuizzFAil = () => {
  return {
    type: userActionType.GET_POINT_QUIZZ_FAIL,
  };
};
