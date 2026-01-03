import axios from "axios";
export const axiosInstants = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});
