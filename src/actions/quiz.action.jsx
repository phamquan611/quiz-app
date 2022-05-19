export const quizActionType = {
  GET_QUIZZES: "GET_QUIZZES",
  GET_QUIZZES_SUCCESS: "GET_QUIZZES_SUCCESS",
  GET_QUIZZES_FAIL: "GET_QUIZZES_FAIL",
  POST_QUIZ: "POST_QUIZ",
  POST_QUIZ_SUCCESS: "POST_QUIZ_SUCCESS",
  POST_QUIZ_FAIL: "POST_QUIZ_FAIL",
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

export const postQuiz = () => {
  return {
    type: quizActionType.POST_QUIZ,
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
