import axios from "axios";

export const registerUser = async (data) => {
  console.log(data)
  return await axios.post("http://localhost:3000" + "/api/register", data);
};
