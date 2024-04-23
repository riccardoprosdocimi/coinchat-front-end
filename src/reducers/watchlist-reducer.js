import {createSlice} from "@reduxjs/toolkit";
import {
    addWatchlistThunk,
    findWatchlistThunk,
    removeWatchlistThunk
} from "../services/watchlist-thunks";

const initialState = {
    watchlist: [],
    loading: false
}

const watchlistSlice = createSlice({
   name: 'watchlist',
   initialState,
   reducers: {},
   extraReducers(builder) {
       builder
           .addCase(findWatchlistThunk.pending, (state) => {
               state.loading = true;
               state.watchlist = [];
           })
           .addCase(findWatchlistThunk.fulfilled, (state, {payload}) => {
               state.loading = false;
               state.watchlist = payload;
           })
           .addCase(findWatchlistThunk.rejected, (state) => {
               state.loading = false;
           })
           .addCase(addWatchlistThunk.fulfilled, (state, {payload}) => {
               state.loading = false;
               state.watchlist.push(payload);
           })
           .addCase(removeWatchlistThunk.fulfilled, (state, {payload}) => {
               state.loading = false;
               state.watchlist = state.watchlist.filter(item => item._id !== payload);
           });
   }
});

export default watchlistSlice.reducer