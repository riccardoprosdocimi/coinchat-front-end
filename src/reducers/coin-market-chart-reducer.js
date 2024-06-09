import {createSlice} from "@reduxjs/toolkit";
import marketData from "../data/coin-detail/coin-market";
import {CoinMCThunk} from "../services/detail-thunks";

const initialState = {
    marketData,
    fetching: true,
    error: null
}

const CoinMarketChartReducer = createSlice({
   name: 'CoinMarketChartReducer',
   initialState,
   reducers: {},
   extraReducers(builder) {
       builder
           .addCase(CoinMCThunk.pending, (state) => {
               state.fetching = true;
               state.error = null;
           })
           .addCase(CoinMCThunk.rejected, (state, action) => {
               state.fetching = false;
               state.error = action.error.message;
           })
           .addCase(CoinMCThunk.fulfilled, (state, action) => {
               state.marketData = action.payload;
               state.fetching = false;
               state.error = null;
           });
   }
});

export default CoinMarketChartReducer.reducer;