import axios from "axios";

const REACT_APP_BASE_URL = 'https://easychatserver.herokuapp.com'

export const setAccessTokenHeaders = (accessToken: string) => {
    transport.defaults.headers.common['authorization'] = `Bearer ${accessToken}`;
};

export const removeAuthTokenHeaders = () => {
    delete transport.defaults.headers.common['authorization'];
};

export const transport = axios.create({
    baseURL: REACT_APP_BASE_URL,
    withCredentials: true
});