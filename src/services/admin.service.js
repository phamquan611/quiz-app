import axios from "axios";
import { url } from "@utils";

export const postAdminSignIn = (payload) => {
  return axios
    .post(`${url}/require-login`, payload)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};

export const checkAccessToken = (accessToken) => {
  return axios
    .post(`${url}/require-login`, accessToken)
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return err;
    });
};
