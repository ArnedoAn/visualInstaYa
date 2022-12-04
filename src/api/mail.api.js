import axios from "axios";
require("dotenv").config();

const url = process.env.API_URL;

export async function getMails(token) {
  return await axios.get(url + "/api/mail", {
    headers: { "Content-Type": "application/json", token: token },
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

export async function getMail(token, { id }) {
  return axios.get(`${url}/api/mail/${id}`, {
    headers: { "Content-Type": "application/json", token: token },
  });
}
