import axios from "axios";

const url = "http://localhost:3000";

export const loginUser = (data) => {
  return axios.post(url + "/api/login", data);
};
