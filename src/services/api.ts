import axios from "axios";

export const api = axios.create({
    baseURL: 'https://audiobooks-1zgb.onrender.com/'
    //baseURL: 'http://localhost:3333'
})