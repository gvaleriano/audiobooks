import axios from "axios";

export const api = axios.create({
    baseURL: 'https://audiobooks-1zgb.onrender.com/'
})