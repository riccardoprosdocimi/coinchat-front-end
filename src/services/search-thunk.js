import {createAsyncThunk} from "@reduxjs/toolkit";
import {SearchCoin} from "./search-service";


export const SearchCoinThunk = createAsyncThunk(
    'SearchCoin',
    (query) => SearchCoin(query)
)