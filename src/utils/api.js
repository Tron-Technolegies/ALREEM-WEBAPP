import axios from "axios";

const API = axios.create({
  baseURL: "https://alreem-7r91.onrender.com/",
  withCredentials: true,
});

export default API;
