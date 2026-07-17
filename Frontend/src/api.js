import axios from "axios";

const API = axios.create({
    baseURL: "https://nexora-backend-55zy.onrender.com",
    // baseURL: "http://127.0.0.1:8000",
});

export default API;