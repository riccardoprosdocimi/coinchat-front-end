import axios from "axios";
const API_BASE = process.env.REACT_APP_API_BASE
const FOLLOWS_API = `${API_BASE}/follows`
const USERS_API = `${API_BASE}/users`

const api = axios.create({withCredentials: true})

export const userFollowsUser = async (follow) => {
    const response = await api.post(`${FOLLOWS_API}`, follow)
    return response.data
}
export const userUnfollowsUser = async (fid) => {
    const response = await api.delete(`${FOLLOWS_API}/${fid}`)
    return response.data
}
export const findUsersFollowingUser = async (uid) => {
    const response = await api.get(`${USERS_API}/${uid}/followers`)
    return response.data
}
export const findUsersFollowedByUser = async (uid) => {
    const response = await api.get(`${USERS_API}/${uid}/following`)
    return response.data
}
export const findFollowId = async (ouid) => {
    const response = await api.get(`${USERS_API}/${ouid}/followed`)
    return response.data
}
