import axios from 'axios'
const API_BASE = process.env.REACT_APP_API_BASE
const USER_API = `${API_BASE}/users`
const WATCH_API = `${API_BASE}/watchlist`

export const findWatchlist = async (uid) => {
    const response = await axios.get(`${USER_API}/${uid}/watchlist`)
    return response.data
}

export const addWatchlist = async (item) => {
    const response = await axios.post(WATCH_API, item)
    return response.data
}

export const removeWatchlist = async (wid) => {
    const response = await axios
        .delete(`${WATCH_API}/${wid}`)
    return response.data
}