import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api', 
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    async (config) => {
        let token = localStorage.getItem('token');
        const tokenExpiry = localStorage.getItem('tokenExpiry');

        if (token && tokenExpiry && Date.now() >= tokenExpiry) {
            try {
                const refreshToken = localStorage.getItem('refreshToken');
                const response = await axios.post('http://localhost:8000/api/token/refresh/', {
                    refresh: refreshToken,
                });

                token = response.data.access;
                localStorage.setItem('token', token);
                localStorage.setItem('tokenExpiry', Date.now() + response.data.access_expires_in * 1000);

                config.headers.Authorization = `Bearer ${token}`;
            } catch (error) {
                console.error('Error refreshing token', error);

                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('tokenExpiry');
                window.location.href = '/login';
            }
        } else if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;
