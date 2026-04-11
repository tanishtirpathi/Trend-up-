import axios from "axios";

const RAW_BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "https://trend-up-ipbl.onrender.com";
const BASE_URL = RAW_BASE_URL.replace(/\/$/, "");

export const axiosInstants = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});
