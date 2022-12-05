import axios from "axios";

const url = "https://pear-hummingbird-hat.cyclic.app";
const tokenA = "eyJhbGciOiJIUzI1NiJ9.ZWR1YXJkbzEyMw.q4SrWJmpyWqgrYQiSQeRc6MXE5Tvcrn_Lc9WsmgZs4E";

export async function getMails(token, data) {
  return await axios.get(url + "/api/mail",{ headers: { 'token': `${tokenA}`, 'name': `Eduardo` },
  });
}

export async function addMail(token, data) {
  return await axios.post(url + "/api/mail", data, {
    headers: { "Content-Type": "application/json", token: token },
  });
}

export async function deleteMail(token, data) {
  return await axios.delete(url + "/api/mail", data, {
    headers: { "Content-Type": "application/json", token: token },
  });
}

export async function updateMail(token, data) {
  return await axios.put(url + "/api/mail", data, {
    headers: { "Content-Type": "application/json", token: token },
  });
}

export async function getMail(token, id) {
  return axios.get(`${url}/api/mail/${id}`, {
    headers: { "Content-Type": "application/json", token: token },
  });
}
