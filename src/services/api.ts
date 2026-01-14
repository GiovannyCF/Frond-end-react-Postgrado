import axios from 'axios';

const API_URL = "https://localhost:7043/api"; // <--- ¡VERIFICA TU PUERTO AQUÍ!

export const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});