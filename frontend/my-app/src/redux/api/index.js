import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });

API.interceptors.request.use((req) => {
    if (localStorage.getItem("user")) {
        req.headers.Authorization = `Bearer ${
            JSON.parse(localStorage.getItem("user")).token
        }`;
    }

    return req;
});

export const fetchUser = (userId) => API.get(`/user/${userId}`);
export const setUser = (formData) => API.post("/signIn", formData);
export const updateUser = (userId, formData) =>
    API.patch(`/user/${userId}`, formData);
export const deleteUser = (userId) => API.delete(`/user/${userId}`);

export const fetchClients = (userId) => API.get(`/user/${userId}/clients`);
export const createClient = (formData) => API.post("/client", formData);
export const addUserClient = (userId, clientId) =>
    API.post(`/user/${userId}/clients`, { clientId });
export const updateClient = (clientId, formData) =>
    API.patch(`/client/${clientId}`, formData);
export const deleteUserClient = (userId, clientId) =>
    API.delete(`/user/${userId}/clients`, { data: { clientId } });
export const deleteClient = (clientId) => API.delete(`/client/${clientId}`);
export const favouriteClient = (clientId, isFav) =>
    API.patch(`/client/${clientId}/fav`, { isFav });

export const fetchUsers = () => API.get("/user");
export const promoteUser = (userId) => API.patch(`/user/${userId}/promote`);

export const registerUser = (formData) => API.post("/user", formData);

export const createOrder = (formData) => API.post("/order", formData);
export const addUserOrder = (userId, orderId) =>
    API.post(`/user/${userId}/orders`, { orderId });
export const fetchOrders = (userId) => API.get(`/user/${userId}/orders`);
export const fetchOrder = (orderId) => API.get(`/order/${orderId}`);
export const updateOrder = (orderId, formData) =>
    API.patch(`/order/${orderId}`, formData);
export const deleteUserOrder = (userId, orderId) =>
    API.delete(`/user/${userId}/orders`, { data: { orderId } });

export const addLineProduct = (orderId, formData) =>
    API.post(`/order/${orderId}/products`, formData);
export const updateLineProduct = (orderId, productId, formData) =>
    API.patch(`/order/${orderId}/products/${productId}`, formData);
export const deleteLineProduct = (orderId, productId) =>
    API.delete(`/order/${orderId}/products/${productId}`, {
        data: { productId },
    });

export const transferOrder = (userId, toUserId, orderId) =>
    API.patch(`/user/${userId}/transfer`, { orderId, toUserId });
export const acceptOrder = (userId, orderId) =>
    API.patch(`/user/${userId}/transfer/accept`, { orderId });
export const declineOrder = (userId, orderId) =>
    API.patch(`/user/${userId}/transfer/reject`, { orderId });

export const fetchClient = (clientId) => API.get(`/client/${clientId}`);

export const addLog = (orderId, userId, text) =>
    API.post(`/order/${orderId}/log`, { userId, text });

export const cloneClient = (clientId) => API.post(`/client/${clientId}`);

export const getReport = (userId) => API.get(`/report/${userId}`);
export const getAllReports = () => API.get(`/report`);
