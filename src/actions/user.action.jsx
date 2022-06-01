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

  // CHECK NAME IS AVAILABLE
  CHECK_NAME_USER_EXIST: "CHECK_NAME_USER_EXIST",
  CHECK_NAME_USER_EXIST_SUCCESS: "CHECK_NAME_USER_EXIST_SUCCESS",
  CHECK_NAME_USER_EXIST_FAIL: "CHECK_NAME_USER_EXIST_FAIL",

  // GET DATA QUIZ ID QUESION
  GET_QUIZID_DATA: "GET_QUIZID_DATA",
  GET_QUIZID_DATA_SUCCESS: "GET_QUIZID_DATA_SUCCESS",
  GET_QUIZID_DATA_FAIL: "GET_QUIZID_DATA_FAIL",

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

export const getPointQuizzFail = () => {
  return {
    type: userActionType.GET_POINT_QUIZZ_FAIL,
  };
};

// CHECK NAME USER IS AVAILABLE

export const checkNameExist = (payload) => {
  return {
    type: userActionType.CHECK_NAME_USER_EXIST,
    payload,
  };
};

export const CheckNameExistSuccess = (payload) => {
  return {
    type: userActionType.CHECK_NAME_USER_EXIST_SUCCESS,
    payload,
  };
};

export const checkNameExistFail = () => {
  return {
    type: userActionType.CHECK_NAME_USER_EXIST_FAIL,
  };
};

// GET DATA BY QUIZ ID
export const getDataQuizID = (payload) => {
  return {
    type: userActionType.GET_QUIZID_DATA,
    payload,
  };
};

export const getDataQuizIDSuccess = (payload) => {
  return {
    type: userActionType.GET_QUIZID_DATA_SUCCESS,
    payload,
  };
};

export const getDataQuizIDFail = () => {
  return {
    type: userActionType.GET_QUIZID_DATA_FAIL,
  };
};
