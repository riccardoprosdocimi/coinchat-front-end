import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE

export const getTrendingCoins = async () => {
    const response = await axios.get(`${API_BASE}/home/trendingCoins`)
    return response.data;



}