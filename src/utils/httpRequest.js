import axios from 'axios';
import Cookies from 'js-cookie';

const httpRequest = axios.create({
    baseURL: 'http://localhost:3001/api/',
    timeout: 1000,
    headers: { 'X-Custom-Header': 'foobar' },
});

const token = Cookies.get('token');
httpRequest.defaults.headers.common['Authorization'] = `Bearer ${token}`;

export const get = async (path, option = {}) => {
    const response = await httpRequest.get(path, option);
    return response.data;
};

export const post = async (path, data) => {
    const response = await httpRequest.post(path, data);
    return response.data;
};

export default httpRequest;
