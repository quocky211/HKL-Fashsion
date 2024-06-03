import axios from 'axios';

const axiosWithJwt = axios.create({
    baseURL: 'http://localhost:3001',
});

axiosWithJwt.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('JWT');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosWithJwt;