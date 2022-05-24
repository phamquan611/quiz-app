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

