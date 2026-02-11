import axios from "axios";
export const axiosInstants = axios.create({
  baseURL: "https://trend-up-ipbl.onrender.com/api",
  //baseURL: "http://localhost:4000/api",
  withCredentials: true,
});
