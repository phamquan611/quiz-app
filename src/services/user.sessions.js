/* eslint-disable no-unreachable */
/* eslint-disable import/named */
/* eslint-disable import/prefer-default-export */
import axios from "axios";
import { url } from "@utils";

export const fetchSessions = () => {
  return axios
    .get(`${url}/sessions`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const getPointsQuiz = (payload) => {
  return axios.post(`${url}/result`, payload).then((response) => {
    return response;
  })
    .catch((error) => {
      return error;
    });
};

export const checkNameUser = (payload) => {
  return axios.post(`${url}/sessions/${payload}`).then((response) => {
    return response;
  })
    .catch((error) => {
      return error;
    });
};

export const getQuizData = (payload) => {
  return axios.get(`${url}/quizzes/${payload}`).then((response) => {
    return response;
  })
    .catch((error) => {
      return error;
    });
};
