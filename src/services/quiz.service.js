import axios from "axios";
import { url } from "@utils";

export const fetchQuizzes = () => {
  return axios
    .get(`${url}/quizzes`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const adminPostQuiz = (payload) => {
  return axios
    .post(`${url}/quizzes`, payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
