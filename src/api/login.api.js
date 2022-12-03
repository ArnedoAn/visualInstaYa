import axios from "axios";

export const loginUser = (data) => {
  return axios.post("http://localhost:3000" + "/api/login", data);
};
