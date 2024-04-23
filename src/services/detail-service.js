import axios from "axios";
import {CoinData_API, CoinMarketChartAPI} from "../util/global-variables";


export const getCoinData = async (coinID) => {
    if (coinID.length === 0) {
        return {}
    }
    const response = await axios.get(`${CoinData_API}${coinID}`)
    return response.data;
}


export const getCoinMC = async (coinID, days) => {
    if (coinID.length === 0) {
        return {}
    }
    const response = await axios.get(`${CoinMarketChartAPI}${coinID}&days=${days}`)
    return response.data;
}