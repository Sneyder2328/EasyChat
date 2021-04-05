import axios from "axios";

const REACT_APP_BASE_URL = 'http://localhost:3030'

export const transport = axios.create({
    baseURL: REACT_APP_BASE_URL,
    withCredentials: true
});