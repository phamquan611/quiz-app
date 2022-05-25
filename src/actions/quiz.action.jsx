export const quizActionType = {
  GET_QUIZZES: "GET_QUIZZES",
  GET_QUIZZES_SUCCESS: "GET_QUIZZES_SUCCESS",
  GET_QUIZZES_FAIL: "GET_QUIZZES_FAIL",
  POST_QUIZ: "POST_QUIZ",
  POST_QUIZ_SUCCESS: "POST_QUIZ_SUCCESS",
  POST_QUIZ_FAIL: "POST_QUIZ_FAIL",
  PUT_QUIZ: "PUT_QUIZ",
};

export const getQuizzes = () => {
  return {
    type: quizActionType.GET_QUIZZES,
  };
};

export const getQuizzesSuccess = (payload) => {
  return {
    type: quizActionType.GET_QUIZZES_SUCCESS,
    payload,
  };
};

export const getQuizzesFAil = () => {
  return {
    type: quizActionType.GET_QUIZZES_FAIL,
  };
};

export const postQuiz = (payload) => {
  return {
    type: quizActionType.POST_QUIZ,
    payload,
  };
};

export const postQuizSuccess = (payload) => {
  return {
    type: quizActionType.POST_QUIZ_SUCCESS,
    payload,
  };
};

export const postQuizFail = () => {
  return {
    type: quizActionType.POST_QUIZ_FAIL,
  };
};

export const putQuiz = (payload) => {
  return {
    type: quizActionType.PUT_QUIZ,
    payload,
  };
};
