import {createAsyncThunk} from "@reduxjs/toolkit";
import {getTrendingCoins} from "./home-service";

export const getTrendingCoinsThunk = createAsyncThunk (
    'home/getTrendingCoins',
    () => getTrendingCoins()
)