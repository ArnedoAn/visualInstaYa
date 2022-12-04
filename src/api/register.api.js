import axios from "axios";
const url = "https://instaya.onrender.com";
export const registerUser = async (data) => {
  console.log(data);
  return await axios.post(url + "/api/register", data);
};
