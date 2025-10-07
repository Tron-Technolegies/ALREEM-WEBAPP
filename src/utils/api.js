import axios from "axios";

const API = axios.create({
  baseURL: "https://al-reem-backend.onrender.com",
});

export default API;
