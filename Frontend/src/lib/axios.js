import axios from "axios";
export const axiosInstants = axios.create({
  baseURL: "https://trend-up-ipbl.onrender.com/api",
  withCredentials: true,
});
