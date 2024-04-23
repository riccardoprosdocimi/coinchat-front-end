import {createSlice} from "@reduxjs/toolkit";
import marketData from "../data/coin-detail/coin-market";
import {CoinMCThunk} from "../services/detail-thunks";

const initialState = {
    marketData,
    fetching: true
}

const CoinMarketChartReducer = createSlice({
   name: 'CoinMarketChartReducer',
   initialState,
   reducers: {},
   extraReducers(builder) {
       builder
           .addCase(CoinMCThunk.pending, (state) => {
               state.fetching = true;
           })
           .addCase(CoinMCThunk.rejected, (state) => {
               state.fetching = false;
               console.log("CoinMCThunk Rejected");
           })
           .addCase(CoinMCThunk.fulfilled, (state, action) => {
               state.marketData = action.payload;
               state.fetching = false;
           });
   }
});

export default CoinMarketChartReducer.reducer;