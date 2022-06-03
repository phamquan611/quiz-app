export const selectSessions = (state) => state.sessions;

export const selectQuizzes = (state) => state.quizzes;

export const selectAdmin = (state) => state.admin;

export const selectSessionsID = (state) => state.user;

export const getPointUser = (state) => state.point.points.result;

export const getQuestionforUser = (state) => state.quizData.questions;

export const getTimeChallengeForUser = (state) => state.quizData.timeChangllenge;

export const quizId = (state) => state.id.quizId;

export const sessionId = (state) => state.id._id;
