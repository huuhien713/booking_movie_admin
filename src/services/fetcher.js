import axios from 'axios';

export const fetcher = axios.create({
    baseURL: 'https://movienew.cybersoft.edu.vn/api',
    headers: {
        TokenCybersoft: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAzMiIsIkhldEhhblN0cmluZyI6IjE3LzA0LzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY4MTY4OTYwMDAwMCIsIm5iZiI6MTY1MzkzMDAwMCwiZXhwIjoxNjgxODM3MjAwfQ.Yk1H5QCjda1n9Cd5-k2yU_DLnRqRvaB7FIkn1hIuPE0'
    }
});

fetcher.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        return error
    }
);

fetcher.interceptors.request.use(
    (config) => {
        const {accessToken} = JSON.parse(localStorage.getItem('userQuanTri')) || '';
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }
        return config
    },
    (error) => {
        return Promise.reject(error)
    }

)
