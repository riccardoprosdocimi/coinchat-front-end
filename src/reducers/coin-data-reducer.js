import {createSlice} from "@reduxjs/toolkit";
import coinData from "../data/coin-detail/coin-data";
import {CoinDataThunk} from "../services/detail-thunks";

const initialState = {
    coinData,
    fetching: true
}

const CoinDataReducer = createSlice({
    name: 'CoinDataReducer',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
            .addCase(CoinDataThunk.pending, (state) => {
                state.fetching = true;
            })
            .addCase(CoinDataThunk.rejected, (state) => {
                state.fetching = true;
            })
            .addCase(CoinDataThunk.fulfilled, (state, action) => {
                state.fetching = false;
                state.coinData = action.payload;
            });
    }
});

export default CoinDataReducer.reducer