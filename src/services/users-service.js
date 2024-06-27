import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;
const USERS_API = `${API_BASE}/users`;

const api = axios.create({withCredentials: true});

export const createUser = async user => {
    const response = await api.post(`${USERS_API}`, user);
    return response.data;
};

export const register = async user => {
    const response = await api.post(`${USERS_API}/register`, user);
    return response.data;
};

export const findAllUsers = async () => {
    const response = await api.get(`${USERS_API}`);
    return response.data;
};

export const deleteUser = async uid => {
    const response = await api.delete(`${USERS_API}/${uid}`);
    return response.data;
};

export const updateUser = async user => {
    await api.put(`${USERS_API}/${user._id}`, user);
    return user;
};

export const login = async user => {
    const response = await api.post(`${USERS_API}/login`, user);
    return response.data;
};

export const logout = async () => {
    const response = await api.post(`${USERS_API}/logout`);
    return response.data;
};

export const profile = async () => {
    const response = await api.post(`${USERS_API}/profile`);
    return response.data;
};

export const findUserById = async (uid) => {
    const response = await api.get(`${USERS_API}/${uid}`);
    return response.data;
}