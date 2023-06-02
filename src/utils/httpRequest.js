import axios from 'axios';
import Cookies from 'js-cookie';

const httpRequest = axios.create({
    // baseURL: process.env.REACT_APP_API_URL_LOCAL,
    baseURL: process.env.REACT_APP_API_URL,
    // timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

httpRequest.interceptors.request.use(
    (config) => {
        const token = Cookies.get('token');
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export const get = async (path, option = {}) => {
    const response = await httpRequest.get(path, option);
    return response.data;
};

export const post = async (path, data) => {
    const response = await httpRequest.post(path, data);
    return response.data;
};

export default httpRequest;
