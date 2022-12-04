import axios from "axios";

export async function getMails(token) {
  return await axios.get("http://localhost:3000/api/mail", {
    headers: { "Content-Type": "application/json", token: token },
  });
}

export async function addMail(token, data) {
  return await axios.post("http://localhost:3000/api/mail", data, {
    headers: { "Content-Type": "application/json", token: token },
  });
}

export async function deleteMail(token, data) {
  return await axios.delete(`http://localhost:3000/api/mail`,data, {
    headers: { "Content-Type": "application/json", token: token },
  });
}

export async function updateMail(token, data) {
  return await axios.put(`http://localhost:3000/api/mail`, data, {
    headers: { "Content-Type": "application/json", token: token },
  });
}

export async function getMail(token, { id }) {
  return axios.get(`http://localhost:3000/api/mail/${id}`, {
    headers: { "Content-Type": "application/json", token: token },
  });
}
