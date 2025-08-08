import axios from 'axios';

const api = axios.create({
    baseURL: `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth`
});

export const googleAuth = (code) => api.get(`/google?code=${code}`);
