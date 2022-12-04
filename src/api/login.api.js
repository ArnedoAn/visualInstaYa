import axios from "axios";

const url = "https://instaya.onrender.com";

export const loginUser = (data) => {
  return axios.post(url + "/api/login", data);
};
