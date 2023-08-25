import axios from "axios";

const baseURL = `${import.meta.env.VITE_API_URL}/api`;

export const apiInstance = axios.create({
  baseURL,
});
