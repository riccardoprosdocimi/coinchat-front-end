import {createAsyncThunk} from "@reduxjs/toolkit";
import * as service from "./watchlist-service"

export const findWatchlistThunk = createAsyncThunk(
    'watchlist/findWatchlist', async (uid) =>
        await service.findWatchlist(uid)
)

export const addWatchlistThunk = createAsyncThunk(
    'watchlist/addWatchlist',
    async (item) => {
        await service.addWatchlist(item)
        return item
    }
)

export const removeWatchlistThunk = createAsyncThunk(
    'watchlist/deleteWatchlist',
    async (wid) => {
        await service.removeWatchlist(wid)
        return wid
    }
)