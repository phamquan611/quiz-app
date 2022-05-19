import axios from "axios";
import { url } from "@utils";

export const fetchListSession = () => {
  return axios
    .get(`${url}/sessions`)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};

export const postSession = (payload) => {
  return axios
    .post(`${url}/sessions`, payload)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      return error;
    });
};
