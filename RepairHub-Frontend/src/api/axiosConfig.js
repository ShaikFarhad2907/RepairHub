// src/api/axiosConfig.js

import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:1001",
    headers: {
        "Content-Type": "application/json"
    }
});

export default api;