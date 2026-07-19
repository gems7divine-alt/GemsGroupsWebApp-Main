import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to attach JWT token
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getAllAttendance = async () => {
    try {
        const response = await API.get('/attendance');
        return response.data;
    } catch (error) {
        console.error('Error fetching all attendance:', error);
        throw error;
    }
};

export const getAttendanceById = async (id) => {
    try {
        const response = await API.get(`/attendance/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching attendance with id ${id}:`, error);
        throw error;
    }
};

export const createAttendance = async (data) => {
    try {
        const response = await API.post('/attendance', data);
        return response.data;
    } catch (error) {
        console.error('Error creating attendance:', error);
        throw error;
    }
};

export const updateAttendance = async (id, data) => {
    try {
        const response = await API.put(`/attendance/${id}`, data);
        return response.data;
    } catch (error) {
        console.error(`Error updating attendance with id ${id}:`, error);
        throw error;
    }
};

export const deleteAttendance = async (id) => {
    try {
        const response = await API.delete(`/attendance/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting attendance with id ${id}:`, error);
        throw error;
    }
};

export const searchAttendance = async (keyword) => {
    try {
        const response = await API.get(`/attendance/search`, {
            params: { keyword }
        });
        return response.data;
    } catch (error) {
        console.error(`Error searching attendance with keyword "${keyword}":`, error);
        throw error;
    }
};
