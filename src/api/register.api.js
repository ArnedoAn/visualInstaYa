import axios from "axios";
const url = import.meta.env.VITE_HOST;
export const registerUser = async (data) => {
  console.log(data);
  return await axios.post(url + "/api/register", data);
};
