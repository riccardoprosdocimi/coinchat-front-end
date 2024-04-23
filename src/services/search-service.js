import axios from "axios";
import {Search_API} from "../util/global-variables";


function removeWhiteSpace(s) {
    return s.replace(/\s+/g, '');
}

export const SearchCoin = async (query) => {
    query = removeWhiteSpace(query)

    if (query.length === 0) {
        return []
    }
    const response = await axios.get(`${Search_API}${query}`)
    return response.data;
}