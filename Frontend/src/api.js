import axios from "axios";

const API = axios.create({
    baseURL: "https://nexora-backend-55zy.onrender.com",
});

export default API;