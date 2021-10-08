import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('user')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('user')).token}`;
    }

    return req;
});

export const fetchUser = (userId) => API.get(`/user/${userId}`);
export const setUser = (formData) => API.post('/user', formData);

export const fetchClients = (userId) => API.get(`/user/${userId}/clients`);
export const createClient = (formData) => API.post('/client', formData);
export const addUserClient = (userId, clientId) => API.post(`/user/${userId}/clients`, { clientId });
export const updateClient = (clientId, formData) => API.patch(`/client/${clientId}`, formData);
export const deleteUserClient = (userId, clientId) => API.delete(`/user/${userId}/clients`, { data: { clientId } });
export const deleteClient = (clientId) => API.delete(`/client/${clientId}`);