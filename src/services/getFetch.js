import axios from "axios";

axios.defaults.baseURL = "https://6444faf9b80f57f581ae9580.mockapi.io";

export async function getUsers() {
  try {
    const response = await axios.get(`/users`);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

// export async function getUser(id) {
//   try {
//     const response = await axios.get(`/users/${id}`);
//     return response.data;
//   } catch (e) {
//     console.log(e);
//   }
// }

export async function changeUsers(id, newData) {
  try {
    const response = await axios.put(`/users/${id}`, newData);
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
}
