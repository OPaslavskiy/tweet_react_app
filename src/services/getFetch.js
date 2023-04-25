import axios from "axios";

axios.defaults.baseURL = "https://6444faf9b80f57f581ae9580.mockapi.io";

export async function getUsersPerPage(page) {
  try {
    const response = await axios.get(`/users?page=${page}&limit=3`);
    return response.data;
  } catch (err) {
    console.log(err);
  }
}

export async function getAllUser() {
  try {
    const response = await axios.get(`/users`);
    return response.data;
  } catch (e) {
    console.log(err);
  }
}

export async function changeUsers(id, newData) {
  try {
    const response = await axios.put(`/users/${id}`, newData);

    return response.data;
  } catch (e) {
    console.log(err);
  }
}
