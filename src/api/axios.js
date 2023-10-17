import axios from "axios";
axios.defaults.baseURL = "https://localhost:8443";

export default axios.create({
  // baseURL: BASE_URL,
});

export const privateAxios = axios.create({
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

