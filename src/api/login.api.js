import axios from "axios";

const url = import.meta.env.VITE_HOST;

export const loginUser = (data) => {
  return axios.post(url + "/api/login", data);
};
