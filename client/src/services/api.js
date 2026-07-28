import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://centre-lead-tracker-2.onrender.com/api",
});

export default api;